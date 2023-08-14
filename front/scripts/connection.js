const urlBackEnd = "http://localhost:3000/api";
//
const connection = document.querySelector(".connection");
const close_form = document.querySelector(".close_form");
const bloc_light = document.querySelector(".bloc_light");
const bloc_form = document.querySelector(".bloc_form")
let name = document.querySelector("#Name_login");
let password = document.querySelector("#Password_login");
const close_profil = document.querySelector(".close_profil")
const bloc_profil = document.querySelector(".bloc_profil")
//
// LOGIN
const form_login = document.querySelector(".bloc_form_login");
const btn_register = document.querySelector(".btn_register");
//
// REGISTER
const form_register = document.querySelector(".bloc_form_register");
const btn_connection = document.querySelector(".btn_connection");
//
// EDIT
const name_edit = document.querySelector("#Name_edit");
const password_edit = document.querySelector("#Password_edit");
const form_edit = document.querySelector(".form_edit");
const form_img_edit = document.querySelector(".form_img_edit");
const avatar_edit = document.querySelector(".select_img");
//
// ADD IMG
const form_photo = document.querySelector(".form_photo");
const add_img = document.querySelector(".add_img");
//
//
//
close_form.addEventListener("click", () => {
    bloc_light.style.display = "none";
})

close_profil.addEventListener("click", () =>{
    bloc_light.style.display = "none";
})

btn_register.addEventListener("click", () => {
    form_login.style.display = "none";
    form_register.style.display = "flex";
    name = document.querySelector("#Name_register");
    password = document.querySelector("#Password_register");
   })

btn_connection.addEventListener("click", () => {
    form_login.style.display = "flex";
    form_register.style.display = "none";
    name = document.querySelector("#Name_login");
    password = document.querySelector("#Password_login");
   })   


if(localStorage.getItem("token_fisheye") == null){

    const login = document.createElement("button");

    login.textContent = "Login"
    connection.appendChild(login)

    login.addEventListener("click", () => {
        bloc_light.style.display = "flex";
        bloc_form.style.display = "flex";
       })
 
//
//REGISTER POST
    form_register.addEventListener("submit", async (e)  =>{
        e.preventDefault();
const smallName = document.querySelector("#Name_register").parentElement.querySelector("small");
const smallPass = document.querySelector("#Password_register").parentElement.querySelector("small");

await fetch(`${urlBackEnd}/auth/register`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: name.value,
    password: password.value,
  }),
})
  .then((res) => res.json())
  .then((res) => {
    
    if (res === "L'utilisateur existe déjà!") {
        smallName.innerText = res
    } else if(res === "Utilisateur créé."){
        smallName.innerText = res
    } else {
      console.log(res)
    }
  })
  .catch((err) => {
    console.log(err);
  }); 
})
//
//LOGIN POST
form_login.addEventListener("submit", async (e)  =>{
    e.preventDefault();
    const smallName = document.querySelector("#Name_login").parentElement.querySelector("small");
    const smallPass = document.querySelector("#Password_login").parentElement.querySelector("small");

await fetch(`${urlBackEnd}/auth/login`, {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({
name: name.value,
password: password.value,
}),
})
.then((res) => res.json())
.then((res) => {

if (res === "L'utilisateur n'existe pas") {
    smallName.innerText = res;
    smallPass.innerText = "";
} else if(res === "Mauvais password"){
    smallPass.innerText = res;
    smallName.innerText = "";
} else {
  localStorage.setItem("token_fisheye", res);
  window.location.reload();
}
})
.catch((err) => {
console.log(err);
}); 
})


    } else{

const profil = document.createElement("button");
const logout = document.createElement("button");
//
//
const portrait_profil = document.querySelector("#portrait_profil");

        profil.textContent = "Profil"
        profil.setAttribute('class', 'user')
        connection.appendChild(profil)
        logout.textContent = "Logout"
        connection.appendChild(logout)

    
        logout.addEventListener("click", () => {
            localStorage.removeItem('token_fisheye');
            window.location.reload();
           })

        profil.addEventListener("click", () => {
            bloc_light.style.display = "flex";
            bloc_profil.style.display = "flex";
           })
         
//
// USER INFO
await fetch(`${urlBackEnd}/user/data_user`, {
    method: "GET",
    headers: {
    Authorization: `Bearer ${localStorage.getItem("token_fisheye")}`,
    },
    })
    .then((res) => res.json())
    .then((res) => {
    portrait_profil.setAttribute("src", res[0].portrait)
    portrait_profil.setAttribute("class", "p" + res[0].id)
    })
    .catch((err) => {
    console.log(err);
    });
//
// EDIT NAME / PASSWORD
form_edit.addEventListener("submit", async (e)  =>{
    e.preventDefault();

    const smallName = document.querySelector("#Name_edit").parentElement.querySelector("small");
    const smallPass = document.querySelector("#Password_edit").parentElement.querySelector("small");

await fetch(`${urlBackEnd}/edit/update_user`, {
method: "PUT",
headers: {
Authorization: `Bearer ${localStorage.getItem("token_fisheye")}`,
"Content-Type": "application/json",
},
body: JSON.stringify({
name: name_edit.value,
password: password_edit.value,
}),
})
.then((res) => res.json())
.then((res) => {

if (res === "Mise à Jour") {
    smallName.innerText = res;
    smallPass.innerText = res;
} else if(res === "Vous ne pouvez modifier que votre profil"){
    smallPass.innerText = res;
    smallName.innerText = res;
} else if(res === "Taille du nom ou password insuffisant !"){
    smallPass.innerText = res;
    smallName.innerText = res; 
} else {
console.log(res)
}
})
.catch((err) => {
console.log(err);
}); 
})
//
// EDIT AVATAR
form_img_edit.addEventListener("submit", async (e)  =>{
    e.preventDefault();

const imgFile = avatar_edit.files[0] 
const formData = new FormData();
formData.append('avatar', imgFile);

fetch(`${urlBackEnd}/edit/update_avatar`, {
method: "PUT",
headers: {
Authorization: `Bearer ${localStorage.getItem("token_fisheye")}`,
},
body: formData,
})
.then((res) => res.json())
.then((res) => {
console.log(res)
})
.catch((err) => {
console.log(err);
}); 
})
//
// ADD PHOTO
form_photo.addEventListener("submit", async (e)  =>{
    e.preventDefault();

const imgFile = add_img.files
const formData = new FormData();
formData.append('photo', imgFile);
for (let i = 0; i < imgFile.length; i++) {
    formData.append('photo', imgFile[i]);
  }


fetch(`${urlBackEnd}/add_photo`, {
method: "POST",
headers: {
Authorization: `Bearer ${localStorage.getItem("token_fisheye")}`,
},
body: formData,
})
.then((res) => res.json())
.then((res) => {
console.log(res)
})
.catch((err) => {
console.log(err);
}); 
})
    }