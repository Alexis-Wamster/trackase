/*///////////////////////////////////////////////////////////////Passage de commande interactif///////////////////////////////////////////////////////////////*/

/*toutes ces fonction cache et font apparaitre des éléments en fonction des choix que fait l'utilisateur sur son achat*/
function livraison(){
	var reponseCache = document.getElementById("clickAndCollectElement");
	var reponseDecouverte = document.getElementById("livraisonElement");
	changeVisibilite("block", reponseDecouverte);
	changeVisibilite("none", reponseCache);
}

function clickAndCollect(){
	var reponseDecouverte = document.getElementById("clickAndCollectElement");
	var reponseCache = document.getElementById("livraisonElement");
	changeVisibilite("block", reponseDecouverte);
	changeVisibilite("none", reponseCache);
}

function adresse(){
	var reponseDecouverte = document.getElementById("adresseElement");
	var reponseCache = document.getElementById("pointRelaisElement");
	changeVisibilite("block", reponseDecouverte);
	changeVisibilite("none", reponseCache);
}

function pointRelais(){
	var reponseDecouverte = document.getElementById("pointRelaisElement");
	var reponseCache = document.getElementById("adresseElement");
	changeVisibilite("block", reponseDecouverte);
	changeVisibilite("none", reponseCache);
}

function acheter(){
	var reponseDecouverte = document.getElementById("AcheterElement");
	var reponseCache = document.getElementById("louerElement");
	changeVisibilite("block", reponseDecouverte);
	changeVisibilite("none", reponseCache);
}

function louer(){
	var reponseDecouverte = document.getElementById("louerElement");
	var reponseCache = document.getElementById("AcheterElement");
	changeVisibilite("block", reponseDecouverte);
	changeVisibilite("none", reponseCache);
}

/*change l'état css de tout les élément situé dans un div (caché ou découvert)*/
function changeVisibilite(newEtat,parent){
	for (let i = 0 ; parent.children[i] !== undefined ; i++){
		parent.children[i].style.display = newEtat;
	}
}

/*/////////////////////////////////////////////////////////////// Commentaire///////////////////////////////////////////////////////////////////////*/

/*prend les images d'étoiles, et modifie leur apparence (grise ou jaune) en fonction de la note qui correspond*/
function note(allEtoile, noteRecu) {
    allEtoile.forEach(function(container, numEtoile) {
    	var etoile = container.children[0];
        if (numEtoile <= noteRecu) {
            etoile.src = ETOILE_JAUNE;
        } else {
            etoile.src = ETOILE_GRISE;
        }
    });
}

/*récupère les données situé dans .votreCommentaire de la page html (commentaire et note) puis ajoute un div au site qui contient un commentaire (constitué des données récupérés)*/
function posterCommentaire(){
	var vous = document.querySelector(".commentaire .vous");

	var contenu = document.querySelector(".votreCommentaire textarea").value;
	var paragraphe = createTexte("p","vous",contenu);
	paragraphe.innerHTML = paragraphe.innerHTML.replace(/\n/g, "<br>");
	var paragrapheContainer = createContainer("div", "texte", [paragraphe]);

	var date = dateDuJour();
	var dateParagraphe = createTexte("p",null,date);
	var note = document.querySelector(".votreCommentaire .note");
	var noteCopie = note.cloneNode(true);
	noteCopie.appendChild(dateParagraphe);

	while (vous.children[0] !== undefined){
		vous.removeChild(vous.children[0]);
	}
	vous.appendChild(noteCopie);
	vous.appendChild(paragrapheContainer);
}

/*renvoie la date du jour au format dd/mm/yyyy*/
function dateDuJour() {
  var aujourdhui = new Date();
  var jour = String(aujourdhui.getDate()).padStart(2, '0');
  var mois = String(aujourdhui.getMonth() + 1).padStart(2, '0'); //January is 0!
  var année = aujourdhui.getFullYear();
  return jour + '/' + mois + '/' + année;
}

/*///////////////////////////////////////////////////////////////Fabrication de balises///////////////////////////////////////////////////////////////////////*/

/*ces fonction renvoie des élément html. elle permettent de raccourcir le code en donnant plusieurs caractéristiques à un élément en 1 ligne plutôt qu'en 5*/

function createContainer(type, classe, contenu){
	var container = document.createElement(type);
	container.className = classe;
	contenu.forEach(function(element){
		container.appendChild(element);
	});
	return container;
}

function createTexte(type, classe, contenu){
	var texte = document.createElement(type);
	var contenuNode = document.createTextNode(contenu);
	texte.appendChild(contenuNode);
	texte.className = classe;
	return texte;
}

function createImage(classe, contenu){
	var image = document.createElement("img");
	image.src = contenu;
	image.className = classe;
	return image;
}

function createInput(type, nom, identifiant, isChecked, placeholder){
	var newInput = document.createElement("input");
	newInput.type = type;
	newInput.id = identifiant;
	newInput.name = nom;
	newInput.checked = isChecked;
	console.log(nom, newInput.checked);
	newInput.placeholder = placeholder;
	return newInput;
}

function createLabel(nomInput, contenu){
	var newLabel = document.createElement("label");
	var contenuNode = document.createTextNode(contenu);
	newLabel.appendChild(contenuNode);
	newLabel.htmlFor = nomInput;
	return newLabel;
}

function createSelect(listeValeur){
	var newSelect = document.createElement("select");
	listeValeur.forEach(function(valeur){
		var newOption = document.createElement("option");
		newOption.value = valeur;
		var contenuNode = document.createTextNode(valeur);
		newOption.appendChild(contenuNode);
		newSelect.appendChild(newOption);
	});
	return newSelect;
}

function createNote(note, container){
	for(let i=1; i<=5; i++){
		if (i<=note){
			var etoile = createImage(null,ETOILE_JAUNE);
		}
		else{
			var etoile = createImage(null,ETOILE_GRISE);
		}
		var etoileContainer = createContainer("div", null, [etoile]);
		container.appendChild(etoileContainer);
	}
	return container;
}

/*///////////////////////////////////////////////////////////////Fabrication de la page produit///////////////////////////////////////////////////////////////*/

/*retourne un élément div contenant le commentaire*/
function createCommentaire(contenu,note,date,auteur){
	note = Math.round(note);
	var avis = createContainer("div",auteur,[]);
	var texte =  createTexte("p", auteur, contenu);
	var texteContainer = createContainer("div", "texte", [texte]);
	var noteContainer = createContainer("div","note",[]);
	noteContainer = createNote(note, noteContainer);
	var date = createTexte("p",null,date);
	noteContainer.appendChild(date);
	avis.appendChild(noteContainer);
	avis.appendChild(texteContainer);
	return avis;
}

/*retourne un élément div contenant du texte et une illustration (dans la partie Caractéristiques détaillé de la page produit)*/
function createLigne(texte,image){
	var paragraphe = createTexte("p",null,texte);
	var paragrapheContainer = createContainer("div","paragraphe",[paragraphe]);
	var illustration = createImage(null,image);
	var illustrationContainer = createContainer("div","image",[illustration]);
	var ligne = createContainer("div","ligne",[paragrapheContainer,illustrationContainer]);
	return ligne;
}

/*Modifie la première partie de la page produit*/
function modifieCaracteristiques(image, nom, description, note, prix){
	var baliseImage = document.querySelector(".infoProduit .produit img");
	baliseImage.src = image;
	var baliseNom = document.querySelector(".infoProduit .caracteristiques h3 a");
	baliseNom.innerHTML = nom;
	var baliseDescription = document.querySelector(".infoProduit .caracteristiques p");
	baliseDescription.innerHTML = description;
	var baliseNote = document.querySelector(".infoProduit .caracteristiques .note");
	baliseNote = createNote(note,baliseNote);
	var prixParent = document.querySelector(".infoProduit .caracteristiques ul");
	prix.forEach(function(valeur,indice){
		prixParent.children[indice].innerHTML = prixParent.children[indice].innerHTML.replace("?", valeur);
	});

}

/*Appelle les 3 fonctions ci-dessus afin de créer une page produit correspondant au produit donné en argument*/
function createPageProduit(produit){
	modifieCaracteristiques(produit.image, produit.nom, produit.description, produit.note, produit.prix);
	var detailsContainer = document.querySelector(".détails");
	produit.details.forEach(function(detail){
		detailsContainer.appendChild(detail);
	});
	var commentaireContainer = document.querySelector(".commentaire");
	produit.commentaire.forEach(function(element){
		commentaireContainer.appendChild(element);
	});
	var vous = createContainer("div","vous",[]);
	commentaireContainer.appendChild(vous);
}

/*////////////////////////////////////////////////////////////////Fabrication de la boutique//////////////////////////////////////////////////////////////////////////////*/

/*créer et affiche dans la page boutique des éléments div correspondant au produit .*/
function createBoutique(){
	console.log("createBoutique");
	var boutique = document.querySelector(".boutique");
	var exemple = document.querySelector(".boutique .exemple");
		dataProduits.forEach(function(produit){
			var newProduit = exemple.cloneNode(true);
			newProduit.className = "produit";
			var image = newProduit.querySelector("img");
			image.src = produit.image;
			var nom = newProduit.querySelector(".nom");
			nom.innerHTML = produit.nom;
			var description = newProduit.querySelector(".description");
			description.innerHTML = produit.description;
			var achat = newProduit.querySelector(".achat");
			achat.innerHTML = achat.innerHTML.replace("?",produit.prix[0]);
			var location = newProduit.querySelector(".location");
			location.innerHTML = location.innerHTML.replace("?",produit.prix[1]);
			boutique.appendChild(newProduit);
		});
		boutique.removeChild(exemple);
}

/*////////////////////////////////////////////////////////////////////Initialisation///////////////////////////////////////////////////////////////////////////*/

const ETOILE_GRISE = "./images/étoile_grise.png";
const ETOILE_JAUNE = "./images/étoile_Jaune.png";

/*contient toutes les caractéristiques d'un produit*/
class produit{
	constructor(image,nom,description,note,prixAchat,prixVente,prixFrais,listeDetails,listeCommentaires){
		this.image = image;
		this.nom = nom;
		this.description = description;
		this.note = note;
		this.prix = [prixAchat,prixVente,prixFrais];
		this.details = listeDetails;
		this.commentaire = listeCommentaires;
	}
}

dataProduits = [
new produit("./images/valise1.jpg","Valise de fou","coloré - attirante - énorme",5,"19.99","0.50","3.00",
	[createLigne("Notre valise géolocalisable est le compagnon de voyage idéal pour les voyageurs soucieux de la sécurité et de la praticité. Avec un rangement spacieux pour tous vos effets personnels, cette valise est également légère, ce qui la rend facile à manipuler lors de vos déplacements. Elle est fabriquée avec des matériaux de haute qualité pour une durabilité à toute épreuve, vous permettant de voyager en toute tranquillité.",
		"./images/valise-spacieuse.png"),
	createLigne("Elle est compatible avec les compagnies aériennes les plus populaires, ce qui vous assure un transport en toute sécurité. La géolocalisation intégrée vous permet de suivre votre valise à tout moment, pour une tranquillité d'esprit supplémentaire. Vous pouvez ainsi savoir où se trouve votre valise en temps réel, vous offrant la possibilité de retrouver rapidement vos affaires en cas de perte ou de vol.",
		"./images/valise-géolocalisable.png"),
	createLigne("La valise est équipée de fermetures à glissière de qualité supérieure pour une sécurité optimale. Elle possède également des roulettes pivotantes à 360 degrés pour une manoeuvrabilité facile dans les aéroports et les gares. Les poignées en mousse confortables permettent une prise en main facile, même lorsque la valise est pleine.",
		"./images/roulette-valise.jpg")],
	[createCommentaire("à premiére vu la valise me semblait fragile, elle m'a accompagné cet été, elle a subit pas mal de coup, au vu des traces et autres griffes elle a bien morflé dans les aéroport mais elle tient le coup, elle est légére, maniable, et pour le moment j'en suis satisfait",
		5,"31/12/2022","inconnu"),
	createCommentaire("C'est la deuxième que j'achète de ce modèle. Elle est légère malgré sa grande taille et pourtant très solide. Déjà 6 voyages internationaux avec la première et aucun signe de fatigue. Les roulettes, les poignées, les fermetures... tout fonctionne comme au premier jour. Je recommande à 100%",
		5,"15/12/2022","inconnu"),
	createCommentaire("Offerte en cadeau à notre fille étudiante pour ces allers-retours en métro/bus/train. Valise au design très sympa. A première vue impression de robustesse, et 4 roues très pratique. Notre fille est ravie, mais trop tôt pour donner un avis définitif. Rendez-vous dans quelques mois pour le retour d'expérience.",
		5,"07/11/2022","inconnu"),
	createCommentaire("Suffisamment d'espace pour un weekend, parfait pour le train, elle est facilement maniable que ce soit devoir sur ses 4 roues ou bien en la tirant sur 2. La poche zippée est pratique, les tendeurs élastiques très bien aussi. J'ai trouvé un peu étrange que le fond à l'intérieur ne soit pas plat, cela oblige à agencer d'une façon particulière les affaires pour que tout rentre bien, mais sinon c'est un bon produit :)"
		,5,"09/10/1998","inconnu")]),
	
new produit("./images/valise2.jpg","Valise moderne", "compact - design - e-tech",4,"89.99","2.00","6.00",
	[createLigne("Notre valise géolocalisable est le compagnon de voyage idéal pour les voyageurs soucieux de la sécurité et de la praticité. Avec un rangement spacieux pour tous vos effets personnels, cette valise est également légère, ce qui la rend facile à manipuler lors de vos déplacements. Elle est fabriquée avec des matériaux de haute qualité pour une durabilité à toute épreuve, vous permettant de voyager en toute tranquillité.",
		"./images/valise-spacieuse.png"),
	createLigne("Elle est compatible avec les compagnies aériennes les plus populaires, ce qui vous assure un transport en toute sécurité. La géolocalisation intégrée vous permet de suivre votre valise à tout moment, pour une tranquillité d'esprit supplémentaire. Vous pouvez ainsi savoir où se trouve votre valise en temps réel, vous offrant la possibilité de retrouver rapidement vos affaires en cas de perte ou de vol.",
		"./images/valise-géolocalisable.png"),
	createLigne("La valise est équipée de fermetures à glissière de qualité supérieure pour une sécurité optimale. Elle possède également des roulettes pivotantes à 360 degrés pour une manoeuvrabilité facile dans les aéroports et les gares. Les poignées en mousse confortables permettent une prise en main facile, même lorsque la valise est pleine.",
		"./images/roulette-valise.jpg")],
	[createCommentaire("Top qualité sans se ruiner !",
		4,"28/12/2022","inconnu"),
	createCommentaire("Satisfait pour l'usage des voyages courts. Le mât télescopique accroche lors de la descente de celle-ci. Pas pratique lorsqu il faut ranger rapidement cette poignée. ( monter dans métro ou train).",
		3,"27/12/2022","inconnu"),
	createCommentaire("Grande capacité et très solide impeccable",
		5,"26/12/2022","inconnu")]),

new produit("./images/valise3.jpg","Valise passepartout", "petite - adaptable - légère",4.3,"39.99","0.95","4.00",
	[createLigne("Notre valise géolocalisable est le compagnon de voyage idéal pour les voyageurs soucieux de la sécurité et de la praticité. Avec un rangement spacieux pour tous vos effets personnels, cette valise est également légère, ce qui la rend facile à manipuler lors de vos déplacements. Elle est fabriquée avec des matériaux de haute qualité pour une durabilité à toute épreuve, vous permettant de voyager en toute tranquillité.",
		"./images/valise-spacieuse.png"),
	createLigne("Elle est compatible avec les compagnies aériennes les plus populaires, ce qui vous assure un transport en toute sécurité. La géolocalisation intégrée vous permet de suivre votre valise à tout moment, pour une tranquillité d'esprit supplémentaire. Vous pouvez ainsi savoir où se trouve votre valise en temps réel, vous offrant la possibilité de retrouver rapidement vos affaires en cas de perte ou de vol.",
		"./images/valise-géolocalisable.png"),
	createLigne("La valise est équipée de fermetures à glissière de qualité supérieure pour une sécurité optimale. Elle possède également des roulettes pivotantes à 360 degrés pour une manoeuvrabilité facile dans les aéroports et les gares. Les poignées en mousse confortables permettent une prise en main facile, même lorsque la valise est pleine.",
		"./images/roulette-valise.jpg")],
	[createCommentaire("Chaque modèle qui sort, je l'achète. JE SUIS FAN DE TRACKCASE !!! Et je doit vous avouez que ce modèle sort du lot. Achetez le vous allez voir...",
		5,"19/01/2023","inconnu"),
	createCommentaire("J'adore mettre des commentaires qui ne servent à rien !!! Surtout quand c'est pour mettre des mauvaise note ^_^",
		0,"22/02/2022","inconnu")])];


var urlActuel = window.location.href;

/*affiche et gère toutes les interaction de la page boutique*/
if (urlActuel.includes("boutique")){

	createBoutique();

	var allProduitHtml = document.querySelectorAll(".produit");

	allProduitHtml.forEach((produitHtml,numProduit) => {
		produitHtml.addEventListener("click", function(){
			var pageProduitUrl = "Page_produit.html?numProduit=" + numProduit;
			window.location.assign(pageProduitUrl);
		});
	});
}


/*affiche et gère toutes les interaction de la page produit*/
if (urlActuel.includes("Page_produit")){

		var parametreUrl = new URLSearchParams(window.location.search);
		var numProduit = parametreUrl.get("numProduit");
		createPageProduit(dataProduits[numProduit]);

	var cocheLivraison = document.getElementById("livraison");
	var cocheClickAndCollect = document.getElementById("clickAndCollect");
	var cocheAdresse = document.getElementById("adresse");
	var cochePointRelais = document.getElementById("pointRelais");
	var cocheAcheter = document.getElementById("Acheter");
	var cocheLouer = document.getElementById("Louer");
	var allEtoile = document.querySelectorAll(".votreCommentaire .note .etoile");
	var containerEtoile = document.querySelector(".votreCommentaire .note");
	var submitCommentaire = document.querySelector(".submitCommentaire");

	livraison();
	adresse();
	acheter();

	submitCommentaire.addEventListener("click",function(){
		posterCommentaire();
	});
	containerEtoile.addEventListener("click", function() {
		var etoileClique = false;
		allEtoile.forEach((etoile, numEtoile) => {
			if(event.target === etoile) {
				note(allEtoile, numEtoile);
				etoileClique = true;
			}
		});
		if (etoileClique === false){
			note(allEtoile, -1);
		}
	});

	cocheLivraison.addEventListener("change",function(){
		if (this.checked){
			livraison();
		}
	});
	cocheClickAndCollect.addEventListener("change",function(){
		if (this.checked){
			clickAndCollect();
		}
	});
	cocheAdresse.addEventListener("change",function(){
		console.log("adresse change");
		if (this.checked){
			adresse();
		}
	});
	cochePointRelais.addEventListener("change",function(){
		console.log("point relais change");
		if (this.checked){
			pointRelais();
		}
	});
	cocheLouer.addEventListener("change",function(){
		if (this.checked){
			louer();
		}
	});
	cocheAcheter.addEventListener("change",function(){
		if (this.checked){
			acheter();
		}
	});
}