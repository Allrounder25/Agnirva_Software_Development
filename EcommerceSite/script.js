document.addEventListener('DOMContentLoaded', function () {
    let products = []; // Make products available globally in this script
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    fetch('db.json') // Fetching from local file directly
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            products = data.products;
            displayProducts(products);
            viewCart(); // Display cart on page load
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
            document.getElementById('productList').innerHTML = '<p>Could not load products. Please make sure you are running this from a server or that the db.json file is in the correct path.</p>';
        });

    function displayProducts(productsToDisplay) {
        const productList = document.getElementById("productList");
        productList.innerHTML = "";
        productsToDisplay.forEach((product) => {
            const productDiv = document.createElement("div");
            productDiv.className = "product";
            productDiv.innerHTML = `
                <a href="product.html?id=${product.id}" class="product-link">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>$${product.price}</p>
                </a>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            `;
            productList.appendChild(productDiv);
        });
    }

    window.addToCart = function(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
            const cartMessage = document.createElement("p");
            cartMessage.textContent = `${product.name} added to cart!`;
            document.body.appendChild(cartMessage);
            setTimeout(() => cartMessage.remove(), 2000);
            viewCart();
        }
    }

    function viewCart() {
        const cartList = document.getElementById("cartList");
        cartList.innerHTML = ""; // Clear the cart display

        if (cart.length === 0) {
            cartList.innerHTML = "<p>Your cart is empty.</p>";
        } else {
            cart.forEach((item, index) => {
                const cartItem = document.createElement("div");
                cartItem.className = "cart-item";
                cartItem.innerHTML = `
                    <span>${item.name} - $${item.price}</span>
                    <button onclick="removeFromCart(${index})">Remove</button>
                `;
                cartList.appendChild(cartItem);
            });
        }

        const total = cart.reduce((sum, item) => sum + item.price, 0);
        document.getElementById("totalPrice").textContent = `Total: $${total.toFixed(2)}`;
    }

    window.removeFromCart = function(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        viewCart();
    }

    document.getElementById("checkoutButton").addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }
        alert("Thank you for your purchase!");
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        viewCart();
    });

    const searchBar = document.getElementById("searchBar");
    searchBar.addEventListener("input", (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
        );
        displayProducts(filteredProducts);
    });
});