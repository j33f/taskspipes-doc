---
title: Les tâches
description: Propriétaires, sous-tâches, priorité et étiquettes, dépendances, récurrence, temps, mentions et historique.
---

## L'essentiel

- **Propriétaire** — une tâche d'un espace personnel appartient à son titulaire ; pour la confier à quelqu'un,
  envoyez-la dans son [incoming](/guide/incoming). Dans un espace d'équipe, le propriétaire se choisit parmi les
  membres de l'équipe.
- **Échéance**, **description** (Markdown, avec aperçu) et **champs** de son type de tâche.
- **Sous-tâches** — une liste à cocher dans la tâche. Collez plusieurs lignes pour ajouter plusieurs éléments,
  renommez, réordonnez par glisser-déposer ; l'avancement s'affiche sur les cartes.
- **Document Outline** — cherchez un document ou collez son URL pour le lier, ou créez un document Outline depuis la
  tâche.
- **Historique** — chaque changement est enregistré avec l'état avant et après (emplacement, colonne, propriétaire,
  échéance, document, champs, fichiers, éléments cochés) et son commentaire. Les tâches ne sont jamais supprimées :
  elles passent en *Abandonné*.

## Priorité et étiquettes

- **Priorité** : *urgente*, *haute*, *moyenne*, *basse* ou aucune, affichée par un drapeau de couleur sur les cartes et
  les listes.
- Les **étiquettes** appartiennent à un espace (*page d'un espace › Étiquettes*) : un nom et une couleur. Les membres
  de l'espace les gèrent ; une tâche ne reçoit que les étiquettes de son espace, et les perd quand elle est envoyée dans
  un autre espace.

Les pipes, *Mes tâches* et la recherche filtrent par étiquette et par priorité.

## Mentions

Tapez `@` dans un commentaire, une description ou un motif de refus pour mentionner quelqu'un : seules les personnes
qui peuvent ouvrir la tâche sont proposées. La personne mentionnée est prévenue aussitôt dans l'application, et par
e-mail si elle n'y est pas à ce moment-là.

## Dépendances

Une tâche peut **attendre** d'autres tâches (*Dépendances › Ajouter une tâche attendue*), de n'importe quel espace ou
pipe, parmi celles que vous pouvez ouvrir ; les boucles sont refusées.

- Tant que l'une d'elles n'est pas terminée (ou abandonnée), la tâche affiche **Bloquée**, et sa page liste les tâches
  qu'elle bloque.
- Faire avancer une tâche bloquée demande une confirmation, et c'est noté dans son historique.
- Quand la dernière est terminée, le propriétaire et l'auteur de la tâche sont prévenus.
- Une tâche liée que quelqu'un ne peut pas ouvrir ne lui montre que son titre et son propriétaire ; une tâche
  confidentielle s'affiche comme *Tâche non accessible*.

## Tâches récurrentes

**Répéter** crée une nouvelle tâche à chaque date d'une règle :

- tous les *n* jours ;
- toutes les *n* semaines, les jours choisis ;
- tous les *n* mois, un jour du mois, le premier, deuxième, troisième, quatrième ou dernier jour de la semaine donné
  (*le premier lundi*), ou le dernier jour ouvré ;
- tous les *n* ans, à la date de la tâche ;

jusqu'à une date de fin facultative. **À dates fixes**, chaque tâche est créée à sa date ou quelques jours avant
(jusqu'à 90) ; **une fois la précédente terminée**, la suivante est créée dès qu'elle est finie. Chaque nouvelle tâche
reprend la dernière — titre, description, type, champs, propriétaire, document, étiquettes, priorité, estimation et
sous-tâches (décochées).

## Estimation et temps passé

La section *Temps* d'une tâche contient son **estimation** (saisie `2h30`, `1.5` ou `45min`) et le **temps saisi** à
la main — qui, quel jour (jusqu'à 90 jours en arrière), combien de temps, une note facultative — avec le total face à
l'estimation. Chacun saisit son propre temps ; une saisie est modifiée par son auteur et supprimée par son auteur ou un
admin de l'équipe. Le temps saisi compte dans le [rapport hebdomadaire](/guide/reports) et les exports.

## Changer le type d'une tâche

Dans un pipe, la page d'une tâche la transforme en n'importe quel type proposé par le pipe. À l'acceptation d'une tâche
depuis un incoming, elle peut être transformée en un type du pipe choisi. Les champs communs aux deux types sont
conservés.
