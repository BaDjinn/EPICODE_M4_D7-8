const API_URL = `https://striveschool-api.herokuapp.com/api/product/`;

function goToIndex() {
    window.location.href = 'index.html' 
   }

function loadImage(){ 
    const urlPreview = document.getElementById('imageUrl').value;
    if (urlPreview) {
    document.querySelector('#image-preview').innerHTML = "";
    document.querySelector('#image-preview').innerHTML = `<img src=${urlPreview} alt="Product Image" class="img-fluid">`;}
    else {document.querySelector('#image-preview').innerHTML = "";}
}

