---
title: GitHub et GitLab
description: Des pull et merge requests qui font avancer les tâches, grâce à leur clé.
---

Un pipe peut être relié à des dépôts GitHub et GitLab : les pull requests, merge requests et commits qui citent une
tâche y sont liés, et la tâche avance avec sa pull ou merge request.

## Citer une tâche

Chaque tâche a une clé, **`TP-<numéro>`**, affichée dans sa section *Développement* avec un bouton pour copier un nom
de branche comme `tp-42-login-page`. Mettez la clé, en majuscules ou minuscules, dans :

- le **nom de branche** d'une pull/merge request (`tp-42-login-page`, `feature/TP-42`…) ;
- son **titre** ou sa **description** (`Page de connexion (TP-42)`) ;
- ou un **message de commit** (`TP-42: valider le formulaire`).

## Ce qui se passe

| Événement | La tâche |
| --- | --- |
| Un brouillon est ouvert, ou une request repasse en brouillon | passe dans la première colonne *started* (En cours) |
| Une request est ouverte, rouverte ou marquée prête | passe dans la première colonne *ongoing* (En revue) |
| La request est fusionnée | passe dans la première colonne *done* (Terminé) |
| La request est fermée sans fusion | reste où elle est |
| Des commits sont poussés | les commits sont liés, la tâche ne bouge pas |

Les colonnes sont trouvées par leur état : cela marche avec tous les types de pipes. Une tâche abandonnée n'est jamais
déplacée. Chaque déplacement et chaque lien est noté dans l'historique de la tâche.

## Relier un pipe

Dans les paramètres du pipe, ouvrez **GitHub / GitLab** et cliquez sur **Connecter** : TasksPipes donne une URL de
webhook et un secret.

**GitHub** — dans le dépôt, *Settings › Webhooks › Add webhook* : l'URL en *Payload URL*, le type de contenu
`application/json`, le secret, et les événements **Pull requests** et **Pushes**.

**GitLab** — dans le projet, *Settings › Webhooks › Add new webhook* : l'URL, le secret token, et les déclencheurs
**Push events** et **Merge request events**.

Plusieurs dépôts peuvent envoyer au même pipe. **Nouveau secret…** remplace le secret, **Déconnecter** arrête
l'intégration. Les signatures GitHub et les jetons GitLab sont vérifiés ; tout le reste est refusé.
