document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    fetch('db.json') // Assuming db.json is in the same directory
        .then(response => response.json())
        .then(data => {
            const product = data.products.find(p => p.id == productId);
            if (product) {
                displayProductDetails(product);
            } else {
                document.getElementById('productDetail').innerHTML = '<p>Product not found.</p>';
            }
        });
});

function displayProductDetails(product) {
    const productDetail = document.getElementById('productDetail');
    productDetail.innerHTML = `
        <div class="product-detail-container">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h2>${product.name}</h2>
                <p>${product.description || 'No description available.'}</p>
                <p class="price">$${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `;
}

// Dummy addToCart function for product page
function addToCart(productId) {
    // In a real app, you would have a shared cart module
    alert('Product added to cart! (This is a placeholder)');
}