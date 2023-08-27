const API_URL = `https://striveschool-api.herokuapp.com/api/product/`;

/*Navigazione */
function goToBackOffice() {
    window.location.href = 'back-office.html' 
   }

function goToEntry() {
    window.location.href = 'entry-form.html' 
}

/*Ottenere info*/

async function fetchProducts() {
    try {
        const response = await fetch(API_URL, {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4ZGRiZWU4NTlmNTAwMTQ1ZjJmMmEiLCJpYXQiOjE2OTI5ODI3MTksImV4cCI6MTY5NDE5MjMxOX0.ypGq-c1p6NEImZQnf7d1w3i9gRgGAiG6LQQKfH-JFdc"
            }
            });
        const data = await response.json();
        //Spinner
        setTimeout(()=>{document.querySelector('.spinner-container').classList.add('d-none')
        displayUsers(data);},500)
        //fine spinner
        console.log(`recupero prodotti OK`, data);
    } catch (error) {
        console.log(`Errore recupero prodotti: ${error}`);
    }
}

/*Listato info*/

function displayProducts(products) {
    const tableBody = document.getElementById('product-container');
    tableBody.innerHTML = '';

    products.forEach(entry => {
        const row =`
            <tr class="single-product" >
              <td class="image-container align-middle col">
                <img src=${entry.imageUrl} alt="Product Image" class="img-fluid">
              </td>
              <td class="col-6">
                <p class="description">${entry.description}</p>
                <button class="btn btn-outline-info mb-2" onclick="goToEntry(${entry.id})">Di Più...</button>
              </td>
              <td class="col">
                <div class="col-12 mb-3">${entry.name}</div>
                <div class="col-12 mb-3">${entry.brand}</div>
                <div class="col-12">Prezzo: ${entry.price}</div>
              </td>
            </tr>
        `
    })

}


fetchProducts();