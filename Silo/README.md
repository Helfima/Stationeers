# Silos

## Descriptions

Scripts de pilotage des silos de stockage.

Comme toujours on cherche le minimum de réglage ou sa simplicité.

## Model

Les scripts utilisent un model de données pour réduire les nombres de lignes.

Placer le model [silo_packet_model.ic10](/Silo/silo_packet_model.ic10) sur chaque IC, allumer le housing et attendre son arrêt signifiant que le model est placé dans la Stack de le IC et utilisable par les scripts qu'on met par la suite.

## Nommage par Hash défini

Il est possible d'avoir des noms d'éléments ayants des valeurs de hash définis très pratique pour faire de l'incrémentale sur des hashs.

En gros le générateur ajoute les caractères nécessaires pour obtenir des hashs consécutifs; pour le silo SILO-00-1ljQlQ, SILO-01-9WbSsK donnant respectivement un hash de 100, 101

Lien du site [StationeersHashGen](https://computererika.github.io/StationeersHashGen/)

Dans les cas ou j'ai utilisé les fonctions de batch nommé (ex: sbn ou lbn) je suis parti d'un index de départ à 100 je n'ai pas voulu commencer à 0 source éventuelle de problème.

## Stockage

Chaque ligne est composée de 6 silos car les ICs ne contrôlent via les écrous que 6 appareils, bien qu'avec les nouvelles fonctions de batch nommé cette limite n'est plus véritablement nécessaire une nouvelle limite est apparue au niveau des channels permettant des dialogues sur 8 canaux mais la division en 6 reste idéal.

Les stockages seront de:
* 2 lignes pour les minerais (ingrédients des lingots, la requête se fait via un script de contrôle du four à gaz)
* 3 lignes pour les lingots (la requête se fait via un script de contrôle, section "Demande" ci-dessous)

Attention:
* La première Chute FlipFlop contrôle l'entrée des items dans la ligne et la dernière oriente sur les 2 derniers silos.
* Les noms sont définis pour avoir des hashs incrémentables, il faut strictement copier coller le nom des éléments.

Composition d'une ligne:
* 6 Silos nommés
  * SILO-00-1ljQlQ
  * SILO-01-9WbSsK
  * SILO-02-2ZxUar
  * SILO-03-1KmG1P
  * SILO-04-2tc5TP
  * SILO-05-04Uwsw
* 6 Chute FlipFlop nommées
  * FLIPFLOP-00-2nAROy
  * FLIPFLOP-01-028LiJ
  * FLIPFLOP-02-1XSVBZ
  * FLIPFLOP-03-0uCZKe
  * FLIPFLOP-04-1vH6wx
  * FLIPFLOP-05-1GVWdJ
* 6 Stackers (inutile de les nommés)
* 3 Housings nommées silo_flipflop, silo_provider1 et silo_provider2
* 3 Circuits
* 2 Logic mirror (pour la partie demande et l'affichage)
* 1 Ordinateur et sa carte mère (optionnel)

Pour la partie électrique, connectez chaque ligne de 6 silos dans un seul circuit.

J'ai doublé le provider pour éviter des problèmes de dialogue:
* Les 5 rangés étant lié via les mirrors pour l'affichage du contenu.
* Les 2 rangés de minerais sont lié via les mirrors avec le fourneau
* Les 3 rangés de lingots sont lié via les mirrors avec le magasin

Il faut 3 scripts par ligne, dans chaque script il faut modifier la constante STORAGE_LINE selon le contenu souhaité:
* Pilote le routage: [silo_flipflop.ic10](/Silo/silo_flipflop.ic10)
* Pilote la sortie pour les demandes: [silo_packet_provider.ic10](/Silo/silo_packet_provider.ic10)
* Pilote la sortie pour l'affichage': [silo_packet_provider.ic10](/Silo/silo_packet_provider.ic10)

la constante STORAGE_LINE aura pour valeur:
* 1 ou 2: pour les minerais (2 lignes de 6 silos)
* 3, 4 ou 5: pour les lingots (3 lignes de 6 silos)

![Vue global des lingots](/Silo/Silos.png)

## Channel

* Channel0: Request Hash
* Channel1: Request Quantity
* Channel2: Quantity Item 1
* Channel3: Quantity Item 2
* Channel4: Quantity Item 3
* Channel5: Quantity Item 4
* Channel6: Quantity Item 5
* Channel7: Quantity Item 6


## Demande

le protocole de requête [lien protocole](/Silo/silo_packet.md)

Le script de requête attend qu'au moins un provider renvois 9000000 et peut alors envoyer le hash puis la quantité voulu.

Un script permettant de faire une requête sur les lingots:
* Pilote la requête: [silo_packet_requester.ic10](/Silo/silo_packet_requester.ic10)

Composition:
* 1 bouton poussoir
* 1 bouton molette (Dial) (réglage à 17)
* 1 console avec un circuit Hash connecté au housing
* 1 petit afficheur
* 1 housing
* 1 Circuit
* 1 Ordinateur et sa carte mère (optionnel)

Aucun réglage a effectué, tout passe par des instructions batch.

Le réseau électrique va jusqu'aux logics mirors du stockage.

La sortie des lignes du stockage sont mergées et sorte à proximité du pilotage.

La rotation de la molette interroge les providers via les mirrors, ces providers retournent la quantité du stockage correspondante.

L'appui sur le bouton poussoir demande un stack, l'affichage de quantité change de couleur pour confirmer l'action.

![Vue global pour la demande](/Silo/Request.png)
