# Silos

## Descriptions

Scripts de pilotage des silos de stockage.

Comme toujours on cherche le minimum de réglage ou sa simplicité.

## Model

Les scripts utilisent un model de données pour réduire les nombres de lignes.

Placer le model [silo_packet_model.ic10](/Silo/silo_packet_model.ic10) sur chaque IC, allumer le housing et attendre son arrêt signifiant que le model est placé dans la Stack de le IC et utilisable par les scripts qu'on met par la suite.



## Stockage

Chaque ligne est composée de 6 silos car les ICs ne contrôlent via les écrous que 6 appareils, bien qu'avec les nouvelles fonctions de batch nommé, cette limite n'est plus véritablement nécessaire la réponse des actions reste meilleur avec des actions via les 6 appareils sur les écrous.

Les stockages seront de:
* 2 lignes pour les minerais (ingrédients des lingots, la requête se fait via un script de contrôle du four à gaz ou une demande de minerais)
* 3 lignes pour les lingots (la requête se fait via un script de contrôle, section "Demande" ci-dessous)

Attention: 
* La première Chute FlipFlop contrôle l'entrée des items dans la ligne et la dernière oriente sur les 2 derniers silos.
* Pour la partie électrique, connectez tous les éléments de chaque ligne silo dans un seul circuit.

Eléments:
* 6 Stackers, inutile de les nommés
* 2 Housings nommées silo_flipflop, silo_provider1 et silo_provider2
* 2 Circuits
* 1 Logic mirror, connecté au routage
* 1 Ordinateur et sa carte mère (optionnel)

Il faut 3 scripts par ligne, dans chaque script il faut modifier la constante STORAGE_LINE selon le contenu souhaité:
* Pilote le routage item: [silo_flipflop.ic10](/Silo/silo_flipflop.ic10)
* Pilote la sortie pour les demandes: [silo_packet_provider.ic10](/Silo/silo_packet_provider.ic10)

la constante STORAGE_LINE aura pour valeur:
* 1 ou 2: pour les minerais (2 lignes de 6 silos)
* 3, 4 ou 5: pour les lingots (3 lignes de 6 silos)

![Vue global des lingots](/Silo/Silos.png)

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
