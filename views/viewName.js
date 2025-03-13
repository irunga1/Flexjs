export const viewName = (info = [], id) => {
    let str = "";
    info.forEach((el) => {
        str += `
            <div class="character-card">
                <img src="${el.image}" alt="${el.name}">
                <h3>${el.name}</h3>
            </div>
        `;
    });
    document.getElementById(id).innerHTML = str;
    console.log(str);
};