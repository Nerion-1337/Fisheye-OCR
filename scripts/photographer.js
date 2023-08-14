//Récupère id inséré dans l'url
const url = window.location.href;
const idUser = new URL(url).searchParams.get("id");

//récupère les data trié
async function fetchData(idUser) {
  try {
    const response = await fetch(`../data/photographers.json`);
    const data = await response.json();

    const photographers = data.photographers.filter((p) => p.id == idUser);
    const media = data.media.filter((p) => p.photographerId == idUser);

    return { photographers, media };
  } catch (error) {
    console.error(error);
  }
}

async function photographerProfil() {
  let fulldata = await fetchData(idUser);

  //Récupérer est utiliser les données photographe
  const photograph_header = document.querySelector(".photograph-header");
  const name_header = document.querySelector(".name_header");
  const { id, name, portrait, city, country, tagline, price } =
    fulldata.photographers[0];

  const picture = `../assets/photographers/${portrait}`;
  const linktopage = `./photographer.html?id=${id}`;
  const profil = document.querySelector(".profil");
  const priceP = document.querySelector(".price");
  const totalLike = document.querySelector(".totalLike");

  function AllLike() {

    const heartAll = document.querySelectorAll(".heart");
    const totalLikes = Array.from(heartAll)
      .map((element) => element.textContent)
      .reduce((acc, current) => {
        // Convertir le texte en nombre avec Number ou parseInt
        const number = Number(current);
        // Vérifier si le nombre est valide avec isNaN
        if (!isNaN(number)) {
          // Ajouter le nombre à l'accumulateur
          return acc + number;
        } else {
          // Sinon, retourner l'accumulateur sans changement
          return acc;
        }
      }, 0);

    totalLike.textContent = totalLikes;
    totalLike.appendChild(heart);
    
  }

  const heart = document.createElement("i");

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
    heart.setAttribute("class", "fa fa-heart");

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
      const { title, image, video, likes, date } = this.item;

      const article = document.createElement("article");
      const link = document.createElement("a");
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const figcaption = document.createElement("div");
      const text = document.createElement("p");
      const like = document.createElement("div");
      const numbheart = document.createElement("p");
      const link_like = document.createElement("a");
      const heart = document.createElement("i");

      link.setAttribute("title", title);
      link.setAttribute("href", "#");
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
      link_like.setAttribute("href", "#");
      link_like.setAttribute("aria-label", "Ajoute un like");
      link_like.setAttribute("class", "add_like");
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
        const picture = `../assets/images/${idUser}/${image}`;
        img.setAttribute("src", picture);
        img.setAttribute("alt", title);
        figure.appendChild(img);
      } else {
        const moovie = `../assets/images/${idUser}/${video}`;
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

  AllLike();
  //Récupère les articles créers
  const articles = document.querySelectorAll("article");

  //Permet de transiter le filtre selectionné en premier
  const spans = document.querySelectorAll(".selectFilter");
  const parent = spans[0].parentNode;
  let firstSpan = spans[0];

  //Permet de transiter le filtre selectionné en premier au click
  spans.forEach((span) => {
    span.addEventListener("click", () => {
      if (span !== firstSpan) {
        parent.removeChild(span);
        parent.insertBefore(span, firstSpan);
        firstSpan = span;
      }

      //Va permettre de réorganiser les articles en fonction du filtre selectionné plus haut
      let sortedArticles = Array.from(articles)
        .map((item) => {
          return { item };
        })
        .sort((a, b) => {
          if (span.innerHTML === "Popularite") {
            let aLikes = parseInt(a.item.querySelector(".like").textContent);
            let bLikes = parseInt(b.item.querySelector(".like").textContent);
            return bLikes - aLikes;
          } else if (span.innerHTML === "Date") {
            let aDate = a.item.querySelector("figure").className;
            let bDate = b.item.querySelector("figure").className;
            if (aDate < bDate) {
              return 1;
            } else if (aDate > bDate) {
              return -1;
            } else {
              return 0;
            }
          } else if (span.innerHTML === "Titre") {
            let aTitle = a.item.querySelector(".title").textContent;
            let bTitle = b.item.querySelector(".title").textContent;
            return aTitle.localeCompare(bTitle);
          }
        });

      articles.forEach((article) => {
        article.remove();
      });

      sortedArticles.forEach((article) => {
        document.querySelector(".picture_section").appendChild(article.item);
      });
      maj();
    });
  });

  //fenêtre picture
  const header = document.querySelector("header");
  const filter = document.querySelector(".filter");
  const aside = document.querySelector("aside");
  const boxVideo = document.querySelector(".boxVideo");
  const boxImg = document.querySelector(".boxImg");
  const titre = document.querySelector(".boxTitle");
  const left = document.querySelector(".left");
  const right = document.querySelector(".right");
  const close = document.querySelector(".close");

  //ferme la fênetre
  close.addEventListener("click", () => {
    aside.style.display = "none";
    header.style.display = "flex";
    photograph_header.style.display = "flex";
    filter.style.display = "flex";
    pictureSection.style.display = "flex";
    aside.style.transform = "scale(0)";
    boxVideo.style.display = "none";
    boxImg.style.display = "none";
    aside.setAttribute("aria-hidden", "true");
  });

  function maj() {
    let newArticle = document.querySelectorAll("article .article_link");
    //au click sur l'article l'affiche dans la fênetre
    newArticle.forEach((a, index) => {
      a.addEventListener("click", () => {
        let currentArticle = index;
        const article = a.parentElement;
        const fig = article.querySelector("figure");
        const child = fig.firstElementChild;

        aside.style.display = "flex";
        header.style.display = "none";
        photograph_header.style.display = "none";
        filter.style.display = "none";
        pictureSection.style.display = "none";

        aside.setAttribute("aria-hidden", "false");
        aside.style.transform = "scale(1)";
        titre.innerHTML = article.querySelector(".title").textContent;

        if (child.nodeName === "IMG") {
          boxVideo.style.display = "none";
          boxImg.style.display = "block";
          boxImg.src = article.querySelector("img").getAttribute("src");
          boxImg.alt = article.querySelector("img").getAttribute("alt");
        } else if (child.nodeName === "VIDEO") {
          boxImg.style.display = "none";
          boxVideo.style.display = "block";
          boxVideo.src = article.querySelector("video").getAttribute("src");
          boxVideo.setAttribute(
            "alt",
            article.querySelector("video").getAttribute("alt")
          );
          boxVideo.setAttribute("autoplay", "");
          boxVideo.setAttribute("loop", "");
        }

        //au click de left l'affiche dans la fênetre l'img/video suivante gauche
        left.addEventListener("click", () => {
          const newArticle = document.querySelectorAll("article");
          currentArticle--;
          if (currentArticle < 0) {
            currentArticle = newArticle.length - 1;
          }
          const articleMoins = newArticle[currentArticle];
          const figure = articleMoins.querySelector("figure");
          const element = figure.firstElementChild;
          titre.innerHTML = articleMoins.querySelector(".title").textContent;

          if (element.nodeName === "IMG") {
            boxVideo.style.display = "none";
            boxImg.style.display = "block";
            boxImg.src = element.getAttribute("src");
            boxImg.alt = element.getAttribute("alt");
          } else if (element.nodeName === "VIDEO") {
            boxImg.style.display = "none";
            boxVideo.style.display = "block";
            boxVideo.src = element.getAttribute("src");
            boxVideo.setAttribute("alt", element.getAttribute("alt"));
            boxVideo.setAttribute("autoplay", "");
            boxVideo.setAttribute("loop", "");
          }
        });

        //au click de right l'affiche dans la fênetre l'img/video suivante droite
        right.addEventListener("click", () => {
          const newArticle = document.querySelectorAll("article");
          currentArticle++;
          if (currentArticle >= newArticle.length) {
            currentArticle = 0;
          }
          const articlePlus = newArticle[currentArticle];
          const figure = articlePlus.querySelector("figure");
          const element = figure.firstElementChild;
          titre.innerHTML = articlePlus.querySelector(".title").textContent;

          if (element.nodeName === "IMG") {
            boxVideo.style.display = "none";
            boxImg.style.display = "block";
            boxImg.src = element.getAttribute("src");
            boxImg.alt = element.getAttribute("alt");
          } else if (element.nodeName === "VIDEO") {
            boxImg.style.display = "none";
            boxVideo.style.display = "block";
            boxVideo.src = element.getAttribute("src");
            boxVideo.setAttribute("alt", element.getAttribute("alt"));
            boxVideo.setAttribute("autoplay", "");
            boxVideo.setAttribute("loop", "");
          }
        });
      });
    });
  }

  maj();

  // Formulaire Contact

  //Ouverture & Fermeture
  const modal = document.getElementById("contact_modal");
  const contact_button = document.querySelector(".contact_button");
  const close_button = document.querySelector(".close_button");

  contact_button.addEventListener("click", () => {
    modal.style.display = "block";
    modal.setAttribute("aria-hidden", "false");
    contact_button.setAttribute("aria-pressed", "true");
    close_button.setAttribute("aria-pressed", "false");
  });

  close_button.addEventListener("click", () => {
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    contact_button.setAttribute("aria-pressed", "false");
    close_button.setAttribute("aria-pressed", "true");
  });

  //Condition Formulaire
  const form = document.querySelector("#form");
  const first = document.querySelector("#first");
  const last = document.querySelector("#last");
  const email = document.querySelector("#email");
  const text = document.querySelector("#text");

  const nameReg = /[a-zA-ZÀ-ÿ -]+/;
  const emailReg = /^[a-zA-ZÀ-ÿ0-9._%+-]+/;
  const emailReg2 = /@/;
  const emailReg3 =
    /@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const dualReg = /(.)\1{2,}/;
  const numbReg = /^[a-zA-ZÀ-ÿ -]{2,20}$/;
  const textReg = /^.{20,}$/;

  function setErreur(input, message) {
    const formInput = input.parentElement;
    const small = formInput.querySelector("small");

    small.innerText = message;
    input.classList.remove("input-valid");
    input.classList.add("input-error");
  }

  function setValid(input) {
    const formInput = input.parentElement;
    const small = formInput.querySelector("small");

    small.innerText = "";
    input.classList.remove("input-error");
    input.classList.add("input-valid");
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    valid();

    if (
      validfirst() === true &&
      validlast() === true &&
      validemail() === true &&
      validtext() === true
    ) {
    // Créer un objet avec les valeurs des champs du formulaire
    const formData = {
      firstName: first.value.trim(),
      lastName: last.value.trim(),
      email: email.value.trim(),
      message: text.value.trim(),
    };

    // Convertir l'objet en JSON
    const formDataJSON = JSON.stringify(formData);

    // Afficher le JSON dans la console
    console.log(formDataJSON);

      modal.style.display = "none";
      modal.setAttribute("aria-hidden", "true");
      contact_button.setAttribute("aria-pressed", "false");
      first.classList.remove("input-valid");
      last.classList.remove("input-valid");
      email.classList.remove("input-valid");
      text.classList.remove("input-valid");
      first.value = "";
      last.value = "";
      email.value = "";
      text.value = "";
    }
  });

  function valid() {
    validfirst();
    validlast();
    validemail();
    validtext();
  }

  function validfirst() {
    const value = first.value.trim();

    if (first.value.trim() === "") {
      setErreur(first, "Veuillez renseigner un prénom.");
      return false;
    } else if (numbReg.test(value) === false) {
      setErreur(first, "Veuillez entrer au minimum 2 lettres.");
      return false;
    } else if (nameReg.test(value) === false) {
      setErreur(first, "Veuillez entrer un prénom valide.");
      return false;
    } else if (dualReg.test(value) === true) {
      setErreur(first, "Veuillez entrer un prénom valide.");
      return false;
    } else {
      setValid(first);
      return true;
    }
  }

  function validlast() {
    const value = last.value.trim();

    if (value === "") {
      setErreur(last, "Veuillez renseigner un nom.");
      return false;
    } else if (numbReg.test(value) === false) {
      setErreur(last, "Veuillez entrer entre 2 et 20 lettres.");
      return false;
    } else if (nameReg.test(value) === false) {
      setErreur(last, "Veuillez entrer un nom valide.");
      return false;
    } else if (dualReg.test(value) === true) {
      setErreur(last, "Veuillez entrer un nom valide.");
      return false;
    } else {
      setValid(last);
      return true;
    }
  }

  function validemail() {
    const value = email.value.trim();

    if (value === "") {
      setErreur(email, "Veuillez renseigner un email.");
      return false;
    } else if (emailReg.test(value) === false) {
      setErreur(email, "Veuillez verifier votre nom d'utilisateur.");
      return false;
    } else if (emailReg2.test(value) === false) {
      setErreur(email, "N'oublier pas le @.");
      return false;
    } else if (emailReg3.test(value) === false) {
      setErreur(email, "Veuillez vérifier le nom de domaine.");
      return false;
    } else {
      setValid(email);
      return true;
    }
  }

  function validtext() {
    const value = text.value.trim();

    if (value === "") {
      setErreur(text, "Veuillez rédiger votre message.");
      return false;
    } else if (textReg.test(value) === false) {
      setErreur(text, "Veuillez écrire au moins 20 caractères.");
      return false;
    } else {
      setValid(text);
      return true;
    }
  }

  //Accessibilité pour clavier
  const wrapper = document.querySelector(".wrapper");

  wrapper.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
      wrapper.classList.toggle("active");
      if (wrapper.classList.contains("active")) {
        wrapper.setAttribute("aria-expanded", "true");
      } else {
        wrapper.setAttribute("aria-expanded", "false");
      }
    }
  });

  wrapper.addEventListener("blur", () => {
    wrapper.classList.remove("active");
    wrapper.setAttribute("aria-expanded", "false");
  });

  spans.forEach((span) => {
    span.addEventListener("focusin", (e) => {
      if (e.target.classList.contains("selectFilter")) {
        wrapper.classList.add("active");
        wrapper.setAttribute("aria-expanded", "true");
      }
    });
    span.addEventListener("blur", () => {
      wrapper.classList.remove("active");
      wrapper.setAttribute("aria-expanded", "false");
    });
  });

  // Ajout de like
  const add_like = document.querySelectorAll(".add_like");

  // Créer un objet Observer pour le système de likes
  class likeObserver {
    constructor(heart) {
      this.heart = heart;
      this.likes = heart.textContent;
    }
    // Fonction pour ajouter un like
    addLike() {
      this.likes++;
      this.heart.textContent = this.likes;
    }
    // Fonction pour retirer un like
    removeLike() {
      if (this.likes > 0) {
        this.likes--;
        this.heart.textContent = this.likes;
      }
    }
  }

  // Ajouter un écouteur d'événement pour le bouton de like
  add_like.forEach((like) => {
    like.addEventListener("click", () => {
      const heart = like.closest(".like").querySelector(".heart");
      const ObserveAdd = new likeObserver(heart);

      // Ajouter un like si l'utilisateur n'a pas déjà aimé le post
      if (!like.classList.contains("liked")) {
        like.classList.add("liked");
        ObserveAdd.addLike();
      }
      // Retirer un like si l'utilisateur a déjà aimé le post
      else {
        like.classList.remove("liked");
        ObserveAdd.removeLike(heart);
      }
      AllLike();
    });
  });
}
photographerProfil();
