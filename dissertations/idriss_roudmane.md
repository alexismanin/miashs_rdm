

# `Intéroperabilité`
En tant qu’étudiant en data science je suis souvent sollicité pour aller chercher des données relatives à différents domaines *( des données de santé, économique, géomatique, …)*.  
Celles ci me serviront lors de mes traitements et analyses, mais une fois que ces dernières sont récupérées, après un long temps de recherche, il s'avère parfois, pour ne pas dire toujours, que la donnée est non documentée, ce qui engendre une grosse difficulté de compréhension des données. Parfois même le jeu de données est accessible mais dans un format non ouvert ou non compréhensible, par exemple les bases de données *oracle* ne sont lisibles que par les machines Oracle, la donnée est codée dans un format qui est propriétaire à oracle(même chose pour Mysql), tous ces difficultés sont liés au problème de **non intéroperabilité** des données.  
Alors **qu'est-ce que l'interopérabilité ?Pourquoi  le web est un bon exemple d'interopérabilité ? Comment peut-on garantir cette interopérabilité sur le web? et quel est l'impact de cette dernière sur les metiers de science de données ?**
## 1)Le web bon exemple de l'interopérabilité:
L'interopérabilité est la capacité que possède un produit ou système, à fonctionner avec d'autres systèmes ou produits [(wiki)](https://fr.wikipedia.org/wiki/Interop%C3%A9rabilit%C3%A9),  c’est le principe que la donnée soit découplée de la technologie, le fait d’avoir la capacité d’utiliser et d’exploiter les données peu importe la technique qui est en dessous.
Le web est une application internet qui a une architecture avec trois grands domaines :

 ![Alt text](web.png)

 - l'adressage **URI**: l'endroit où se trouve la ressource
 - Le protocole de communication (**HTTP**) : comment les échanges se font entre les machines dans le web
 - Langage interopérable **HTML** pour afficher les informations

À travers cette architecture on peut très bien voir que le web est un très bon exemple d'interopérabilité.
Un service web peut être exécuté sur différentes plates-formes et implémenter sur différents langages.
Prenons par exemple un service web créé sur une plate-forme **.Net** peut être appelé par toute application client implémentée dans un langage de programmation tel que **java**.  
Quand on parle de web ça reste quelque chose d'abstrait, alors imaginons le web comme une grande bibliothèque et les livres sont nos ressources.  
Quand on est à la bibliothèque et on veut chercher un livre on ne cherche pas au milieu de tous les rangs, mais on recherche dans la fiche bibliographique, qu'on nomme **ontologie**.  
Le web est devenue quelque chose de gigantesque avec des milliards de données et de pages web et qui augmentent chaque jour. Le problème qui se pose est *comment enrichir le web en garantissant cette interopérabilité ?*  
Quand on met des données dans le web il faut aussi mettre la signification, car la donnée toute seule ne servira pas à grand-chose,  Un nombre **128190** ne veut rien dire sans structure mais avec une structure on peut le contextualiser comme étant le nombre de personnes ayant acheté une tablette de marque Z, ou bien le salaire d'une personne au pouvoir d'un pays.  
La structure dans le web est nommée l'ontologie, c'est cette structure qui donne un sens à la donnée. Et cette structure qui doit être interopérable sur le web.

## 2) L'apport de l'interopérabilité sur le web à un data scientist:

Le premier but de la création du web était d’échanger des documents entre les humains et les machines.En tant que data scientist j'utilise le web pour récolter des données ouvertes, ce sont des données dont l'accès et l'usage sont laissés libres aux usagers, elles peuvent être d'origine privée (**entreprise**) ou publique (**service public**).  
Le problème que je rencontre réguliairement la donnée même si elle est relative au même systèmes ou domaine n'est pas code sous le même format, malheureusement il y a une mauvaise communication entre les services informatiques des domaines.  
Chacun travaille pour lui seul et produit le type de fichier et le langage qui lui convient. Cette methode de travaille ne permet pas de penser aux utilisateurs qui viennent d'en dehors du service, alors qu'il serait possible de le faire en utilisant un langage ouvert à tout le monde, et en créant de la donnée dans des formats ouverts.  
Le fait que le web vise l’échange interopérable des documents et des données, aide le data scientist à effectuer ses tâches plus rapidement.  
En comprenant plus rapidement les données à l’aide de la documentation, le data scientist est plus l'aise car il a un large choix de langages et de nombreuses manières de récolter de données. Ces dernières peuvent être liées à plusieurs domaines au même temps, il a donc la possibilité de faire des analyses plus approfondies.
## Conclusion:
On sait tous qu'une interopérabilité dans tous les systèmes et programmes n'existe que dans un monde parfait, mais on pourrait un peu participer construire. Invitons tous nos réseaux pour que nous nous facilitons les tâches, si vous voulez que ça marche commencez par vous

### Bibliographie
- [Wikipédia](https://fr.wikipedia.org/wiki/Interop%C3%A9rabilit%C3%A9)
- [collecte des données et interopérabilité ](http://www.ac-mag.fr/paroles-d-experts/86-big-data-collecte-des-donnees-et-interoperabilite?fbclid=IwAR3vN2OPyspr71ve9_eZNxcW76WOxl_CL4E6ZVxB40L0PwFRXjAyJt8h-dc)
- [Ontologie](https://fr.wikipedia.org/wiki/Ontologie_)
