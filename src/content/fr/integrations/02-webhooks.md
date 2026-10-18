---
title: Webhooks, Slack, Mattermost et Teams
description: Envoyez les événements d'un pipe à vos outils ou dans un canal de discussion.
---

Sur la page d'un pipe, **Webhooks** (membres de son espace) envoie les événements des tâches à une adresse https :
**tâche créée**, **déplacée** (colonne ou pipe), **attribuée**, **commentée** et **terminée**.

## Du JSON signé

Chaque envoi contient la tâche (clé, titre, colonne, propriétaire, échéance, priorité, étiquettes, lien), qui a agi et
le changement, et il est signé avec le secret du webhook :

```text
X-TasksPipes-Timestamp: 1792354978
X-TasksPipes-Signature: sha256=<HMAC-SHA256 de "<timestamp>.<body>">
```

Un envoi qui échoue est retenté après 1 minute, 5 minutes, 30 minutes, 2 heures et 12 heures, puis abandonné. Les
derniers envois s'affichent dans la fenêtre, avec leur réponse ; un bouton *Tester* envoie un `ping`.

## Canaux de discussion

Un webhook peut aussi publier dans un canal **Slack**, **Mattermost** ou **Microsoft Teams** : choisissez son format
et collez l'adresse du webhook entrant du canal (pour Teams, un webhook *Workflows*). Chaque événement devient un court
message avec un lien vers la tâche — *Alice a déplacé TP-12 « Devis » vers Terminé* — les commentaires cités jusqu'à
300 caractères, dans la langue du webhook.

## Limites

- Les adresses de réseaux internes sont refusées (la variable `WEBHOOK_ALLOW_PRIVATE` de l'instance lève cette
  limite).
- **Les pipes confidentiels et réservés à une équipe n'ont pas de webhooks** : leur contenu reste dans l'application.
