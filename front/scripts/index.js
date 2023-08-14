import { Dataphotographer } from "./fetch.js";
//
//
async function allPhotographer() {
  let photographers = await Dataphotographer();

  const photographersSection = document.querySelector(".photographer_section");

  class Factory_Profil {
    constructor(photographer) {
      this.photographer = photographer;
    }

    //fonction qui structure la page et affiche chaque photographe
    getUserCardDOM() {
      const { id, name, portrait, city, country, tagline, price } =
        this.photographer;
      let picture;
      if (portrait.startsWith("http")) {
        picture = `${portrait}`;
      } else {
        picture = `./assets/photographers/${portrait}`;
      }
      const linktopage = `./Page/photographer.html?id=${id}`;

      const article = document.createElement("article");
      const img = document.createElement("img");
      img.setAttribute("src", picture);
      img.setAttribute("alt", "photo représentant " + name);
      img.setAttribute("class", "p" + id);
      const blocimg = document.createElement("div");
      blocimg.setAttribute("class", "blocimg");
      const link = document.createElement("a");
      link.setAttribute("href", linktopage);
      link.setAttribute("aria-label", "acceder au profil du photographe");
      link.setAttribute("role", "link");
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
  }

  //boucle pour afficher chaque photographe
  photographers.forEach((photographer) => {
    const Template = new Factory_Profil(photographer);
    photographersSection.appendChild(Template.getUserCardDOM(photographer));
  });
}
allPhotographer();
