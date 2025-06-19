# Le pont de climatiseur

Un climatiseur ne fonctionne que sur un plage d'environs 100°, donc l'idée c'est de faire des tranches pour optimer.

Le pont de climatiseur variable est utile que sur Vulcan à cause de ses 126°c à +1000°c

## le principe

* Chaque climatiseur contient le même script [filtration_coolant.ic10](/Filtration/filtration_coolant.ic10) et chacun d'eux sauf le premier sont liés à une pompe pour mettre en pression le refroidissement
* le premier climatiseur pilote l'ensemble et c'est le seul avec le capot IC fermé (le script détecte aussi le maitre)
* La valve qui lie 2 radiateurs au circuit de refroidissement:
    * Le script lie la température du capteur, alors faut le mètre là ou sont les radiateurs
    * C'est un bypass pour refroidir passivement quand cela est possible
* Les 2 mémoires permettent le paramètrage:
    * Une mémoire avec une valeur positive de 18 pour ciblé 18°c mais atteindra plutot 20°c en moyenne
    * Une mémoire avec une valeur négative de -60 pour le palier de 60° entre chaque climatiseur
* L'image est un peu ancienne, le mieux:
    * c'est de raccorder les pompes sur le circuit coulant bleu et de dégager le régulateur ou plutot de le décaler pour l'injection de gaz
    * du coup en placant la valve directement sur les 2 radiateurs principaux en bout de pont on gagne 2 radiateurs.

![Tables du modèle](/Filtration/Filtration_coolant.png)

