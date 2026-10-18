---
title: Les modèles
description: Concevez vos propres types de pipes et de tâches, et partagez-les en fichiers YAML.
---

Quand aucun type intégré ne convient, concevez le vôtre dans **Modèles** (barre latérale).

## Concevoir un type

- **Types de pipes** : nom, catégorie, icône et couleur, **colonnes** (chacune avec son état et une limite de travail
  en cours facultative), les **types de tâches** proposés, la confidentialité (*confidentiel*, *réservé à une équipe*),
  le rapport hebdomadaire de temps et les **tâches de départ** proposées à la création d'un pipe.
- **Types de tâches** : nom, icône, description et **champs**, avec un aperçu en direct.

Partez de zéro ou d'un modèle existant. Un modèle commence **privé** — vu et utilisé par son seul auteur — et peut être
rendu **public**. Seul son auteur peut le modifier. Un type utilisé ne peut pas être supprimé, et la nature d'un champ
enregistré ne peut pas changer.

## Les fichiers de modèles

Les modèles s'exportent et s'importent en **fichiers YAML**, pour les partager entre instances ou les garder sous
gestion de versions.

- **Exporter** : le bouton *Exporter* d'un type le télécharge (avec les types de tâches personnalisés qu'un type de
  pipe propose) ; *Exporter mes modèles* télécharge tous les vôtres.
- **Importer** : *Importer…* crée les types du fichier comme **nouveaux modèles privés** à vous. Un fichier est importé
  en entier ou pas du tout : si un type n'est pas valide, rien n'est créé et l'erreur dit pourquoi.

```yaml
taskspipes: 1                 # version du format (obligatoire)

taskTypes:
  - id: company_visit
    label: Visite en entreprise
    icon: briefcase
    fields:
      - { id: company, label: Entreprise, type: text }
      - { id: result, label: Résultat, type: select, options: [OK, À refaire] }

pipeTypes:
  - id: work_study
    label: Alternance
    icon: graduation
    color: "#9E5CF7"
    confidential: true
    columns:                  # deux ou plus, dont au moins une « done »
      - { id: to_plan, label: À planifier, status: backlog }
      - { id: visit, label: Visite prévue, status: ready, wipLimit: 5 }
      - { id: closed, label: Clôturé, status: done }
    taskTypes: [company_visit]
    templates:
      - Signer le contrat d'alternance
```

- **États des colonnes** : `backlog`, `ready`, `started`, `ongoing`, `blocked`, `done`, `abandoned`.
- **Types de champs** : `text`, `textarea`, `number`, `money`, `date`, `url`, `email`, `phone`, `select`,
  `multiselect` (avec `options`), `checkbox`, `user`, `rncp`, `docs`, `files`.
- **Limites** : 15 colonnes, 40 champs, 50 tâches de départ, 100 modèles par fichier.
