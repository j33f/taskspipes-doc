---
title: Configuration
description: Toutes les variables d'environnement, et les réglages gérables dans l'application.
---

TasksPipes se configure par variables d'environnement, dans `.env`.

Les réglages d'e-mail, d'Outline et de connexion peuvent aussi être gérés dans l'application par un administrateur
(*Administration › Paramètres*). Une variable définie ici (et non vide) l'emporte et s'y affiche verrouillée ;
omettez-la pour gérer le réglage dans l'application. Ce sont `SMTP_*`, `MAIL_FROM`, `OUTLINE_*`, `ALLOW_API_KEY_LOGIN`,
`ALLOW_EMAIL_SIGNUP`, `ALLOW_EMAIL_INVITATIONS`, `EMAIL_DOMAINS` et `OIDC_*`.

## L'essentiel

| Variable | Rôle |
| --- | --- |
| `APP_URL` | URL publique de TasksPipes (retours OAuth, liens dans les e-mails et les calendriers). |
| `APP_SECRET` | Au moins 32 caractères. Chiffre les jetons, secrets et réglages en base. |
| `POSTGRES_PASSWORD` | Mot de passe de la base fournie (`DATABASE_URL` pour votre propre base, dont le compte peut créer les extensions `pgcrypto` et `unaccent`). |
| `APP_PORT`, `APP_BIND` | Port publié sur l'hôte (3000) et son adresse (`127.0.0.1`). |
| `ADMIN_EMAILS` | Administrateurs de l'instance, adresses séparées par des virgules. |

## Outline

| Variable | Rôle |
| --- | --- |
| `OUTLINE_ENABLED` | `false` désactive Outline : pas de connexion avec Outline, pas de documents Outline. |
| `OUTLINE_URL` | Serveur Outline connu de l'instance, nécessaire pour la connexion OAuth. |
| `OUTLINE_API_URL` | URL interne par laquelle le serveur joint Outline (par ex. `http://outline:3000`). |
| `OUTLINE_OAUTH_CLIENT_ID`, `OUTLINE_OAUTH_CLIENT_SECRET` | Connexion OAuth (voir [Connexion](/self-hosting/sign-in)). |
| `ALLOW_API_KEY_LOGIN` | `true` (par défaut) permet de se connecter avec une clé API Outline personnelle. |
| `OUTLINE_TEAM_ID` | N'accepter que les comptes d'un seul espace de travail d'`OUTLINE_URL`. |
| `OUTLINE_ALLOWED_HOSTS` | Serveurs Outline que l'on peut saisir (`*.example.com` accepté) ; vide : tout serveur https public. |
| `OUTLINE_ALLOW_PRIVATE` | `true` accepte aussi les serveurs en http ou sur des adresses internes. |

## E-mail et comptes sans Outline

| Variable | Rôle |
| --- | --- |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS` | Le serveur SMTP (587 avec STARTTLS, ou 465 avec `SMTP_SECURE=true`). |
| `MAIL_FROM` | Expéditeur, par ex. `TasksPipes <tasks@example.com>`. |
| `ALLOW_EMAIL_SIGNUP` | `true` (par défaut) permet à chacun de créer un compte avec une adresse e-mail (SMTP nécessaire). |
| `ALLOW_EMAIL_INVITATIONS` | `true` (par défaut) permet d'inviter d'autres personnes par e-mail. |
| `EMAIL_DOMAINS` | Domaines e-mail autorisés à s'inscrire ou à être invités, séparés par des virgules (tous par défaut). |

## Connexion d'entreprise (OpenID Connect)

| Variable | Rôle |
| --- | --- |
| `OIDC_ISSUER`, `OIDC_CLIENT_ID`, `OIDC_CLIENT_SECRET` | Le fournisseur et le client confidentiel qui y est enregistré, avec l'URI de redirection `APP_URL/auth/oidc/callback`. |
| `OIDC_NAME` | Libellé du bouton (*Continuer avec …*). |
| `OIDC_SCOPES` | Scopes demandés ; `openid email profile` par défaut. |
| `OIDC_ALLOWED_DOMAINS` | Domaines e-mail autorisés à se connecter ainsi. |
| `OIDC_ENABLED` | `false` la désactive en gardant ses réglages. |

## Tout le reste

| Variable | Rôle |
| --- | --- |
| `REDIS_URL` | Redis qui garde les compteurs de limitation de débit (celui fourni par défaut). |
| `TIMEZONE`, `REPORT_HOUR` | Fuseau horaire et heure (18 par défaut) des rapports. |
| `DEFAULT_LOCALE` | Langue quand ni le profil ni le navigateur n'en donnent une (`en`, `fr`, `es`…). |
| `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, `VAPID_SUBJECT` | Clés des notifications push ; dérivées d'`APP_SECRET` par défaut. |
| `WEBHOOK_ALLOW_PRIVATE` | `true` permet aux webhooks de joindre des adresses http et internes. |
| `SESSION_DAYS` | Durée des sessions, 30 jours par défaut. |
| `LOG_LEVEL` | `info` par défaut. |
