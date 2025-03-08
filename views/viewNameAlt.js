export const viewNameAlt = (info = [], id) => {
    let str = "<ul class='character-list'>";
    info.forEach((el) => {
        str += `
            <li class="character-item">
                <img src="${el.image}" alt="${el.name}" class="character-img">
                <div class="character-info">
                    <h3>${el.name}</h3>
                    <p>Especie: ${el.species}</p>
                </div>
            </li>
        `;
    });
    str += "</ul>";
    document.getElementById(id).innerHTML = str;
};