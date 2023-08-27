const API_URL = `https://striveschool-api.herokuapp.com/api/product/`;
function goToIndex() {
  window.location.href = "index.html";
} //avrei voluto non doverlo scrivere due volte ma entry-form e backoffice non condividono molte altre funzioni.

function displayProduct(product) {
    const cardBody = document.querySelector(".product-container");
  cardBody.innerHTML = "";

    const card = `
    <div class="row">
        <div class="col-3 mb-3 product-image">
            <img src=${product.imageUrl} alt="Product Image" class="img-fluid">
        </div>
        <div class=" col-3 product-details">
            <div class="mb-3">Name: ${product.name}</div>
            <div class="mb-3">Brand: ${product.brand}</div>
            <div class="mb-3">Price: ${product.price}</div>
        </div>
    </div>
    <div class="mb-3">
        ${product.description}
    </div>
    `;

    cardBody.innerHTML = card;
  
}

async function getProductData() {
    console.log('I\'m in!');
    const qsParams = new URLSearchParams(window.location.search);
    const productId = qsParams.get("id");
    console.log(productId);
try {
    const response = await fetch(`${API_URL}${productId}`, {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4ZGRiZWU4NTlmNTAwMTQ1ZjJmMmEiLCJpYXQiOjE2OTI5ODI3MTksImV4cCI6MTY5NDE5MjMxOX0.ypGq-c1p6NEImZQnf7d1w3i9gRgGAiG6LQQKfH-JFdc"
        }
        });
      const product = await response.json();
      setTimeout(() => {
        document.querySelector(".spinner-container").classList.add("d-none");
        displayProduct(product);
      }, 500);
      //fine spinner
      console.log(`recupero prodotti OK`, product);

} catch (error) {
    console.log(`Errore recupero prodotti: ${error}`);
}
}

getProductData()