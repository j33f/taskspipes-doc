---
title: Installation
description: Faites tourner TasksPipes avec Docker en quelques minutes.
---

TasksPipes est un seul conteneur Node.js qui sert à la fois l'API et l'application web, avec PostgreSQL et Redis. Le
`docker-compose.yml` du dépôt lance les trois.

## Prérequis

- Un serveur avec **Docker** et Docker Compose ;
- un nom de domaine, et un **reverse proxy HTTPS** (Caddy, Traefik, nginx…) ;
- en option, un compte SMTP pour les e-mails, et un espace Outline.

## Démarrage rapide

1. Récupérez le code et la configuration :

   ```shell
   git clone https://github.com/j33f/TasksPipes.git
   cd TasksPipes
   cp .env.example .env
   ```

2. Renseignez au moins `APP_URL` (l'URL publique), `APP_SECRET` (`openssl rand -hex 32`) et `POSTGRES_PASSWORD`.
   Aucun serveur Outline n'a besoin d'être configuré : chacun saisit le sien sur la page de connexion.

3. Lancez :

   ```shell
   docker compose up -d --build
   ```

4. Ouvrez `APP_URL` et connectez-vous. Ajoutez votre adresse à `ADMIN_EMAILS` pour gérer l'instance depuis
   **Administration** — l'e-mail, Outline et la connexion se règlent alors dans l'application.

## Derrière un reverse proxy

Avec une `APP_URL` en `https://`, les cookies sont `Secure`. Le proxy doit laisser passer les WebSocket pour les mises
à jour en direct (`/api/events`) ; Caddy et Traefik le font par défaut. Avec Caddy :

```text
tasks.example.com {
	encode zstd gzip
	reverse_proxy 127.0.0.1:3000
}
```

Le port n'est publié que sur `127.0.0.1` (`APP_BIND`) : l'application se fie à l'adresse du client envoyée par le
proxy, elle ne doit donc être joignable qu'à travers lui.

## Mettre à jour

Récupérez la nouvelle version et reconstruisez ; le schéma de la base est mis à jour au démarrage :

```shell
git pull
docker compose up -d --build
```

Sauvegardez d'abord la base (`docker compose exec db pg_dump -U taskspipes -Fc taskspipes > backup.dump`).
