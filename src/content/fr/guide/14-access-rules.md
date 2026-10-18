---
title: Règles d'accès et confidentialité
description: Qui peut voir et faire quoi, et ce qui reste privé.
---

## Règles d'accès

| Action | Qui |
| --- | --- |
| Voir un pipe privé, l'incoming d'un espace | les membres de l'espace |
| Voir un pipe open, y ajouter une tâche, commenter | tous ceux qui voient son espace |
| Trouver une tâche avec la recherche | qui peut la voir |
| Exporter les tâches d'un pipe | tous ceux qui voient le pipe |
| Importer des tâches dans un pipe | les membres de l'espace du pipe |
| Être proposé dans une @mention, en être prévenu | les personnes qui peuvent ouvrir la tâche |
| Faire attendre une tâche par une autre | ceux qui peuvent modifier la tâche, parmi les tâches qu'ils peuvent ouvrir |
| Voir une tâche liée qu'on ne peut pas ouvrir | son titre et son propriétaire seulement ; rien d'une tâche confidentielle ou réservée à une équipe |
| Déplacer, changer de colonne, attribuer, échéance, document, envoyer | les membres de l'espace de la tâche |
| Modifier titre, description, champs, priorité et étiquettes | les membres, ou l'auteur d'une tâche dans un pipe open |
| Gérer les étiquettes d'un espace | les membres de l'espace |
| Estimer, saisir son propre temps | comme pour les champs |
| Modifier ou supprimer une saisie de temps | son auteur ; un admin de l'équipe peut aussi la supprimer |
| Refuser une tâche | les membres de l'espace dont l'incoming la contient |
| Gérer une équipe | les admins de l'équipe |
| Utiliser l'API avec un jeton | le propriétaire du jeton, avec ses propres droits |
| Gérer les webhooks d'un pipe | les membres de son espace (pas sur les pipes confidentiels) |
| Voir tous les comptes, changer les paramètres de l'instance | les administrateurs (`ADMIN_EMAILS`) |
| Exporter ses données ; supprimer son compte e-mail | la personne |

## Pipes confidentiels et réservés à une équipe

- Leurs tâches ne sont désignées que par leur clé dans les e-mails et les notifications push.
- Ils n'ont pas de webhooks, et leurs tâches n'affichent pas d'extrait dans la recherche.
- Les tâches réservées à une équipe ne peuvent pas quitter leur équipe, et qui quitte l'équipe en perd l'accès.

## Confidentialité

Les styles, scripts et la police de l'application sont servis par TasksPipes lui-même : l'ouvrir n'envoie l'adresse
d'aucun visiteur à un tiers, et il n'y a pas de mesure d'audience. Le seul autre serveur que contacte le navigateur est
votre serveur Outline, pour les photos de profil. Les réponses aux formulaires d'inscription et d'invitation ne révèlent
jamais si une adresse a un compte.
