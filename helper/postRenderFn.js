import { $ } from '../libs/QuerySelector.js';
export const postRenderFn = () => {
    // let cards = document.querySelectorAll('.character-card');
    let cards = $('.character-card');
    cards.forEach((el) => {
        el.addEventListener('click', () => {
            alert("is Clickable 2");
        });
    });
};