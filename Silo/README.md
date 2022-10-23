# Silos

## Descriptions

Scripts de pilotage des silos de stockage.

Comme toujours on cherche le minimum de réglage ou sa simplicité.

## Stockage
Chaque ligne est composée de 6 silos car les ICs ne contrôlent que 6 appareils.

Les stockages seront de:
* 2 lignes pour les minerais (ingrédients des lingots, la requête se fait via un script de contrôle du four à gaz)
* 3 lignes pour les lingots (la requête se fait via un script de contrôle, section "Demande" ci-dessous)

Attention la première Chute FlipFlop contrôle l'entrée des items dans la ligne et la dernière oriente sur les 2 derniers silos.

Composition d'une ligne:
* 6 Silos numérotés de 0 à 5 (pour correspondre aux ecrous d0 à d5)
* 6 Chute FlipFlop numérotés de 0 à 5 (pour correspondre aux ecrous d0 à d5)
* 6 Stackers (inutile de les nommés)
* 2 Housings nommées silo_flipflop et silo_provider
* 2 Circuits
* 1 Logic mirror (pour la partie demande)
* 1 Ordinateur et sa carte mère (optionnel)

Pour la partie électrique, connectez tout dans un seul circuit.

Il faut 2 scripts par ligne, dans chaque script il faut modifier la constante START_SP selon le contenu souhaité:
* Pilote le routage: [silo_flipflop.ic10](/Silo/silo_flipflop.ic10)
* Pilote la sortie: [silo_provider.ic10](/Silo/silo_provider.ic10)

la constante START_SP aura pour valeur:
* 1 ou 7: pour les minerais (2 lignes de 6 silos)
* 13, 19 ou 25: pour les lingots (3 lignes de 6 silos)

![Vue global des lingots](/Silo/Silos.png)

## Demande

Un script permettant de faire une requête sur les lingots:
* Pilote la requête: [silo_requester.ic10](/Silo/silo_requester.ic10)

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
