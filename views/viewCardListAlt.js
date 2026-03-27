export const viewCardListAlt = (items = [], containerId) => {
    let listMarkup = "<ul class='character-list'>";
    items.forEach((character) => {
        listMarkup += `
            <li class="character-item">
                <img src="${character.image}" alt="${character.name}" class="character-img">
                <div class="character-info">
                    <h3>${character.name}</h3>
                    <p>Especie: ${character.species}</p>
                </div>
            </li>
        `;
    });
    listMarkup += "</ul>";
    document.getElementById(containerId).innerHTML = listMarkup;
};
