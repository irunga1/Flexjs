import { $ } from '../libs/QuerySelector.js';
export const runPostRender = () => {
    let cardElements = $('.character-card');
    cardElements.forEach((cardElement) => {
        cardElement.addEventListener('click', () => {
            alert("is Clickable 2");
        });
    });
};