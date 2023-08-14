import { fetchData } from "./fetch.js";
import { maj } from "./light_box.js"
import { Sort } from "./sort.js"
import { AllLike, add_heart } from "./like.js";
//
//
//Récupère id inséré dans l'url
const url = window.location.href;
const idUser = new URL(url).searchParams.get("id");
//
//
//
async function photographerProfil() {
  let fulldata = await fetchData();
  //Récupérer est utiliser les données photographe
  const photograph_header = document.querySelector(".photograph-header");
  const name_header = document.querySelector(".name_header");
  const { id, name, portrait, city, country, tagline, price } =
    fulldata.photographers;

  let picture;
  if (portrait.startsWith("http")) {
    picture = `${portrait}`;
  } else {
    picture = `../assets/photographers/${portrait}`;
  }
  const linktopage = `./photographer.html?id=${id}`;
  const profil = document.querySelector(".profil");
  const priceP = document.querySelector(".price");

  async function getUserCardDOM() {
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", "photo représentant " + name);
    img.setAttribute("class", "p" + id);
    const blocimg = document.createElement("div");
    blocimg.setAttribute("class", "blocimg");
    const link = document.createElement("a");
    link.setAttribute("href", linktopage);
    const h2 = document.createElement("h1");
    const h3 = document.createElement("h2");
    const taglineP = document.createElement("p");
    taglineP.setAttribute("class", "taglineP");

    name_header.textContent = name;
    h2.textContent = name;
    h3.textContent = city + ", " + country;
    taglineP.textContent = tagline;
    priceP.textContent = price + "€ / jour";
    photograph_header.appendChild(blocimg);
    blocimg.appendChild(img);
    profil.appendChild(h2);
    profil.appendChild(h3);
    profil.appendChild(taglineP);
    return;
  }

  getUserCardDOM();
  

  //Pour trier le tableau par popularité d'office
  let sortedData = fulldata.media.sort(function (a, b) {
    return b["likes"] - a["likes"];
  });

  //Récupérer et afficher les photos/videos du photographe
  const pictureSection = document.querySelector(".picture_section");

  //Regex pour verifier le type de media
  const imageRegex = /\.(jpeg|jpg|gif|png)$/;

  class Factory_Article {
    constructor(item) {
      this.item = item;
    }

    mediaFactory() {
      const { id, title, image, video, likes, date } = this.item;

      const article = document.createElement("article");
      const link = document.createElement("div");
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const figcaption = document.createElement("div");
      const text = document.createElement("p");
      const like = document.createElement("div");
      const numbheart = document.createElement("p");
      const link_like = document.createElement("div");
      const heart = document.createElement("i");

      
      link.setAttribute("title", title);
      link.setAttribute("aria-label", "ouvre le slider");
      link.setAttribute("class", "article_link");
      img.setAttribute("src", picture);
      img.setAttribute("alt", title);
      figure.setAttribute("class", date);
      figcaption.setAttribute("class", "figcaption");
      text.setAttribute("class", "title");
      text.textContent = title;
      like.setAttribute("class", "like");
      numbheart.setAttribute("class", "heart");
      numbheart.textContent = likes;
      link_like.setAttribute("aria-label", "Ajoute un like");
      link_like.setAttribute("class", "add_like");
      link_like.setAttribute("title", id);
      heart.setAttribute("class", "fa fa-heart");
      

      article.appendChild(link);
      link.appendChild(figure);
      article.appendChild(figcaption);
      figcaption.appendChild(text);
      figcaption.appendChild(like);
      like.appendChild(numbheart);
      like.appendChild(link_like);
      link_like.appendChild(heart);

      if (imageRegex.test(image)) {
        let picture;
        if (portrait.startsWith("http")) {
          picture = `${image}`;
        } else {
          picture = `../assets/images/${idUser}/${image}`;
        }
        img.setAttribute("src", picture);
        img.setAttribute("alt", title);
        figure.appendChild(img);
      } else {
        let moovie;
        if (portrait.startsWith("http")) {
          moovie = `${portrait}`;
        } else {
          moovie = `../assets/images/${idUser}/${video}`;
        }
        const videos = document.createElement("video");
        videos.setAttribute("src", moovie);
        videos.setAttribute("alt", title);
        figure.setAttribute("class", date);
        figure.appendChild(videos);
      }

      return article;
    }
  }
  sortedData.forEach((item) => {
    const Template = new Factory_Article(item);
    pictureSection.appendChild(Template.mediaFactory());
  });
  maj();
  Sort();
  AllLike();
  add_heart();
}
photographerProfil();
