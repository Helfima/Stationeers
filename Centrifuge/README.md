# Centrifuge

Scripts de pilotage de la centrifugeuse à gaz.

Mettre un circuit intégré dans la machine, appliquer le programme selon le carburant utilisé:
* Fuel Oxygen H2:O2 (2:1) = centrifuge_oxygen.ic10
* Fuel Nitrous H2:N2O (1:1) = centrifuge_nitrous.ic10

Le temps pour atteindre le régime établi est relativement long.

La machine se vidangera dans un fracas après avoir atteind 2000 minerais.

Pour les Affichages complets utilisez le script centrifuge_display.ic10 dans un Housing. les élements barrés étaient des informations lors de la mise au point, ne pas en tenir compte.

Il y a 2 "Memory" pour l'affichage D1 et D2

* D0: Centrifugeuse
* D1: Memory DiffRPM
* D2: Memory DiffStress
* D3: Reagents
* D4: FlowReagents
* D5: Clock

![Tableau de bord](/Centrifuge/centrifuge.png)