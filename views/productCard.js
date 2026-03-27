export const productCard = (info = [], id) => {
    const data = (Array.isArray(info)) ? info : (info && typeof info === 'object' ? [info] : []);
    let str = "";
    data.forEach((el) => {
        if (el && el.image && el.title) {
            str += `
                <div class="character-card">
                    <img src="${el.image}" alt="${el.title}">
                    <h3>${el.title}</h3>
                    <p class="category">${el.category}</p>
                    <p class="price">$${el.price.toFixed(2)}</p>
                </div>
            `;
        }
    });
    document.getElementById(id).innerHTML = str;
};