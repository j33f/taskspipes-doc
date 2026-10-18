---
title: API publique
description: Une API REST documentée, avec des jetons d'accès personnels.
---

## Jetons d'accès

Dans **Paramètres › Jetons d'accès**, créez un jeton pour un script ou un autre outil :

- il n'est affiché **qu'une fois**, à la création ; seule son empreinte est conservée ;
- il a un nom, une expiration (30 jours, 90 jours ou un an) et une portée : **lecture seule**, ou **lecture et
  écriture** ;
- il agit avec exactement vos droits, et peut être révoqué à tout moment.

## Appeler l'API

L'API se trouve sous **`/api/v1`**. Envoyez le jeton en bearer token :

```shell
curl -H "Authorization: Bearer tp_…" https://tasks.example.com/api/v1/me/tasks
```

Elle couvre votre compte, les personnes, les espaces, les pipes et leurs tâches, vos tâches, le calendrier, la
recherche, la création, la modification, le déplacement, l'envoi et le commentaire des tâches, les dépendances, les
étiquettes, le temps saisi et les sous-tâches.

La description **OpenAPI** est à `/api/v1/openapi.json`, consultable sur **`/api/v1/docs`** (Swagger UI) de votre
instance.

## Ce que les jetons ne peuvent pas faire

Les jetons ne sont acceptés que sur `/api/v1`. Ils ne gèrent jamais les jetons, les paramètres du compte, l'export des
données, la suppression du compte ni l'administration : il faut pour cela une session connectée. L'API est limitée à
600 requêtes par minute et par jeton.
