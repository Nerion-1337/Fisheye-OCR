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

  //
  //
  //
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

      const elements = [first, last, email, text];

      elements.forEach((element) => {
        element.classList.remove("input-valid", "input-error");
        element.value = "";
      });
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