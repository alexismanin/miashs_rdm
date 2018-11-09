# Dissertation : Web et interopérabilité

*Auteur :* Alexis Manin
*Date :* 9 novembre 2018

## Introduction

Le sujet traité ici est la place de l’interopérabilité dans le travail du Data scientist.  
Commençons par définir le mot interopérabilité. Son étymologie se décompose ainsi :
 1. Le préfixe [*inter*][1] : entre en latin.
 2. La racine [*operor*][2], qui définit l'action, le travail.
 3. Le suffixe [*able*][3], qui induit le principe *d'être capable de quelque chose*.

 Littéralement, le mot implique donc la capacité de plusieurs sujets à accomplir des tâches en collaboration. Dans le domaine informatique, cela se traduit par un système dans lequel plusieurs applications distinctes - donc potentiellement déployées dans des environnements différents - sont capables non seulement d'échanger de l'information, mais aussi d'exécuter un code dont les tâches sont réparties sur différents logiciels.

[L'AFUL][4] donne une très bonne définition de l’interopérabilité sur [un site dédié][5].

## 1. Web et interopérabilité
Pour que l'interopérabilité soit complète, il faut que l'interaction ne soit pas ambiguë. C'est à dire :
 * Chaque message échangé est compris en intégralité par son destinataire,
 * Les informations contenues dans un message sont suffisantes pour déclencher l'action voulu par le destinataire (construction d'une réponse, transfert vers un tiers, etc.).

Le web, et plus précisément le protocole HTTP a été conçu à cet effet. Ce dernier décrit un système d'échange structuré, afin que les appareils communiquant puissent se comprendre au mieux. Parmi les concepts facilitant l'interopérabilité, on peut citer :
 * L'application d'erreurs codifiées ([404: not found][11], [401: unauthorized][12], [500: internal server error][13], etc.)
 * Un système d'entête riche pour la négociation de contenu (Content-Encoding, Content-Type, Accept, Accept-Language, etc.)

Concevoir un service sur la base du protocole HTTP le rend-il interopérable par nature ? HTTP force une communication en requête/réponse, chacune composée d'un jeu d'entête et d'un corps contenant la donnée à échanger. Il est également obligatoire d'accompagner toute réponse d'un code décrivant le statut de l'échange (succès, erreur dûe à la requête, problème d’autorisation, etc.). Cependant, si la structure est figée, il est à la charge de l'utilisateur de remplir correctement chaque entête, de spécifier chaque code de réponse. Ainsi, un service ne bénéficie des avantages de la RFC HTTP que si sa réalisation respecte les fonctionnalités qui y sont décrites.  
Dans la réalité, on peut rencontrer des services faisant fi des mécanismes standard. Les raisons peuvent être multiples :
 * contrainte de temps,
 * contrainte de coût,
 * méconnaissance de la RFC,
 * etc.

Dans la culture Geek, il n'est pas rare de tourner en dérision ce genre de problème, rencontré par tout développeur au moins une fois dans sa vie. On peut par exemple citer [ce dessin du site CommitStrip][10].

## 2. L'interopérabilité, le web et le data scientist
Intéressons-nous maintenant à ce que l'interopérabilité sur l'internet peut apporter à un Data Scientist.
Pour qu'une analyse de données soit pertinente, il faut généralement croiser différentes sources de données. Ceci afin :
 * d'éviter au maximum les biais "locaux" (erreur de protocole expérimental, effet de bord introduit par un facteur local, etc.),
 * de pouvoir étudier, voir mettre au jour des relations entre des phénomènes distincts.

Ainsi, le web est un outil fantastique, qui permet à des organismes de par le monde de publier librement des données. L'analyste a alors à portée un potentiel de fouille énorme. Cependant, le réseau à lui seul ne permet pas de briser la barrière de l'information. Effectivement, si un signal est émis sous une forme connue exclusivement de l'émetteur, c'est-à dire que sa structure ne permet pas une identification claire de l'information qu'il contient, alors il est inexploitable par un tiers. Pire, il peut induire une mauvaise interprétation, et engendrer des erreurs.

On peut citer [l'histoire de la sonde *Mars Climate Orbiter*][6] de la NASA, pour laquelle l'ampleur du problème fut même catastrophique. Dans cette anecdote, le système de contrôle de trajectoire de la sonde était réparti en deux codes co-dépendants. Un premier fournissait des mesures de poussée au deuxième, qui s'en servait pour la correction de la navigation. Le problème rencontré ici était que les unités des valeurs transmises n'étant pas clairement définies. le second logiciel fit une mauvaise interprétation, donnant lieu à des changements de trajectoires non pertinents... jusqu'à la perte de l'appareil.

Un système ne s'arrête pas à la donnée, et le même constat peut être fait avec la capacité de calcul. Un système interopérable donne la possibilité de déléguer certaines tâches à un système distant. C'est une composante extrêmement intéressante pour un analyste, puisque cela permet de réaliser des opérations qui ne peuvent être exécutées directement par la machine de l'utilisateur, que ce soit à cause de leur nature (algorithme évolué, architecture spécifique) ou de leur coût d'exécution. Le web offre la possibilité de connecter une multitude de machines. Si ces dernières sont capables de s'envoyer des commandes de façon efficace et sans restriction, la capacité d'opération d'un utilisateur revient alors aux possibilités offertes par l'ensemble des machines du parc.
Cependant, si la documentation est insuffisante, il sera difficile de déléguer correctement une exécution. De même, si les paramètres d’exécution nécessitent une manipulation trop complexe en amont (paramètre d'entrée dans un format difficile à éditer, informations difficiles à obtenir, etc.), l'interopérabilité est brisée, car l'opérateur devient incapable de faire fonctionner l'application cible.

Les exemples d'interopérabilité de traitement sont nombreux. On peut citer par exemple :
 - [la plateforme *Colaboratory* de Google][7] qui permet d'exécuter des commandes TensorFlow sur un serveur distant, mettant ainsi à disposition de la puissance GPU, nécessaire pour les algorithmes de Deep-learning.
 - [Le standard *WPS* de l'OGC][8] qui vise à définir des APIs HTTP pour l'exécution de traitements à distance.
 - [L'architecture en *grille de calcul*][9] qui consiste à virtualiser un super-calculateur grâce à la connexion de machines distantes et hétérogènes.

## 3. Perspectives
Internet est un réseau mondial. Avec les infrastructures modernes, notre accès au web est quasiment illimité. Le problème de la barrière matérielle est en phase de disparaître, laissant les utilisateurs face au problème de l'interprétation : comment localiser dans ce gigantesque espace l'information pertinente ? Comment comprendre l'information sous toutes ses formes ?

Aujourd'hui, le métier de DataScientist requiert un investissement de temps important pour la collecte de données. Avec des catalogues interopérables, il est possible de réduire l'effort de fouille.
Si l'information est diffusée sous une forme standard, il est possible de rendre l'exploitation plus aisée en faisant disparaître le besoin de conversion de la donnée.
En conséquence, l'investissement de temps de l'analyste à la fouille et le nettoyage des données diminue, au profit du temps d'analyse et de consolidation des résultats.

Cependant, la démocratisation de l'interopérabilité requiert un effort collectif conséquent. Cela nécessite l'édition de procédures adaptées pour la mise en forme et l'échange de données, mais aussi :
 * Leur diffusion libre,
 * Leur acceptation,
 * Leur mise en place massive.

Le constat ici, c'est que le Data scientist, s'il adhère au principe d'interopérabilité, ne peut se contenter du rôle de consommateur passif. Toute application ou résultat qu'il produit est candidat à la diffusion, et donc à l'intégration dans un système interopérable.

Cependant, il faut contraster notre propos par les impératifs de rentabilité (business) rencontrés dans le monde du travail. Le temps et le coût de développement nécessaires à la création d'un système plus ouvert peuvent bloquer à sa réalisation. Bien que l'interopérabilité soit un objectif à garder en tête, il convient avant tout d'être pragmatique afin de ne pas pénaliser de façon trop importante des objectifs à court ou long terme.

[1]: https://fr.wiktionary.org/wiki/inter#la "étymologie latine du mot *inter*"
[2]: https://fr.wiktionary.org/wiki/operor#la "étymologie latine du mot *operor*"
[3]: https://fr.wiktionary.org/wiki/-able#fr "étymologie française du mot *able*"
[4]: https://aful.org/ "Site officiel de l'AFUL (Association Francophone des Utilisateurs de Logiciels Libres)"
[5]: http://definition-interoperabilite.info/ "Définition de l'interopérabilité par l'AFUL"
[6]: https://fr.wikipedia.org/wiki/Mars_Climate_Orbiter#Perte_de_la_sonde "L'histoire de la perte de la sonde MCO"
[7]: https://colab.research.google.com/notebooks/welcome.ipynb "Présentation de la plate-forme Colaboratory"
[8]: https://www.opengeospatial.org/standards/wps "Accueil OGC:WPS"
[9]: https://fr.wikipedia.org/wiki/Grille_informatique#Grille_de_calcul "Définition d'une grille de calcul"
[10]: http://www.commitstrip.com/fr/2018/08/24/http-headers-ftw/ "HTTP headers for the win"
[11]: https://http.cat/404 "404: Not found"
[12]: https://http.cat/401 "401: Unauthorized"
[13]: https://http.cat/500 "500: Internal server error"
