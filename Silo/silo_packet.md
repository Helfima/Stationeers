# Codes requêtes

Ici une description du protocole utiliser pour les échanges de packet.

## Format protocole

Le format de protocole: TNNNCCC
* T: Type de l'échange
* N: Numero provideur
* C: Code de l'échange

## Valeurs protocole

Le type provider T: 9
Le numéro éventuel du provider NNN: 0 à 999
Les codes CCC:
* 000
    * 000: En attente
* 100 (Commande)
    * 100: Liste
    * 101: Item
* 200 (Succès)
    * 200: Ok
* 400 (Erreur)
    * 404: Not Found

## Usage protocole

* 9000000: Les providers sont en attentes, spécifie un réseau libre pour une requête.
* 9001100: Obtenir la liste des minerais par exemple du provideur 001
* 9000200: Fin de l'échange