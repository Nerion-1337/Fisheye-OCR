const urlBackEnd = "http://localhost:3000/api";
//Récupère id inséré dans l'url
const url = window.location.href;
const idUser = new URL(url).searchParams.get("id");
//
//
export async function Dataphotographer() {
    try {
      const response = await fetch(`${urlBackEnd}/user/data_all`);
      if (response.status === 200) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Server response error");
      }
    } catch (error) {
      const response = await fetch("./data/photographers.json");
      const data = await response.json();
      return data.photographers;
    }
  }
//
//
//
export async function fetchData() {
    try {
      const dataUser = await fetch(`${urlBackEnd}/user/data/${idUser}`);
      const data_User = await dataUser.json();
      const photographers = data_User[0];
  
      const dataPhoto = await fetch(`${urlBackEnd}/photo/${idUser}`);
      const data_Photo = await dataPhoto.json();
      const media = data_Photo;
  
      return { photographers, media };
  
    } catch (error) {
      
      const response = await fetch(`../data/photographers.json`);
      const data = await response.json();
  
      const photographers = data.photographers.filter((p) => p.id == idUser)[0];
      const media = data.media.filter((p) => p.photographerId == idUser);
  
      return { photographers, media };
    }
  }
  //
  //
  //
  export function add_heart_server(image_id){
    fetch(`${urlBackEnd}/like`, {
      method: "POST",
      headers: {
      Authorization: `Bearer ${localStorage.getItem("token_fisheye")}`,
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image_id: image_id,
        user_image_id: idUser,
        }),
      })
      .then((res) => res.json())
      .then((res) => {
      console.log(res)
      })
      .catch((err) => {
      console.log(err);
      }); 
  }