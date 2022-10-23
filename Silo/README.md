# Silos

## Descriptions

Scripts de pilotage des silos de stockage.

## Stockage
Chaque ligne est composée de 6 silos car les ICs ne contrôlent que 6 appareils.

Il faut 2 scripts par ligne, dans chaque script il faut modifier la constante START_SP selon le contenu souhaité:
* Pilote le routage: ![silo flipflop](/Silo/silo_flipflop.ic10)
* Pilote la sortie: ![silo provider](/Silo/silo_provider.ic10)

![Vue global des lingots](/Silo/Silos.png)

## Demande

Un scrip permettant de faire une requête sur les lingots:
*![silo requester](/Silo/silo_requester.ic10)

