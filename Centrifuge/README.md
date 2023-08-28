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
* Fuel Oxygen = [centrifuge_oxygen.ic10](/Centrifuge/centrifuge_oxygen.ic10)
* Fuel Nitrous = [centrifuge_nitrous.ic10](/Centrifuge/centrifuge_nitrous.ic10)

Vitesse Rpm en régime établi
* Fuel Oxygen = 528
* Fuel Nitrous = 1188

Traitement de minerais en régime établi
* Fuel Oxygen = 0.5/s
* Fuel Nitrous = 1/s

Attention le régime maximal ne sera pas atteind car il y a les phases de monté en rpm et de vidange.

Le temps pour atteindre le régime établi est relativement long, environs 600s.

Inutile de changer les coefficients dans les scripts, ils sont déjà optimaux, les variations sont de quelque 0.001 de minerais par second décart.

La machine se vidangera dans un fracas après avoir atteind 2000 minerais avec au flow de 0.866 minerai par seconde.

## Affichage complémentaire

Pour les Affichages complets utilisez le script centrifuge_display.ic10 dans un Housing. Il n'y a qu'un seul écrou à configurer sur la centrifugeuse le D0 le reste utilise des fonctions batch nommées.

Il faut nommer exactement les mémoires de M1 à M5 et les connecter à sa console D1 à D5 correspondante.

Nom des mémoires
* M1 = Memory Stress
* M2 = Memory RPM
* M3 = Memory Throttle
* M4 = Memory Diff RPM
* M5 = Memory Diff Stress

Il faut nommer exactement les afficheurs LED de D1 à D3

Nom des afficheurs LED
* D1 = Display Reagents
* D2 = Display Reagents Flow
* D3 = Display Clock

![Tableau de bord](/Centrifuge/centrifuge.png)
