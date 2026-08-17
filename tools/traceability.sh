#!/usr/bin/env bash
#
# Vérifie la chaîne de traçabilité et peut régénérer docs/traceability.md.
#
#   ./tools/traceability.sh           vérifie la chaîne, n'écrit rien sur disque
#   ./tools/traceability.sh --check   idem, et sort en erreur s'il y a une rupture (utilisé en CI/pre-commit)
#   ./tools/traceability.sh --write   régénère réellement docs/traceability.md (écrase tout contenu existant)
#
# docs/traceability.md est actuellement maintenu à la main (colonne Source,
# sections « Exigences non couvertes » et « Trous connus » que ce script ne
# sait pas produire). Par sécurité, aucun mode n'écrase ce fichier sauf
# --write, explicitement demandé.
#
# Conventions attendues (voir README §4) :
#   docs/compte-rendu-entretien-nn.md  questions numérotées Qnn
#   docs/cdc/cahier-des-charges-v4.md  REQ-nnn, chacune citant CR-nn/Qnn ou « déduit »
#   specs/<domaine>.md                 sections titrées SPEC-<DOM>-nn, citant au moins un REQ
#   tests/cases/CASE-<DOM>-nn.md       un fichier par cas, citant au moins un SPEC
#   tests/**                           le nom du test contient l'ID CASE
#   git log                            le message de commit contient l'ID SPEC
#
# Les identifiants sont reconnus avec « - » ou « _ » comme séparateur, parce que
# la plupart des langages n'acceptent pas le tiret dans un nom de fonction :
# CASE-CANCEL-11 et test_CASE_CANCEL_11_... désignent le même cas.

set -u

cd "$(dirname "$0")/.." || exit 1

CDC="docs/cdc/cahier-des-charges-v4.md"
OUT="docs/traceability.md"
CHECK=0
WRITE=0
case "${1:-}" in
  --check) CHECK=1 ;;
  --write) WRITE=1 ;;
esac

TMP=$(mktemp) || exit 1
trap 'rm -f "$TMP"' EXIT

RX_REQ='REQ-[0-9][0-9][0-9]'
RX_SPEC='SPEC-[A-Z0-9]+-[0-9][0-9]'
RX_CASE_ANY='CASE[-_][A-Z0-9]+[-_][0-9][0-9]'
RX_SRC='CR-[0-9][0-9]/(Q[0-9][0-9]|§[0-9]+)'
RX_DEDUIT='d[ée]duit'

ruptures=0
warn() { printf 'RUPTURE  %s\n' "$1" >&2; ruptures=$((ruptures + 1)); }

# Fichiers de tests automatisés : tout tests/ sauf les cas de test et les gabarits.
test_files=$(find tests -type f ! -path 'tests/cases/*' ! -name 'TEMPLATE.md' 2>/dev/null)

# --- SPEC -> REQ ------------------------------------------------------------
# Un REQ est rattaché au dernier SPEC rencontré au-dessus de lui, dans le même fichier.
pairs_spec_req=$(
  awk '
    FNR == 1 { cur = "" }
    { if (match($0, /SPEC-[A-Z0-9]+-[0-9][0-9]/)) cur = substr($0, RSTART, RLENGTH) }
    { if (cur != "" && match($0, /REQ-[0-9][0-9][0-9]/)) print cur "\t" substr($0, RSTART, RLENGTH) }
  ' specs/*.md 2>/dev/null | sort -u
)

# --- SPEC -> CASE -----------------------------------------------------------
pairs_spec_case=""
for f in tests/cases/CASE-*.md; do
  [ -e "$f" ] || continue
  cid=$(basename "$f" .md)
  refs=$(grep -ohE "$RX_SPEC" "$f" 2>/dev/null | sort -u)
  if [ -z "$refs" ]; then
    warn "$cid ne cite aucune spécification"
    continue
  fi
  for sp in $refs; do
    pairs_spec_case="${pairs_spec_case}${sp}	${cid}
"
  done
done

# --- Matrice ----------------------------------------------------------------
specs=$(grep -rhoE "$RX_SPEC" specs 2>/dev/null | sort -u)
[ -z "$specs" ] && warn "aucune spécification trouvée dans specs/"

{
  echo "<!-- Généré par tools/traceability.sh — ne pas éditer à la main. -->"
  echo
  echo "# Matrice de traçabilité"
  echo
  echo "| SPEC | REQ | Cas de test | Tests | Commits |"
  echo "|---|---|---|---|---|"

  for spec in $specs; do
    reqs=$(printf '%s\n' "$pairs_spec_req" | awk -F'\t' -v s="$spec" '$1 == s { print $2 }' | sort -u | paste -sd' ' -)
    cases=$(printf '%s\n' "$pairs_spec_case" | awk -F'\t' -v s="$spec" '$1 == s { print $2 }' | sort -u)

    ntests=0
    for cid in $cases; do
      rx=$(printf '%s' "$cid" | sed 's/-/[-_]/g')
      n=$(printf '%s\n' "$test_files" | tr '\n' '\0' | xargs -0 grep -lIE "$rx" 2>/dev/null | grep -c .)
      ntests=$((ntests + n))
    done

    ncommits=0
    [ -d .git ] && ncommits=$(git log --oneline --grep="$spec" 2>/dev/null | grep -c .)

    [ -z "$reqs" ]  && { warn "$spec ne cite aucune exigence"; reqs="—"; }
    [ -z "$cases" ] && warn "$spec n'est couverte par aucun cas de test"
    [ "$ntests" -eq 0 ] && warn "$spec n'a aucun test automatisé"

    cases_cell=$(printf '%s\n' "$cases" | paste -sd' ' -)
    [ -z "$cases_cell" ] && cases_cell="—"

    printf '| %s | %s | %s | %s | %s |\n' "$spec" "$reqs" "$cases_cell" "$ntests" "$ncommits"
  done
} > "$TMP"

# --- Exigences non couvertes ------------------------------------------------
if [ -f "$CDC" ]; then
  for req in $(grep -ohE "$RX_REQ" "$CDC" 2>/dev/null | sort -u); do
    grep -rqE "$req" specs 2>/dev/null || warn "$req n'est couverte par aucune spécification"
  done
fi

# --- REQ -> échange consigné ------------------------------------------------
# Chaque exigence cite soit un échange d'entretien (CR-nn/Qnn), soit « déduit ».
# Une règle métier qui ne vient d'aucun échange consigné ne vient de nulle part.
ndeduits=0
if [ -f "$CDC" ]; then
  while IFS= read -r line; do
    req=$(printf '%s\n' "$line" | grep -oE "$RX_REQ" | head -1)
    [ -z "$req" ] && continue
    src=$(printf '%s\n' "$line" | grep -oE "$RX_SRC" | head -1)
    if [ -n "$src" ]; then
      cr=${src%%/*}
      q=${src##*/}
      f="docs/compte-rendu-entretien-${cr#CR-}.md"
      if [ ! -f "$f" ]; then
        warn "$req cite $src, mais $f n'existe pas"
      elif [ "${q#§}" != "$q" ]; then
        # Référence de section (§N) : on vérifie qu'un titre « ## N. » existe.
        n=${q#§}
        grep -qE "^#{1,6}[[:space:]]+${n}\." "$f" || warn "$req cite $src, mais la section $n est absente de $f"
      elif ! grep -q "$q" "$f"; then
        warn "$req cite $src, mais $q est absent de $f"
      fi
    elif printf '%s\n' "$line" | grep -qiE "$RX_DEDUIT"; then
      ndeduits=$((ndeduits + 1))
    else
      warn "$req ne cite aucune source (ni CR-nn/Qnn, ni « déduit »)"
    fi
  done < "$CDC"
fi

# --- Cas de test référencés dans les tests mais non définis -----------------
used=$(printf '%s\n' "$test_files" | tr '\n' '\0' | xargs -0 grep -hoIE "$RX_CASE_ANY" 2>/dev/null | tr '_' '-' | sort -u)
for cid in $used; do
  [ -f "tests/cases/$cid.md" ] || warn "$cid est utilisé dans les tests mais n'est défini nulle part"
done

# --- Sortie -----------------------------------------------------------------
if [ "$WRITE" -eq 1 ]; then
  cp "$TMP" "$OUT"
  echo "$OUT régénéré (--write) : contenu manuel (Source, sections narratives) écrasé."
else
  echo "Vérification effectuée, $OUT non modifié (utilisez --write pour régénérer)."
fi
if [ "$ndeduits" -gt 0 ]; then
  echo "$ndeduits exigence(s) marquée(s) « déduit » — à justifier, ce n'est pas une rupture."
fi
if [ "$ruptures" -gt 0 ]; then
  echo "$ruptures rupture(s) de traçabilité." >&2
  [ "$CHECK" -eq 1 ] && exit 1
fi
exit 0
