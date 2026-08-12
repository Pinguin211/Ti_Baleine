# Spécifications — Admin (back-office)

**Domaine :** `ADMIN`

---

## SPEC-ADMIN-01 — Consultation du planning et du taux de remplissage

**Exigences :** REQ-009, REQ-010, REQ-103
**Statut :** validée

### Comportement attendu

- Étant donné l'administrateur connecté au back-office, quand il ouvre l'écran
  planning, alors il voit la liste des créneaux (jour + heure parmi 7h, 10h,
  14h, le port de départ), depuis un poste de bureau (REQ-103).

- Étant donné un créneau affiché, quand l'administrateur le consulte, alors il
  voit : le type de sortie affecté, le navire affecté (Tikap ou Grand Bleu),
  et le remplissage — nombre de places réservées sur la capacité du navire
  (12 ou 24).

- Étant donné un créneau dont les réservations payantes sont sous le seuil de
  maintien du départ (6 passagers), quand l'administrateur consulte le
  planning, alors ce créneau est signalé visuellement comme sous le seuil.

- Étant donné un créneau dont la capacité du navire affecté est atteinte,
  quand l'administrateur consulte le planning, alors ce créneau est signalé
  comme complet.

### Hors périmètre

- La décision d'annuler un départ sous le seuil de maintien : reste manuelle,
  hors système.
- L'authentification au back-office : `SPEC-ADMIN-0x` à venir.
- L'annulation d'une réservation et remise à disposition d'une place libérée : `SPEC-ADMIN-0x` à venir.

### Cas de test

- `CASE-ADMIN-01` — le planning affiche les créneaux du jour avec navire,
  type de sortie et remplissage
- `CASE-ADMIN-02` — un créneau sous le seuil de 6 passagers payants est
  signalé comme tel
- `CASE-ADMIN-03` — un créneau à capacité atteinte est affiché comme complet

---

## SPEC-ADMIN-02 — Annulation d'une réservation

**Exigences :** REQ-00
**Statut :** validée

### Comportement attendu

- Etant donnée l'administrateur connecté au back-office à reçu une demande d'annulation de réservation
  par téléphone, quand il consulte la réservation, alors il peut annuler la réservation
  et remettre la place à disposition.

### Hors périmètre

### Cas de test
