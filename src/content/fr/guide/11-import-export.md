---
title: Import et export
description: Les pipes en CSV et JSON, les imports depuis CSV et Trello, et vos propres données.
---

**Export et import** se trouve sur la page d'un pipe.

## Exporter un pipe

- **CSV** — clé, titre, description, colonne, propriétaire, échéance, type de tâche, sous-tâches, une colonne par champ,
  priorité, étiquettes, estimation et temps saisi, auteur, dates. Les pages en français utilisent le point-virgule, pour
  les tableurs.
- **JSON** — les valeurs des champs telles qu'enregistrées, avec leurs libellés.

Tous ceux qui voient le pipe peuvent l'exporter. Une cellule qu'un tableur exécuterait comme une formule est écrite
comme du texte.

## Importer des tâches

Les membres de l'espace peuvent importer dans un pipe qui n'est pas archivé :

- **CSV** — le séparateur est deviné ; chaque colonne est associée à une propriété de la tâche ou à un champ, proposée
  d'après son en-tête (et les mots habituels d'autres outils : *Name*, *List*, *Due*, *Checklist*…), ou ignorée. Les
  valeurs qui ne correspondent à aucune colonne du pipe se placent à la main ; les propriétaires sont trouvés par nom
  ou par e-mail ; les dates se lisent `2026-03-09` ou `09/03/2026`.
- **Trello** — un tableau exporté en JSON : les cartes ouvertes des listes ouvertes, avec leur description, leur
  échéance, leurs checklists et leurs commentaires.

Un **aperçu** montre l'association des colonnes, les premières tâches et chaque ligne à corriger. Rien n'est importé
tant qu'une ligne est fausse ; ensuite toutes les lignes sont créées d'un coup (jusqu'à 2 000), notées dans leur
historique, sans notification par e-mail.

## Vos propres données

Dans **Paramètres › Vos données** :

- **Télécharger mes données** donne une archive zip : votre profil, vos équipes, les tâches que vous avez écrites,
  envoyées ou dont vous êtes propriétaire avec leur historique, tous vos commentaires, le temps que vous avez saisi, et
  les fichiers de ces tâches.
- **Supprimer mon compte** (comptes e-mail) se confirme par un code de double authentification ou un lien envoyé par
  e-mail. Cela supprime votre compte, votre espace personnel et ses tâches ; ce que vous avez fait ailleurs reste dans
  l'historique sous **Compte supprimé**.
