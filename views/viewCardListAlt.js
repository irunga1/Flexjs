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

    const container = document.getElementById(containerId);
    if (container.innerHTML.trim()) {
        container.insertAdjacentHTML("beforeend", listMarkup);
    } else {
        container.innerHTML = listMarkup;
    }
};
