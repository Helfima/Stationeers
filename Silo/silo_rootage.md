# Rootage

Le rootage fait office d'aiguillage des ressources mais aussi de base de données pour les informations de stockage

## Database

* [0-30] Hash des items
* [30-60] Quantité des items dans les silos
* [100] Code de l'échange
* [101] Index de rootage
* [102] Hash de l'item demandé
* [103] Quanité de l'item demandé

## Valeurs Code de l'échange

Les codes:
* 000
    * 000: En attente
* 100 (Commande)
    * 100: Request
* 200 (Succès)
    * 200: Ok
* 400 (Erreur)
    * 404: Not Found

## Valeurs Model

### Index stack des Hash de minerais
0. `1724793494`  # 1:Coal Ore
0. `-983091249`  # 2:Colbalt Ore
0. `-707307845`  # 3:Copper Ore
0. `-1348105509` # 4:Gold Ore
0. `1758427767`  # 5:Iron Ore
0. `-190236170`  # 6:Lead Ore
0. `1830218956`  # 7:Nickel Ore
0. `1103972403`  # 8:Silicon Ore
0. `-916518678`  # 9:Silver Ore
0. `-1516581844` # 10:Uranium Ore
0. `-831480639`  # 11:Biomass
0. `-654790771`  # 12:Steel Ingot

### Index stack des Hash des lingots
12. `2134647745`  # 13:Lead Ingot
12. `252561409`   # 14:Charcoal
12. `-404336834`  # 15:Copper Ingot
12. `-929742000`  # 16:Silver Ingot
12. `226410516`   # 17:Gold Ingot
12. `-1301215609` # 18:Iron Ingot
12. `-1406385572` # 19:Nickel Ingot
12. `-290196476`  # 20:Silicon Ingot
12. `-654790771`  # 21:Steel Ingot
12. `502280180`   # 22:Electrum Ingot
12. `-82508479`   # 23:Solder Ingot
12. `1058547521`  # 24:Constantan Ingot
12. `-297990285`  # 25:Invar Ingot
12. `412924554`   # 26:Astroloy Ingot
12. `-787796599`  # 27:Inconel Ingot
12. `156348098`   # 28:Waspaloy Ingot
12. `1579842814`  # 29:Hastelloy Ingot
12. `-1897868623` # 30:Stellite Ingot