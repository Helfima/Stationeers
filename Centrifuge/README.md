# Centrifuge

## Descriptions

Scripts de pilotage de la centrifugeuse à gaz.

Ne pas modifier les paramètres dans les scripts en dehors du paramètre QTY_MAX définissant le seuil de vidange.

**N'oubliez pas de placer un Levier dans le réseau permettant d'activer ou non la machine, voir l'image ci-dessous sur la gauche.**
Ce levier est le seul élément indispensable, doit être unique dans le réseau, pas de réglage nécessaire il est lu via une instruction batch.

Composition des carburant:
* Fuel Oxygen = H2:O2 (2:1) ratio de 2 Hydrogen (Volatile) pour 1 Oxygen
* Fuel Nitrous = H2:N2O (1:1) ratio de 1 Hydrogen (Volatile) pour 1 Nitrous Oxide

Mettre un circuit intégré dans la machine, appliquer le programme selon le carburant utilisé:
* Fuel Oxygen = centrifuge_oxygen.ic10
* Fuel Nitrous = centrifuge_nitrous.ic10

Vitesse Rpm en régime établi
* Fuel Oxygen = 528
* Fuel Nitrous = 1188

Traitement de minerais en régime établi
* Fuel Oxygen = 0.5/s
* Fuel Nitrous = 1/s

Attention le régime maximal ne sera pas atteind car il y a les phases de monté en rpm et de vidange.

Le temps pour atteindre le régime établi est relativement long.

La machine se vidangera dans un fracas après avoir atteind 2000 minerais.

## Affichage complémentaire

Pour les Affichages complets utilisez le script centrifuge_display.ic10 dans un Housing. les élements barrés étaient des informations lors de la mise au point, ne pas en tenir compte.

Il y a 2 "Memory" pour l'affichage D1 et D2

Les 5 afficheurs du haut sont des consoles avec une carte "Graph Display", il faudra lié les consoles à un Logique Reader ou une mémoire (D1 et D2).
Pour les 3 premiers placer 3 Logic Reader dans le réseau
* Logic Reader RPM = input:Centrifuge var:Rpm
* Logic Reader Throttle = input:Centrifuge var:Throttle
* Logic Reader Stress = input:Centrifuge var:Stress

Ecrous du Housing
* D0: Centrifugeuse
* D1: Memory DiffRPM
* D2: Memory DiffStress
* D3: Reagents = Quantité des minerais dans la centrifugeuse, ne prend en compte que ceux minables et non glace.
* D4: FlowReagents = Quantité de minerais traités par seconde (tend vers 1)
* D5: Clock = Temps en second depuis la dernière vidange

![Tableau de bord](/Centrifuge/centrifuge.png)
