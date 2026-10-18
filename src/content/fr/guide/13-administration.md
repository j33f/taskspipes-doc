---
title: Administration
description: Comptes et paramètres de l'instance, pour les administrateurs désignés par ADMIN_EMAILS.
---

Les administrateurs de l'instance sont désignés par la variable `ADMIN_EMAILS`, jamais dans l'application. Seuls un
compte e-mail, un compte Outline du serveur défini par `OUTLINE_URL`, ou un compte de connexion d'entreprise dont le
fournisseur garantit l'adresse peuvent l'être. Ils trouvent **Administration** dans le menu du compte.

## Comptes

L'onglet **Comptes** liste tous les comptes — nature, serveur Outline, dernière connexion, état — et permet d'en
**désactiver** un : ses sessions et ses pages ouvertes sont fermées aussitôt, il ne peut plus se connecter, ses tâches
et son historique restent. Il peut être réactivé. Un administrateur ne peut se désactiver lui-même, ni désactiver un
autre administrateur.

## Paramètres

L'onglet **Paramètres** gère l'instance pendant qu'elle tourne, sans redémarrage :

- **E-mail (SMTP)** — serveur, port, TLS, utilisateur, mot de passe, expéditeur, et un bouton *M'envoyer un e-mail de
  test* ;
- **Outline** — activé ou non (désactivé, les comptes Outline sont déconnectés et ne peuvent plus se connecter, leurs
  tâches restent), serveur principal, son adresse d'API, autres serveurs autorisés, adresses internes, un seul espace
  de travail, connexion par clé API ;
- **OAuth Outline** — identifiant et secret du client, avec l'URL de redirection à copier ;
- **Comptes sans Outline** — inscription, invitations par e-mail, et les **domaines e-mail** autorisés ;
- **Connexion d'entreprise (OpenID Connect)** — activée ou non, émetteur, client, secret, libellé du bouton, scopes,
  domaines.

Un paramètre fixé par l'environnement du serveur (`.env`) l'emporte et s'affiche **verrouillé**. Les secrets sont
chiffrés et jamais réaffichés : on peut seulement les remplacer ou les retirer. Un changement qui vous empêcherait, ou
empêcherait tous les administrateurs, de se connecter est refusé.

## Historique des changements

Chaque changement d'un paramètre est listé : qui, quand, avant et après — jamais un secret.
