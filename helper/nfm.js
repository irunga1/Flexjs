import { $ } from '../libs/QuerySelector.js';
export const nfm1 = () => {
    // let cards = document.querySelectorAll('.character-card');
    let cards = $('.character-card');
    cards.forEach((el) => {
        el.addEventListener('click', () => {
            alert("is Clickable 2");
        });
    });
};