const API_URL = `https://striveschool-api.herokuapp.com/api/product/`;
const form = document.getElementById("product-form");
//shorthands per gli input
const productIdInput = document.getElementById("user-id");
const nameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");
const brandInput = document.getElementById("brand");
const imageUrlInput = document.getElementById("imageUrl");
const priceInput = document.getElementById("price");

function goToIndex() {
  window.location.href = "index.html";
}

async function deleteProduct() {
  const qsParams = new URLSearchParams(window.location.search);
  const productId = qsParams.get("id");
  if (confirm("Sei sicuro di voler eliminare questo prodotto?")) {
    try {
      await await fetch(`${API_URL}${productId}`, {
        method: "DELETE",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4ZGRiZWU4NTlmNTAwMTQ1ZjJmMmEiLCJpYXQiOjE2OTI5ODI3MTksImV4cCI6MTY5NDE5MjMxOX0.ypGq-c1p6NEImZQnf7d1w3i9gRgGAiG6LQQKfH-JFdc",
        },
      });
      window.location.href = "index.html?status=cancel-ok";
    } catch (error) {
      console.log("Errore nel'eleminazione dell'utente: ", error);
    }
  }
}

async function loadImage() {
  try {
    const urlPreview = document.getElementById("imageUrl").value;
    if (urlPreview) {
      document.querySelector("#image-preview").innerHTML = "";
      document.querySelector(
        "#image-preview"
      ).innerHTML = `<img src=${urlPreview} alt="Product Image" class="img-fluid">`;
    } else {
      document.querySelector("#image-preview").innerHTML = "";
    }
  } catch (error) {
    alert("Si è verificato un errore durante il caricamento dell'immagine.");
  }
}

function convalidaForm() {
  const errors = {};

  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const brand = document.getElementById("brand").value;
  const imageUrl = document.getElementById("imageUrl").value;
  const price = document.getElementById("price").value;

  if (!name) errors.name = "Il campo nome è obbligatorio.";
  else errors.name = "";

  if (!description) errors.description = "Il campo descrizione è obbligatorio.";
  else errors.description = "";

  if (!brand) errors.brand = "Il campo brand è obbligatorio.";
  else errors.brand = "";

  if (!brand) errors.brand = "Il campo brand è obbligatorio.";
  else errors.brand = "";

  if (!imageUrl)
    errors.imageUrl = "Il campo indirizzo immagine è obbligatorio.";
  else if (!/[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/.test(imageUrl))
    errors.email = "Inserisci un indirizzo immagine valido";
  else errors.imageUrl = "";

  if (!price) errors.price = "Il campo prezzo è obbligatorio.";
  else errors.price = "";

  return {
    isAllValid: Object.values(errors).every((value) => value === ''),
    errors
  };
}

function displayValidation() {
  const valid = convalidaForm();
  let isValid = true;

  if (!valid.isAllValid) {

    for (const field in valid.errors) {
      const errorElement = document.getElementById(`${field}-error`);
      errorElement.textContent = '';
      errorElement.textContent = valid.errors[field];
    }

    isValid = false;
  }
  return isValid;
}

form.addEventListener("submit", async (evnt) => {
  evnt.preventDefault();

  const isFormValid = displayValidation();
  if (!isFormValid) return false;

  //costruiamo l'entry del database
  const product = {
    name: nameInput.value,
    description: descriptionInput.value,
    brand: brandInput.value,
    imageUrl: imageUrlInput.value,
    price: priceInput.value,
  };
  //console.log(product)
  try {
    const URL = productIdInput.value
      ? `${API_URL}${productIdInput.value}`
      : `${API_URL}`;

    const HTTP_METHOD = productIdInput.value ? "PUT" : "POST";
    //console.log(HTTP_METHOD);
    const response = await fetch(URL, {
      method: HTTP_METHOD,
      body: JSON.stringify(product),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4ZGRiZWU4NTlmNTAwMTQ1ZjJmMmEiLCJpYXQiOjE2OTI5ODI3MTksImV4cCI6MTY5NDE5MjMxOX0.ypGq-c1p6NEImZQnf7d1w3i9gRgGAiG6LQQKfH-JFdc",
      },
    });

    if (response.ok) {
      window.location.href = productIdInput.value
        ? "index.html?status=edit-ok"
        : "index.html?status=create-ok";
    } else {
      alert("Si è verificato un errore durante la creazione del prodotto.");
    }
  } catch (error) {alert(`Si è verificato un errore durante il salvataggio.${error}`)}
});

function buildTitle(productId) {
  const pageTitle = document.getElementById("page-title");
  pageTitle.innerHTML = productId ? "Modifica prodotto" : "Crea nuovo prodotto";
}

async function getProductData() {
  //console.log('I\'m in!');
  const qsParams = new URLSearchParams(window.location.search);
  const productId = qsParams.get("id");
  //console.log(productId);
  buildTitle(productId);

  if (productId) {
    // MODIFICA PRODOTTO

    try {
      const response = await fetch(`${API_URL}${productId}`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4ZGRiZWU4NTlmNTAwMTQ1ZjJmMmEiLCJpYXQiOjE2OTI5ODI3MTksImV4cCI6MTY5NDE5MjMxOX0.ypGq-c1p6NEImZQnf7d1w3i9gRgGAiG6LQQKfH-JFdc",
        },
      });
      const product = await response.json();

      setTimeout(() => {
        document.querySelector(".spinner-container").classList.add("d-none");
        document.querySelector("#product-form").classList.remove("d-none");
        document.querySelector("#deleteButton").classList.remove("d-none");
      }, 500);

      if (!("name" in product)) {
        console.log("Il prodotto non esiste"); //nel caso qualcuno modificasse la query manualmente dalla barra
        return;
      }

      productIdInput.value = product._id;
      nameInput.value = product.name;
      descriptionInput.value = product.description;
      brandInput.value = product.brand;
      imageUrlInput.value = product.imageUrl;
      priceInput.value = product.price;
    } catch (error) {
      console.log("Errore nel recupero dei dati prodotto: ", error);
    }
  } else {
    // CREAZIONE PRODOTTO
    document.querySelector(".spinner-container").classList.add("d-none");
    document.querySelector("#product-form").classList.remove("d-none");
    console.log("Nuovo prodotto!");
  }
}

getProductData();
