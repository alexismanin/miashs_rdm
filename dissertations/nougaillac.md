

**DISSERTATION**

**En quoi l&#39;interopérabilité est-elle un élément essentiel pour l&#39;Open Data et dans le domaine de la data science ?**

Nous allons commencer par définir ce qu&#39;est l&#39;interopérabilité au sens général puis plus spécifiquement au domaine de l&#39;informatique. Nous expliquerons pourquoi le web est un bon exemple de l&#39;interopérabilité et ce que cela lui apporte.

Ensuite nous aborderons la question de l&#39;open data et nous dirons pourquoi l&#39;interopérabilité est essentielle dans le développement de celui-ci et en quoi cela améliore les performances de la data science.

On parle d&#39;interopérabilité lorsqu&#39;on a au moins deux systèmes capables de communiquer et de s&#39;échanger des données sans effort de la part de l&#39;un ou de l&#39;autre pour se comprendre. L&#39;interopérabilité se retrouve dans d&#39;innombrables domaines tels que les réseaux routiers, ferroviaires, aériens, la téléphonie, les forces armées,….

Par exemple, l&#39;interopérabilité dans la téléphonie permet à deux personnes de se parler au téléphone sans pour autant qu&#39;elles aient le même opérateur ni la même marque de téléphone. Cela sous-entend que des réseaux téléphoniques hétérogènes (gérés par les opérateurs différents) et des matériels divers respectent les mêmes normes de communication (données, signaux, câble, courant, ...). En informatique, l&#39;interopérabilité repose donc sur la création et le respect de standards décrivant des formats et des règles d&#39;échange des données à travers ces formats. À l&#39;opposé, un frein à l&#39;interopérabilité est l&#39;utilisation d&#39;un format de fichier propriétaire par un logiciel qui empêche son exploitation par un utilisateur tiers qui ne connaitrait pas ce format.

Le web (raccourci de World Wide Web) a été créé à la fin des années 80 pour permettre d&#39;échanger des informations sous forme de pages directement consultables via un outil de navigation (client léger) depuis son ordinateur.

Le web est une application d&#39;internet qui lui est un réseau de réseaux, qui permet donc de relier un ensemble de machines à travers le monde. L&#39;idée est de pouvoir passer d&#39;une page (principe de l&#39;hyper texte) à une autre sans avoir à les stocker sur sa propre machine ni même de savoir où elles sont hébergées. Chaque page est identifiée par une adresse unique (URI) accessible depuis n&#39;importe où.

**L&#39;objectif est de n&#39;avoir qu&#39;un seul web partout et pour tous.**

Les communications entre le navigateur de l&#39;utilisateur et le serveur qui fournit l&#39;information sont gérées par le protocole HTTP.

Il a donc fallu créer un format de page lisible par l&#39;ensemble des navigateurs (HTML), un protocole de communication (HTTP) et un système d&#39;identification des pages ou ressources (URI) pour permettre à tous les utilisateurs quel que soit leur ordinateur, leur système d&#39;exploitation et leur navigateur de pourvoir consulter les mêmes informations disponibles à travers le web.

Cet ensemble de règles est définie par le W3C (World Wide Web Consortium) qui est une association ou organisme de standardisation chargé de promouvoir la compatibilité des technologies du web telles que HTML, XML, RDF, SPARQL,…

Les développeurs des navigateurs doivent suivre ces recommandations et faire évoluer en permanence leur application afin qu&#39;elles restent compatibles avec ces technologies.

A l&#39;origine on parlait de web statique car il permettait seulement de diffuser des pages d&#39;informations statiques sur lesquelles les utilisateurs ne pouvaient pas agir.  Est apparu ensuite le web dynamique qui permet une interaction entre l&#39;utilisateur et le serveur faisant évoluer les données du web (apparition de blog, forum, formulaire de saisie,…). On parle ensuite de web de données où les données sont réutilisables comme dans une base de données et de web sémantique dans lequel on y rajoute sa description et les différentes relations existantes.

L&#39;Open Data est une pratique qui consiste à publier des données numériques publiques afin de les rendre accessibles aux usagers à travers le web. Il s&#39;appuie sur les mécanismes du web de données qui considère les données comme si elles étaient dans une base de données avec la dimension de réutilisation puisque le principal objectif de l&#39;open data est d&#39;être libre de pouvoir la réutiliser.

Malgré une législation mise en place en Europe et dans certains pays qui imposent aux collectivités et organismes publics de publier certaines données, dans la pratique on se rend vite compte que ce n&#39;est qu&#39;un leurre. En effet, pour qu&#39;une donnée soit ouverte, il faut qu&#39;elle soit accessible, sans authentification, dans un format exploitable, documentée et surtout actualisée. Très peu le sont en réalité. Après de nombreuses heures à rechercher des données dans divers domaines on trouve facilement des données exportables au format csv (par exemple) mais très peu d&#39;API qui permettent d&#39;y accéder directement sans authentification.

Les API sont essentielles car elles permettent d&#39;accéder automatiquement aux données externes mises à disposition par un fournisseur. Une API est un programme qui sert d&#39;interface entre l&#39;application qui mélange les données (Mashup) et les données extérieures fournies. Pour être performante une API doit être utilisable par le plus grand nombre.

L&#39;interopérabilité est l&#39;élément clé dans ce cadre d&#39;utilisation car les données fournies doivent être dans un format normalisé (JSON, XML), clairement décrites pour être compréhensibles (interopérabilité sémantique : XML RDF), et documentées.

La Data science qui consiste à extraire des données afin de les analyser est un mélange entre la statistique inférentielle, le développement d&#39;algorithme et la technologie, dont l&#39;objectif est la résolution de problèmes analytiques complexes. Elle prend un essor depuis plusieurs années grâce au développement du Big Data qui permet le traitement d&#39;un grand volume de données.

Or plus une donnée est complète, riche et pertinente plus elle sera probante pour le data scientist.

Le métier de data scientist consiste avant tout à s&#39;approprier le sujet et la problématique, c&#39;est-à-dire le domaine métier. Ensuite il doit explorer les données qui sont disponibles, par exemple dans les datawarehouse de l&#39;entreprise, via les services web internes ou externes, les chercher dans l&#39;open data ou éventuellement les acheter. Il est possible aussi de croiser les données de différentes sources dispersées.

Les données recueillies permettront ainsi de créer des modèles d&#39;analyse et des algorithmes pour ainsi dégager des tendances, élaborer des profils, faire des prédictions… Cela apporte une réelle valeur ajoutée à l&#39;entreprise dans la prise de décision dans de nombreux domaines.



En conclusion, je pourrai dire qu&#39;un gros travail est à faire auprès des organisations publiques et des collectivités afin qu&#39;elles respectent le cadre légal de l&#39;open data. En effet, seules 8% des collectivités publient des données numériques. Les multiples plaintes auprès de la CADA (commission d&#39;accès aux documents administratifs) témoignent du retard dans la mise en place de l&#39;open data dans l&#39;administration française.

Il ne suffit pas de mettre à disposition des informations sous forme numérique (exemple photographie d&#39;un document manuscrit enregistré au format pdf) pour croire que l&#39;on fait de l&#39;open data !

Une des perspectives de ma future carrière de data scientist au sein de l&#39;Education Nationale sera d&#39;acculturer les décideurs et surtout les détenteurs de la donnée numérique aux enjeux de l&#39;open data.

