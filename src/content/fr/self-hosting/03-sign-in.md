---
title: Moyens de connexion
description: OAuth et clés API Outline, comptes e-mail et connexion d'entreprise.
---

Chacun des moyens ci-dessous se règle dans `.env` ou, par un administrateur, dans **Administration › Paramètres**.

## OAuth Outline (recommandé)

On se connecte avec son compte Outline en un clic. Cela fonctionne avec le serveur défini comme serveur Outline
principal, et demande un admin de l'espace Outline :

1. Dans Outline, **Paramètres › Applications › Nouvelle application** : nom `TasksPipes`, URL de redirection
   `<APP_URL>/auth/outline/callback`.
2. Copiez son **Client ID** et son **Client secret** dans les paramètres (ou `OUTLINE_OAUTH_CLIENT_ID` et
   `OUTLINE_OAUTH_CLIENT_SECRET`).

L'URL de redirection doit correspondre exactement, `https` compris.

## Clés API Outline

Avec la connexion par clé API activée, on peut coller une clé API personnelle créée dans Outline (**Paramètres ›
API**), avec un accès en lecture et en écriture aux documents. On saisit l'adresse de son serveur Outline ; seuls les
serveurs https publics sont acceptés, sauf si les adresses internes sont autorisées.

## Comptes e-mail

Les personnes sans Outline se connectent par des liens à usage unique envoyés par e-mail : configurez le SMTP. Elles
obtiennent un compte en **s'inscrivant** ou en étant **invitées**. Sans SMTP, l'inscription n'est pas proposée et une
invitation affiche le lien, que la personne qui invite transmet. Les **domaines e-mail** autorisés peuvent être
restreints.

## Connexion d'entreprise (OpenID Connect)

Tout fournisseur OpenID Connect convient (Keycloak, Okta, Entra ID, Google Workspace, Authentik…) :

1. Enregistrez un **client confidentiel** avec l'URI de redirection `<APP_URL>/auth/oidc/callback`.
2. Renseignez l'URL de l'émetteur, l'identifiant et le secret du client, et le libellé du bouton.

Le parcours utilise PKCE, et le jeton d'identité est vérifié avec les clés du fournisseur. Un compte e-mail de même
adresse n'est relié que si le fournisseur la garantit (`email_verified`).
