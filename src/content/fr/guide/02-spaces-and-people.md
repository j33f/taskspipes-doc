---
title: Espaces et personnes
description: Espaces personnels et d'équipe, collègues Outline, invitations et mises en relation.
---

## Les espaces

Chacun a un **espace personnel** ; les espaces personnels des personnes que vous voyez sont visibles aussi. Les
**espaces d'équipe** se créent en choisissant leurs membres. La gouvernance se partage en promouvant d'autres membres
*admin* ; une équipe garde toujours au moins un admin. Les admins d'une équipe gèrent son nom, ses membres, leurs rôles
et sa suppression.

## Les collègues Outline

Une fois TasksPipes relié à Outline, tout l'espace de travail Outline est là d'emblée, importé à la première connexion.
Les collègues qui ne se sont pas encore connectés à TasksPipes apparaissent grisés : ils ne reçoivent aucune tâche,
ne rejoignent aucune équipe et ne reçoivent aucun e-mail tant qu'ils ne se sont pas connectés une fois. **Invitez-les**
depuis la barre latérale ou leur page : ils reçoivent un e-mail les invitant à se connecter avec leur compte Outline,
ou, si l'instance n'envoie pas d'e-mails, le lien à leur transmettre est copié.

Chaque serveur Outline garde ses personnes et ses équipes : les comptes d'un serveur ne voient pas ceux d'un autre.

## Les comptes sans Outline

Les personnes sans compte Outline peuvent **créer un compte** depuis la page de connexion avec leur seule adresse
e-mail et un nom d'affichage : un lien envoyé par e-mail confirme l'adresse et les connecte. Elles se connectent par
liens à usage unique, peuvent activer la **double authentification** (TOTP, par ex. Google Authenticator), changer leur
nom et leur photo. Elles n'ont pas accès aux documents Outline.

Avec la **connexion d'entreprise** (OpenID Connect), on peut aussi continuer avec votre fournisseur d'identité. La
première connexion crée le compte, sauf si un compte e-mail a la même adresse et que le fournisseur la garantit : ce
compte est alors relié et conservé, avec ses tâches et ses équipes.

## Invitations et mises en relation

Depuis **Inviter** dans le menu du compte, invitez quelqu'un par e-mail, éventuellement dans l'une de vos équipes :

- **une nouvelle adresse** : un compte e-mail est créé et reçoit un lien de connexion valable 48 heures ; vous êtes
  aussitôt en relation. Si le lien n'est pas utilisé à temps, le compte est désactivé jusqu'à ce qu'on envoie un
  nouveau lien ou qu'on invite à nouveau l'adresse ;
- **quelqu'un déjà sur TasksPipes** : il reçoit une **demande de mise en relation**, qu'il accepte ou refuse. La réponse
  est la même que l'adresse ait un compte ou non : une invitation ne révèle jamais qui utilise TasksPipes.

Les personnes en relation se voient et peuvent s'envoyer des tâches ; l'équipe choisie est rejointe à l'acceptation.

## Qui voit qui

- Les comptes Outline d'un même serveur se voient.
- Un compte e-mail ou de connexion d'entreprise ne voit que les personnes avec qui il est en relation, et les membres
  de ses équipes.
- Les comptes désactivés ne sont vus de personne.
