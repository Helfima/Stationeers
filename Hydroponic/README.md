# Hydroponique

## Descriptions

Scripts de pilotage des plantes.

**N'oubliez pas de placer un Levier dans le réseau permettant d'activer ou non la machine, voir l'image ci-dessous seconde partie.**

Les plantes ont besoins d'eau et de gaz dans des conditions stables, du cycle jour/nuit.

![Hydroponic](/Hydroponic/harvies.png)

## Modèle de donnée

Le modèle de données est l'ensemble des paramètres, à placer dans chaque IC.
![Tables des paramètres](/Hydroponic/harvie_model.png)

### Utilisation du script

* Prendre le script [Modèle](/Hydroponic/harvie_model.ic10)
* Exécuter le script dans un IC
* Attendre que le Housing soit éteind, ce qui signifie que le script est terminé et que le modèle est dans la Stack

## Automatisation des plantes

Les plantes sont placées dans un milieu fermé.
La gestion se fait dans 2 réseaux séparés, la partie gestion de la plantation et la partie gestion de l'environement

### Gestion plantation
La gestion plantation est la partie semence, récolte et éclairage en automatique
Il faut placer dans le même réseau:
* les harvies
* les fliflop
* les lights
* le levier d'activation
* les affichages des états (optionnel)

Le script flipflop gère les flipflop pour orienter la semence dans le bon harvie, ne par oublier de mettre un stacker (settings=1) en début de ligne pour cadencer le flux et séparer graine par graine.
[harvie_flipflop.ic10](/Hydroponic/harvie_flipflop.ic10)

Le script light gère l'affichage et la lumière par cycle de 300s, le ratio jour nuit se fera sur 300s.
[tray_light.ic10](/Hydroponic/tray_light.ic10)

### Gestion environement
la gestion environement gère la température, la pression et ses gaz O2, CO2 et N2
Il faut placer dans le même réseau:
* les dials
* les pompes
* la climatisation
* le gaz sensor
* les 2 passives vents pour l'arrivé et la sortie des gaz

L'emetter lit la valeur des dials et génère une boucle de valeurs
[room_dial_emetter.ic10](/Hydroponic/room_dial_emetter.ic10)

Lit l'émetter et pliote les pompes et la climatisation
[room_dial_air.ic10](/Hydroponic/room_dial_air.ic10)
