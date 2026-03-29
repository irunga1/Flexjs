export const viewCardList = (items = [], containerId) => {
    const characterList = Array.isArray(items) ? items : (items && typeof items === "object" ? [items] : []);

    let cardMarkup = "";
    let cont = 0;
    characterList.forEach((character) => {
        if (character && character.image && character.name) {
            cardMarkup += `
                <div id =${cont} class="character-card">
                    <img src="${character.image}" alt="${character.name}">
                    <h3>${character.name}</h3>
                </div>
            `;
            cont++;

        }
    });

    document.getElementById(containerId).innerHTML = cardMarkup;
};
