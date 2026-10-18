---
title: Traduction
description: Ajoutez une langue avec un seul fichier.
---

TasksPipes existe en anglais, en français et en espagnol. Chaque langue est **un fichier**, `locales/<code>.json`, à
la racine du dépôt, qui contient les textes de l'application web, les messages du serveur et le catalogue intégré.

## Ajouter une langue

1. Copiez `locales/fr.json` en `locales/<code>.json` (`de`, `it`, `pt`…).
2. Renseignez `name` (le nom de la langue dans cette langue), `intl` (par ex. `de-DE`) et `csvSeparator`, et traduisez
   les valeurs de `web` et `server` — leurs clés sont les textes anglais.
3. Traduisez `catalog` à partir de `locales/en.json` : ses clés sont les libellés français du catalogue.
4. Reconstruisez et redémarrez : la langue apparaît dans le menu. Aucun changement de code.

Gardez les marqueurs (`{name}`, `{n}`…) tels quels, et gardez des traductions courtes. Une langue peut être publiée
partiellement traduite : les textes manquants s'affichent en anglais, et les tests indiquent combien il en reste.
