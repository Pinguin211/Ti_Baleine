# Compte rendu d'entretien n° 1

**Date :** …
**Durée :** …
**Interlocuteur :** le commanditaire
**Présents pour l'équipe :** …

Rédigé le jour même. C'est la première trace du projet et la source du cahier des
charges.

---

## 1. Ce que le client a dit

Ses mots, pas les vôtres. Citer quand la formulation est ambiguë — c'est
précisément l'ambiguïté qu'il faudra lever.

> « … »

## 2. Questions posées et réponses obtenues

Le client ne répond qu'à ce qu'on lui demande. Ce tableau est donc aussi la trace
de ce que vous n'avez **pas** demandé.

**Chaque question reçoit un identifiant `Qnn`.** C'est lui que citeront les
exigences du cahier des charges : `CR-01/Q07` désigne la question 7 de ce
compte rendu. La numérotation est définitive — on n'insère pas, on ajoute à la
suite.

| ID | Question posée | Réponse |
|---|---|---|
| Q01 | Préfères-tu une solution SaaS clé-en-main (ex. Bokun, Resagenda) avec abonnement/commission, ou un développement sur-mesure qui t’appartient ? | Sur-mesure. |
| Q02 | Quels types d’activités proposes-tu ? (excursions, observation baleines, plongée, privatisation, etc.) | Sorties en bateau sur réservation pour observer baleines et dauphins, et sorties « coucher de soleil » à heure précise. Tarifs fixes. |
| Q03 | Quelles formules/produits existent (découverte, premium, groupe) et quelles sont les durées associées ? | |
| Q04 | Le système doit-il être intégré à un site web existant ou développé comme une plateforme autonome ? | Web. *(à préciser : intégré à un site existant ou plateforme autonome ?)* |
| Q05 | En cas de site existant : quel CMS/technologie (WordPress, Wix, Shopify…) est utilisé et disposez-vous des accès admin ? | |
| Q06 | En cas de création autonome : disposez-vous d’un nom de domaine, d’un logo et d’une charte graphique ? | |
| Q07 | L’interface doit-elle être multilingue dès le lancement ? | Oui (environ 6 clients sur 10 sont étrangers). |
| Q08 | Si multilingue : quelles langues (FR, EN, DE, …) et qui fournit les traductions ? | |
| Q09 | Combien de départs par jour / semaine proposez-vous ? | Planning fixe, tous les jours : 3 départs à 7h, 10h et 14h. Fermé le lundi, ainsi que les 25 décembre et 1er janvier. |
| Q10 | Les créneaux horaires sont-ils fixes ou variables selon la saison ? | Fixes (mêmes créneaux toute l’année). |
| Q11 | Quel est le délai minimum de réservation avant le départ (ex. 2 h, 24 h, 48 h) ? | |
| Q12 | Quelle est la capacité minimale et maximale par sortie (places, bateau, véhicule) ? | Selon le bateau : Tikap 12 places, Grand Bleu 24 places. |
| Q13 | Existe-t-il un seuil de rentabilité (nombre minimum de participants pour maintenir la sortie) ? | |
| Q14 | Que se passe-t-il si le seuil de rentabilité n’est pas atteint X heures avant le départ (annulation automatique, alerte admin, etc.) ? | |
| Q15 | Combien de bateaux / ressources avez-vous à gérer ? | 2 bateaux : Tikap (12 places) et Grand Bleu (24 places). |
| Q16 | Faut-il affecter un bateau / capitaine précis à chaque créneau ? | |
| Q17 | Le calendrier doit-il être synchronisé avec des agendas externes (Google Calendar, Apple, Outlook) ? | Non. |
| Q18 | Quels tarifs proposez-vous (adulte, enfant, bébé, résident, privatisation) ? | Sortie baleines : 65 € adulte / 40 € enfant. Sortie dauphins : 50 € adulte / 30 € enfant. Privatisation : 600 € / 1100 €. |
| Q19 | La tarification varie-t-elle selon la saison ou le jour de la semaine ? | |
| Q20 | Souhaitez-vous gérer des codes promo ou des tarifs partenaires (hôtels, offices de tourisme) ? | |
| Q21 | Si codes promo : quel type (pourcentage, montant fixe, usage unique/multiple) ? | |
| Q22 | Proposez-vous une garantie "observation non vue" (spécifique baleines) ? | |
| Q23 | Si garantie observation : que reçoit le client (code promo -50 % sur prochaine sortie, bon d’achat, re-réservation gratuite) ? | |
| Q24 | Les clients doivent-ils payer en ligne lors de la réservation ? | Oui, paiement 100 % en ligne. |
| Q25 | Exigez-vous 100 % du paiement à la réservation ou un acompte ? | 100 % du paiement à la réservation. |
| Q26 | Si acompte : quel pourcentage ou montant fixe ? | |
| Q27 | Comment le solde est-il réglé (en ligne, sur place : TPE, espèces, chèques vacances) ? | |
| Q28 | Quels moyens de paiement accepter en ligne (CB, Stripe, PayPal, Apple Pay, Google Pay, Chèques Vacances Connect) ? | Dépend des taxes appliquées / de la banque (CA) du client. *(à préciser)* |
| Q29 | Avez-vous déjà un compte Stripe / PayPal professionnel vérifié ? | |
| Q30 | Souhaitez-vous pouvoir envoyer un lien de paiement sécurisé par SMS/WhatsApp (Pay-by-Link) pour valider une réservation prise par téléphone ? | |
| Q31 | Quel est le barème / délai et le pourcentage de remboursement selon le moment de l’annulation par le client (ex. 100 % si > 48 h, 50 % entre 48 h et 24 h, 0 % si < 24 h) ? | Plus de 7 jours avant : remboursement total. Plus de 48 h : 25 %. Moins de 48 h : 50 %. Annulation par l’entreprise : remboursement. *(barème à clarifier : 25 % à +48 h vs 50 % à −48 h semble incohérent)* |
| Q32 | Que faire si le client ne se présente pas le jour J (No-Show) ? | |
| Q33 | En cas d’annulation valide, le système doit-il émettre un remboursement bancaire automatique ou privilégier un avoir / bon d’achat ? | |
| Q34 | Qui décide de l’annulation météo et selon quels critères (seuils, source météo) ? | |
| Q35 | Combien de temps avant le départ cette décision est-elle prise (veille, H-2) ? | Au plus tard 2 h avant le départ ; le client est prévenu par téléphone. |
| Q36 | En cas d’annulation par le prestataire (météo/panne), comment gérer les clients en masse (lien de re-choix de date en autonomie, avoir automatique, remboursement direct) ? | Pas d’annulation en ligne ; annulation gérée manuellement par mail, SMS ou appel. |
| Q37 | En cas d’indisponibilité d’un navire (panne bateau), faut-il basculer automatiquement la liste de passagers sur un autre bateau/créneau ? | |
| Q38 | Quels canaux de communication utiliser (Email, SMS, WhatsApp API) ? | |
| Q39 | Êtes-vous prêt à prendre en charge les frais d’envoi par message (ex. Twilio, Meta API) ? | |
| Q40 | Quels messages automatiques doivent être configurés (confirmation + facture/billet, rappel J-1/H-2 avec consignes et GPS, alerte météo/report, avis post-sortie) ? | |
| Q41 | Souhaitez-vous recevoir une notification admin (SMS/Email) à chaque nouvelle réservation ou annulation ? | |
| Q42 | Combien de personnes accéderont au back-office (Admin, Capitaine, Vendeur/Billetterie) ? | |
| Q43 | Faut-il restreindre les droits d'accès selon les profils (ex. le capitaine voit le planning mais pas le chiffre d’affaires) ? | |
| Q44 | Comment se fera le contrôle des passagers à l’embarquement (papier, tablette, scanner QR-code, application mobile) ? | |
| Q45 | Avez-vous besoin d’un tableau de bord affichant le chiffre d’affaires, le taux de remplissage et les encaissements du jour ? | |
| Q46 | Êtes-vous assujetti à la TVA et quels taux s’appliquent (Réunion 8,5 %, Métropole 20 % / 10 %, franchise en base) ? | |
| Q47 | Le site doit-il générer automatiquement une facture PDF à la validation de la commande ? | Oui. |
| Q48 | Faut-il pouvoir modifier manuellement une facture depuis le back-office (ajustement prix, changement de nom) ? | |
| Q49 | En cas d’annulation/remboursement, le système doit-il créer une facture d’avoir conforme ? | |
| Q50 | Avez-vous besoin d’un export automatique (CSV/Excel) des ventes mensuelles ou d’une connexion à un logiciel comptable (Pennylane, QuickBooks) ? | |
| Q51 | Le système doit-il générer automatiquement le manifeste des passagers (liste obligatoire pour la capitainerie / Affaires Maritimes) ? | |
| Q52 | Faut-il faire signer une décharge de responsabilité / acceptation des CGV en ligne lors de la réservation ? | |
| Q53 | Quel est le budget alloué à la création de l’outil ? | |
| Q54 | Quelle est la date cible de mise en service (avant la saison des baleines) ? | |
| Q55 | Quel budget mensuel maximum acceptez-vous pour l’hébergement, les API (SMS) et la maintenance ? | |
| Q56 | Souhaitez-vous un contrat de maintenance avec assistance prioritaire 7j/7 en cas de bug bloquant le week-end ? | |

Une question posée et **restée sans réponse** figure quand même ici, avec
« sans réponse » : c'est une trace, et elle sert au §8.

## 3. Ce que nous avons compris

Reformulation en langage métier. À relire au client au prochain passage : s'il
répond « non, pas tout à fait », la compréhension n'est pas acquise.

## 4. Parties prenantes identifiées

| Personne / rôle | Ce qu'elle fait | Comment on l'a découverte |
|---|---|---|

## 5. Règles métier découvertes

| # | Règle | Formulation exacte du client | Sûre ? |
|---|---|---|---|
| 1 | … | « … » | oui / à confirmer |

## 6. Ambiguïtés détectées

Ce que le client a dit et qui peut se comprendre de plusieurs façons. Une
ambiguïté détectée mais non levée reste une ambiguïté : elle va au §8.

| # | Formulation | Lectures possibles | Levée ? |
|---|---|---|---|
| 1 | « … » | (a) … (b) … | non |

## 7. Contraintes évoquées

| # | Contrainte | Nature |
|---|---|---|

## 8. Questions à poser au prochain entretien

Formulées, pas juste évoquées. Priorisées : le prochain passage est court.

| Priorité | Question | Pourquoi elle compte |
|---|---|---|
| 1 | … | … |

## 9. Ce que nous n'avons pas abordé

Relire le brief initial et lister les sujets qu'il contient et que l'entretien n'a
pas touchés. C'est là que se cachent les découvertes tardives et coûteuses.

- …
