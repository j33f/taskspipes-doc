---
title: Faire tourner l'instance
description: E-mails et rapports, limitation de débit, flux de calendrier et sauvegardes.
---

## E-mails, notifications et rapports

Le serveur vérifie chaque minute : les e-mails envoyés aussitôt partent environ deux minutes après ce qui les a causés,
le résumé quotidien et les rapports quotidiens à `REPORT_HOUR` (heure locale de `TIMEZONE`), les rapports hebdomadaires
le vendredi. Chaque envoi est enregistré : rien ne part deux fois, même après un redémarrage. Les notifications push
partent toutes les 15 secondes.

## Limitation de débit

Les routes qui connectent, acceptent un secret ou envoient un e-mail ont un débit limité ; au-delà de la limite, le
client est bloqué pour la durée de la fenêtre, puis plus longtemps à chaque récidive. Les compteurs vivent dans Redis
et sont partagés par toutes les instances de l'application.

## Flux de calendrier

Le flux de calendrier de chacun est servi à `<APP_URL>/cal/<jeton>.ics` : les applications d'agenda le récupèrent sans
session, le jeton étant leur seul identifiant. Il peut être renouvelé depuis l'application.

## Webhooks de GitHub et GitLab

Les pipes reliés reçoivent les webhooks à `<APP_URL>/hooks/github/…` et `<APP_URL>/hooks/gitlab/…` : GitHub ou GitLab
doivent pouvoir joindre `APP_URL`.

## Sauvegardes

Tout est dans PostgreSQL, fichiers compris. Sauvegardez-le régulièrement :

```shell
docker compose exec db pg_dump -U taskspipes -Fc taskspipes > taskspipes-$(date +%F).dump
```

Gardez `APP_SECRET` avec les sauvegardes : les secrets stockés en base sont chiffrés avec.
