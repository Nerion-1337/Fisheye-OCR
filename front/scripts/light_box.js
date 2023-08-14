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
 const photograph_header = document.querySelector(".photograph-header");
 const pictureSection = document.querySelector(".picture_section");

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

 export function maj() {
   let newArticle = document.querySelectorAll(".article_link");
   //au click sur l'article l'affiche dans la fênetre
   newArticle.forEach((a, index) => {
     a.addEventListener("click", (e) => {
      e.preventDefault;
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