---
title: Les pipes
description: Des tableaux kanban qui ont un but — types, visibilité, limites, couloirs et archivage.
---

Les pipes sont des tableaux kanban avec glisser-déposer. Chaque colonne appartient à un état générique — *Backlog,
Prêt à démarrer, Démarré, En cours, Bloqué, Terminé, Abandonné* — sur lequel s'appuient le tableau de bord, les
échéances, les rapports et l'archivage.

## Visibilité

- **Privé** (personnel ou d'équipe) : seule la personne, ou les membres de l'équipe, voient le pipe.
- **Open** : tous ceux qui voient son espace le voient ; chacun peut y ajouter des tâches et commenter, seuls les
  membres de l'espace les font avancer.
- Chaque espace personnel a un pipe **Perso** pour les tâches générales, qui ne peut être ni archivé ni supprimé.

## Les types de pipes

Chaque pipe a un type, avec ses colonnes, ses types de tâches et ses tâches de départ. Le catalogue intégré couvre :

- **les organismes de formation** — tâches générales, commercial, prospection, communication, ingénierie pédagogique,
  documentation, formateurs et planning, suivi des apprenants, suivi PSH, qualité et Qualiopi, administratif et
  financier, et des processus (admission, rentrée, examens, fin de session) qui peuvent remplir leur première colonne
  de tâches de départ ;
- **le logiciel** — recherche UX, design UI, documentation produit, traduction, R&D, développement logiciel (avec une
  colonne *En revue*) et tests / QA ;
- **la vie personnelle** — ménage (colocation, couple, famille), déménagement, garde alternée, travaux, fêtes, recherche
  d'emploi, recherche de logement, suivi de soins, papiers et budget, voyages.

Certains types sont particuliers :

- les types **confidentiels** (suivi des apprenants, types personnels aux données privées) sont toujours privés ; leurs
  tâches ne sont désignées que par leur clé dans les e-mails et n'envoient pas de webhooks ;
- les types **réservés à une équipe** (suivi PSH) n'existent que dans les espaces d'équipe ; leurs tâches ne peuvent
  pas en sortir, et qui quitte l'équipe en perd l'accès.

Chacun peut **désactiver** les types de pipes dont il n'a pas besoin : ils ne sont plus proposés à la création d'un
pipe. Besoin d'un autre type ? Concevez-le dans [Modèles](/guide/models).

## Types de tâches et champs

Les types de pipes proposent des types de tâches avec leurs champs : texte court et long, nombre, montant, date, lien,
e-mail, téléphone, liste de choix, choix multiples, case à cocher, personne, titre RNCP / RS, documents Outline et
fichiers (50 Mo au plus par fichier).

## Limites de travail en cours

Une colonne d'un type de pipe peut avoir une limite (réglée dans le concepteur). Son en-tête affiche
`tâches / limite` et passe au rouge dès que la colonne en contient plus. La limite prévient seulement : elle ne bloque
jamais un déplacement.

## Couloirs et filtres

Un tableau peut afficher une rangée de colonnes par **propriétaire** (pipes d'équipe) ou par **type de tâche** ; le
choix est retenu dans votre navigateur. Déposer une tâche dans un autre couloir lui donne le propriétaire ou le type
de ce couloir.

Au-dessus du tableau, filtrez les tâches par texte, étiquette, priorité, propriétaire et type, ou n'affichez que les
vôtres.

## Archivage

Un pipe archivé quitte les listes, les sélecteurs et *Mes tâches*, et n'accepte plus de nouvelles tâches. On peut
toujours le consulter et le désarchiver. Un pipe peut être archivé une fois toutes ses tâches terminées ou abandonnées ;
ses tâches récurrentes s'arrêtent.
