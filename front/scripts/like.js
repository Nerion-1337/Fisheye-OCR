import { add_heart_server } from "./fetch.js";
//
//
//
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
//
//
//
const heart = document.createElement("i");
heart.setAttribute("class", "fa fa-heart hall_heart");
//
export function AllLike() {
    const totalLike = document.querySelector(".totalLike");
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
export function add_heart(){
     // Ajout de like
      const add_like = document.querySelectorAll(".add_like");
    // Ajouter un écouteur d'événement pour le bouton de like
    add_like.forEach((like) => {
        like.addEventListener("click", () => {
          const image_id = parseFloat(like.title)
          const heart = like.closest(".like").querySelector(".heart");
          const ObserveAdd = new likeObserver(heart);
          add_heart_server(image_id);
    
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