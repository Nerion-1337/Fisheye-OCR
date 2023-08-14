import { maj } from "./light_box.js"
//
//
export function Sort(){
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
//
//
//
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
}