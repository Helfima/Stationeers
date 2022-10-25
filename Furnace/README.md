# Furnace Model

## Descriptions

Script de pilotage du four avancé

## Modèle de donnée

Le modèle de données est l'ensemble des paramètres, quantité de minerais, valeurs limites en températures ou en pressions.

Mettre l'ensemble des valeurs dans un programme IC de 128 lignes n'est pas aisé voir impossible si en plus on y ajoute d'autres éléments comme du contrôle de valeur,
bref si on le fait normalement on va devoir multiplié les IC.

J'ai fini par utiliser la partie Stack (tableau) des IC pour y stocker ces valeurs,
ce ci impose de passer le script de modèle de données avant le script utilisant les données.
C'est possible car la Stack de l'IC n'est jamais effacée mais simplement modifiée.

Je ne voulais pas non plus utiliser plusieurs scripts pour le modèle de données, j'ai donc utilisé une méthode de compression.

### Tables de valeurs
Ci-dessous les tableaux de valeur que j'ai utilisé:
1. Le premier tableau correspond aux valeurs initiales lisibles
2. Le second tableau ne contient que des valeurs numériques
3. Le troisième tableau est la table d'encodage des valeurs numériques et desous celle des ores
4. Le quatième tableau contient les valeurs encodées et la dernière colonne la valeur finale

Une chose à savoir c'est qu'il y a une taille limite de 15 chiffres pour la valeur numérique.

![Tables du modèle](/Furnace/Furnace_model.png)

### Utilisation du script

* Prendre le script [Modèle](/Furnace/Furnace_model.ic10)
* Exécuter le script dans un IC
* Attendre que le Housing soit éteind, ce qui signifie que le script est terminé et que le modèle est dans la Stack

### Utilisation du modèle dans un script

La fonction de lecture des données a placé au début de votre script que vous appellez via `jal loadValues`
```mips
loadValues:
mul sp sp 11
move r15 11
add sp sp r15
pop rr15
sub r15 r15 1
brne r15 0 -2
mul Qty1 Qty1 FACTOR
mul Qty2 Qty2 FACTOR
mul Qty3 Qty3 FACTOR
j ra
```
La fonction va placer les valeurs dans les registres r1 à r11 en fonction de la valeur de 'sp' compris entre 0 et 17 (voir la première colonne du premier tableau).

il faudra définir la constante 'FACTOR' pour avoir une valeur de quantité par exemple de 50 pour un stack complet d'un type de minerais `define FACTOR 50`.
```
alias Hash r1
alias Hash1 r2
alias Hash2 r3
alias Hash3 r4
alias Qty1 r5
alias Qty2 r6
alias Qty3 r7
alias Tmin r8
alias Tmax r9
alias Pmin r10
alias Pmax r11
```
