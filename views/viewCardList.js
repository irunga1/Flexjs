export const viewCardList = (info = [], id) => {
    // Asegurar que 'info' sea un array
    const data = (Array.isArray(info)) ? info : (info && typeof info === 'object' ? [info] : []);

    let str = "";
    data.forEach((el) => {
        if (el && el.image && el.name) {
            str += `
                <div class="character-card">
                    <img src="${el.image}" alt="${el.name}">
                    <h3>${el.name}</h3>
                </div>
            `;
        }
    });

    const container = document.getElementById(id);
    document.getElementById(id).innerHTML = str;
};