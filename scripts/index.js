import * as loader from "./loader.js";
  
  //récupération des données filtré de photographe
  let photographers =  await fetch("./data/photographers.json")
    .then((r) => r.json())
    .then((data) => {
      return data.photographers;
    })
    .catch((error) => console.error(error));

  const photographersSection = document.querySelector(".photographer_section");

  //boucle pour afficher chaque photographe
  photographers.forEach((photographer) => {
    photographersSection.appendChild(getUserCardDOM(photographer));
  });
  
    //fonction qui structure la page et affiche chaque photographe
  function getUserCardDOM(photographer) {

  const { id, name, portrait, city, country, tagline, price } = photographer;
  const picture = `assets/photographers/${portrait}`;
  const linktopage = "./Page/photographer.html?id=" + id;

    const article = document.createElement("article");
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);
    img.setAttribute("class", "p"+id);
    const blocimg = document.createElement("div");
    blocimg.setAttribute("class", "blocimg");
    const link = document.createElement("a");
    link.setAttribute("href", linktopage);
    link.setAttribute("aria-label", "acceder au profil du photographe");
    link.setAttribute("role", "lien");
    const h2 = document.createElement("h2");
    const h3 = document.createElement("h3");
    const taglineP = document.createElement("p");
    taglineP.setAttribute("class", "taglineP");
    const priceP = document.createElement("p");
    priceP.setAttribute("class", "priceP");

    h2.textContent = name;
    h3.textContent = city + ", " + country;
    taglineP.textContent = tagline;
    priceP.textContent = price + "€/jour";
    article.appendChild(link);
    link.appendChild(blocimg);
    blocimg.appendChild(img);
    link.appendChild(h2);
    article.appendChild(h3);
    article.appendChild(taglineP);
    article.appendChild(priceP);

    return article;
  }