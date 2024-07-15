const UNSPLASH_ACCESS_KEY = 'eL8r2eVKAXndLcCc3Xs7xgfz_GRDdUtCq41DgfCeda0';
const API_URL = 'https://api.unsplash.com';
const PER_PAGE = 12;

let currentPage = 1;
let currentQuery = '';

document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    currentQuery = document.getElementById('search-query').value;
    currentPage = 1;
    fetchImages();
});

document.getElementById('prev-page').addEventListener('click', function() {
    if (currentPage > 1) {
        currentPage--;
        fetchImages();
    }
});

document.getElementById('next-page').addEventListener('click', function() {
    currentPage++;
    fetchImages();
});

async function fetchImages() {
    const endpoint = currentQuery 
        ? `${API_URL}/search/photos?query=${currentQuery}&page=${currentPage}&per_page=${PER_PAGE}&client_id=${UNSPLASH_ACCESS_KEY}`
        : `${API_URL}/photos?page=${currentPage}&per_page=${PER_PAGE}&client_id=${UNSPLASH_ACCESS_KEY}`;
    
    const response = await fetch(endpoint);
    const data = await response.json();

    const images = currentQuery ? data.results : data;

    displayImages(images);
    updatePaginationInfo();
}

function displayImages(images) {
    const gallery = document.getElementById('image-gallery');
    gallery.innerHTML = '';

    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.urls.small;
        imgElement.alt = image.alt_description || 'Unsplash Image';
        gallery.appendChild(imgElement);
    });
}

function updatePaginationInfo() {
    document.getElementById('page-info').textContent = `Page ${currentPage}`;
    document.getElementById('prev-page').disabled = currentPage === 1;
}

// Initial fetch to display images
fetchImages();