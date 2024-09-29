// Handle price range display and filtering
const priceRange = document.getElementById('priceRange');
const priceDisplay = document.getElementById('priceDisplay');
const productList = document.getElementById('productList');

priceRange.addEventListener('input', function() {
    priceDisplay.textContent = priceRange.value + "$";
    filterProducts();
});

// Handle sorting functionality
const sortSelect = document.getElementById('sort');
sortSelect.addEventListener('change', function() {
    filterProducts();
});

// Handle filter functionality for availability, product type, more filters, and brand
const availabilityFilters = document.querySelectorAll('input[name="availability"]');
const productTypeFilters = document.querySelectorAll('input[name="product-type"]');
const moreFilters = document.querySelectorAll('input[name="more-filters"]');
const brandFilters = document.querySelectorAll('input[name="brand"]');

// Add event listeners to filter checkboxes
availabilityFilters.forEach(filter => filter.addEventListener('change', filterProducts));
productTypeFilters.forEach(filter => filter.addEventListener('change', filterProducts));
moreFilters.forEach(filter => filter.addEventListener('change', filterProducts));
brandFilters.forEach(filter => filter.addEventListener('change', filterProducts));

// Filter and sort products function
function filterProducts() {
    const sortValue = sortSelect.value;
    const maxPrice = parseFloat(priceRange.value);

    let products = Array.from(productList.getElementsByClassName('product-card'));

    // Filter by price range
    products = products.filter(product => parseFloat(product.getAttribute('data-price')) <= maxPrice);

    // Filter by availability
    const availabilityChecked = Array.from(availabilityFilters).some(filter => filter.checked);
    if (availabilityChecked) {
        products = products.filter(product => {
            const inStock = product.getAttribute('data-availability') === 'in-stock';
            return (document.getElementById('in-stock').checked && inStock) ||
                (document.getElementById('out-of-stock').checked && !inStock);
        });
    }

    // Filter by product type (e.g., fashion)
    const productTypeChecked = Array.from(productTypeFilters).some(filter => filter.checked);
    if (productTypeChecked) {
        products = products.filter(product => {
            const type = product.getAttribute('data-type');
            return document.getElementById('fashion').checked && type === 'fashion';
        });
    }

    // Filter by brand
    const brandChecked = Array.from(brandFilters).some(filter => filter.checked);
    if (brandChecked) {
        products = products.filter(product => {
            const brand = product.getAttribute('data-brand');
            return (document.getElementById('allen-solly').checked && brand === 'Allen Solly') ||
                (document.getElementById('levis').checked && brand === 'Levi\'s') ||
                (document.getElementById('zara').checked && brand === 'Zara');
        });
    }

    // Sort products based on selected sort option
    if (sortValue === 'price-asc') {
        products.sort((a, b) => {
            return a.getAttribute('data-price') - b.getAttribute('data-price');
        });
    } else if (sortValue === 'price-desc') {
        products.sort((a, b) => {
            return b.getAttribute('data-price') - a.getAttribute('data-price');
        });
    }

    // Clear the current product list and append filtered/sorted products
    productList.innerHTML = '';
    products.forEach(product => productList.appendChild(product));
}
