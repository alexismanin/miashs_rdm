---
title: "L'intéroperabilité dans l'activité d'un data scientist"
author: "Dan-Tiberiu COSTIN"
date: "11/9/2018"
output: html_document
---

## 1. Introduction 
Lors de cette dissertation j’interroge le role de l’ intéroperabilité dans le travail d’un data scientist. 
Selon l’Association Francophone des Utilisateurs de Logiciels Libres [(AFUL)](http://definition-interoperabilite.info/) l’interoperabilité est “la capacité que possède un produit ou un système, dont les interfaces sont intégralement connues, à fonctionner avec d'autres produits ou systèmes existants ou futurs et ce sans restriction d'accès ou de mise en œuvre”.

Dans cette définition on remarque une importance particulière accordé aux interfaces du système ou produit. C’est indispensable que ces interfaces soie entièrement connu car c’est par ces interfaces que le système va communiquer avec les autres.

Ainsi l’interopérabilite peut être vue également comme la capacité d’un système ou produit de participer de manière complètement contrôlée et sans aucune restriction à un flux de données avec d’autres systèmes et produits. L’intéroperabilité est ansi le concept central du monde informatique et rendu possible par la standardisation du language et du protocole utilisé. 

## 2. Interoperabilité du Web

L’ interopérabilité est présente et nécessaire dans beaucoup de systèmes comme par example le réseau électrique auquel une vaste diversité d’appareils peuvent s’ alimenter, cependant pour un data scientist le meilleur example d’intéroperabilité est l’internet moderne, une synergie de deux grandes technologies principales : un réseau et un protocole de communication.

Dans les années 70 l’informaticien Américain Lawrence G. Roberts développe  ARPANET, un réseau d’ordinateurs qui va servir comme base technologique de l’internet. En 1990 Tim Berners-Lee un informaticien Britannique, apport les trois technologies fondamentales du protocole WWW. La grande interopereabilité de l’internet est rendu possible grace à ces trois technologies distinctes qui ensemble forme la “collone vertébrale” du World Wide Web : 

 - le protocole de communication HTTP,
 - le format de communication HTML,
 - le URI - l’adresse standardisée de chaque ressource disponible sut l’internet. 
 
Ces trois technologies, ainsi que d’autres langages utilisées par l’internet (tell que le RDF, XML etc ) sont standardisées, validé, et maintenues à jour par le W3C ce qui rend l’internet interoperable à travers toutes plateformes et technologies informatiques. Quelque soie l’application (le client) il peut toujours avoir accès à l’internet et échanger les données avec d’autres systèmes connectés gerce aux standards du language et du protocole d’échange imposé par le W3C. L’internet est ainsi un bon example d’intéropérabilité car c’est le concept central autour duquel l’intent à été conçu et il est d’autant plus important avec l’apparition ultérieure du web sémantique et son métalangage RDF. 

## 3. Data Science et Intéroperabilité 

Le domaine de la “data science” ainsi que le métier de data scientist sont assez récentes par rapport au concept d’intéroperibilité de l’internet. Pour comprendre l’importance de l’intéroperabilité pour un ‘data scientist’ il est pertinent d’abord de définir le terme de data scientist et expliquer brièvement son apparition. 
Depuis l’apparition des premiers machines de calcul avec la Machine Turing introduite par Alan Turing en 1936, la mathématique et l’informatique ont évolué ensemble.  En 1965 l’ingénieur en électronique Gordon E. MOORE remarque que le nombre de transistors dans un microprocesseur est doublé environ tous les 18 mois. Il s’appuie sur cette observation pour prédire l’évolution de la technologie du calcul et aujourd’hui, plus de 50 ans plus tard ses prévisions restent toujours valables, car même s’il n’est plus possible de continuer à doubler la densité de transistors dans un microprocesseur à cause des limitations imposées par les lois physique, il est toujours possible d’augmenter le nombre des processeurs dans une machine.

Cette explosion de la puissance de calcul reste à ce jour le moteur principal de l’économie mondiale et s’accompagné également par une explosion dans le volume des données ainsi que dans leur techniques de stockage et de traitement de données ainsi que d’une grande prolifération technologique. Cette evolution rapide des besoins du traitement des données de plus en plus varie en continu et en structure fait naître un nouveau domain nomme Data Science, décrit pour la premiere fois en 1996 par Hayashi, C. et al d’ans l’ouvrage [Data Science, Classification, and Related Methods](https://www.springer.com/us/book/9784431702085). Ce nouveau domaine à un fort impact dans quasiment toutes les branches de l’industrie car l’extraction de l’information à partir des données disponibles est une activité à forte valeur ajouté que tout “Data scientist” cherche à capitaliser. Cependant capitaliser sur les donnes disponibles impliqué un bagage de connaissances et  competences techniques telle que:
 
 - maitrise des languages et technologies du web
 - travail avec une vaste panoplie de formats et structures de données, 
 - realiser des requêtes complexes dans plusieurs languages d’interrogation de basses de données structurées (SQL) et non structurées (Neo4j, etc). 
 - statistique 
 - algorithmique 
 - programmation en plusieurs languages afin de developer d’applications web, visualisations interactives
 - aussi que des modelés d’apprentissage automatique et previsions
 - au moins 5 ans d’expérience. 


A ce point il devient evident que le profil décrit par le terme de “Data Scientist” décrie plutôt une créature mythique qui vie devant un terminal d’ordinateur, capable de faire tout ce qui peut être fait avec un ordinateur connecté ou pas à l’internet. 
En réalité les “Data Scientists” ont des profils très différents, une combinaison unique pour chacun des niveaux de specialisation dans plusieurs technologies resumés par Drew Conway dans [la diagramme :](http://drewconway.com/zia/2013/3/26/the-data-science-venn-diagram)

![]("data_sci_VD.png")

Le profil d’un Data Scientist est ainsi en continue evolution avec l’evolution de la technologies et des pratiques, dans lequel l’interoperabilité à un role fondamental car elle rend possible le fonctionnement d’une application ou technologie à travers les multiples plateformes disponible par l’internet et ses protocoles.

## 4. Conclusions et Perpectives personelles

La science des donnés (Data Science) est un domain d’activité emergent et évolutif à l’interface entre la mathématique et l’informatique. 
Dans ce domain l’interopérabilité est le concept clé qui permets aux applications de fonctionner de la même manière independent de la plate-forme utilisée et rend possible la communication des données entre les divers technologies du web. 

L’ intéroperabilité est rendu possible par de standards dans les langages et dans les protocols utilisées et elle est responsable d’une grand partie de la valorisation du travail d’un data scientist. Lors de cette dissertation j’ai présenté de manière très succincte le context historique de l’évolution de l’informatique, l’apparition de l’internet et l’emergence du domaine de la data science. Toutefois à présent cette évolution continue de la puissance de calcul et des systèmes intelligents est rentrée dans une nouvelle phase: le dépassement de l’humain et l’émergence de l’intelligence artificielle. 
Dans cette perspective le Data Scientist peut-être vu aujourd’hui comme le dernier ancêtre commun entre l’humain et “les machines” intelligentes, une étape dans l’evolution de l’intelligence vers ce que le physicien Max Tegmark apple la vie 3.0 - des systèmes capable à designer leur propre “software” ainsi leur propre “hardware” (https://www.singularityweblog.com/max-tegmark/). 

Cette évolution pourrait faire le sujet d’une prochaine dissertation sur la théorie des systèmes intelligents prévue pour le Journal Data Science MIASHS. Comme stratégie professionnelle à long terme j’aimerais m’améliorer au tant que je peut dans l’algorithmique et apprentissage automatique ainsi que dans le développement d’applications intelligentes et je reste ouvert à tous les opportunités qui m’offre cette possibilité. 
