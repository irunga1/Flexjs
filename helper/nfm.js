export const nfm1 = () => {
    let cards = document.querySelectorAll('.character-card');
    cards.forEach((el) => {
        el.addEventListener('click', () => {
            alert("is Clickable");
        });
    });
};