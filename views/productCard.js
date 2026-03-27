export const productCard = (items = [], containerId) => {
    const productList = Array.isArray(items) ? items : (items && typeof items === "object" ? [items] : []);
    let cardMarkup = "";
    productList.forEach((product) => {
        if (product && product.image && product.title) {
            cardMarkup += `
                <div class="character-card">
                    <img src="${product.image}" alt="${product.title}">
                    <h3>${product.title}</h3>
                    <p class="category">${product.category}</p>
                    <p class="price">$${product.price.toFixed(2)}</p>
                </div>
            `;
        }
    });
    document.getElementById(containerId).innerHTML = cardMarkup;
};
