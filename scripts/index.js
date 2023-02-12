async function getPhotographers() {
  let photographers;

  await fetch("./data/photographers.json")
    .then((r) => r.json())
    .then((data) => {
      photographers = data.photographers;
    })
    .catch((error) => console.error(error));

  return { photographers };
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();

function photographerFactory(photographer) {
  const { id, name, portrait, city, country, tagline, price } = photographer;

  const picture = `assets/photographers/${portrait}`;
  const linktopage = "./Page/photographer.html?id=" + id;

  function getUserCardDOM() {
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
  return { name, picture, getUserCardDOM };
}
