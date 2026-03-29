import { $ } from '../libs/QuerySelector.js';
export const runPostRender = () => {
    let cardElements = $('.card-content');
    cardElements.forEach((it) => {
        it.addEventListener('click', () => {
            const hiddenDescription = it.querySelector('p:last-of-type');

            if (!hiddenDescription) {
                return;
            }

            hiddenDescription.style.display = hiddenDescription.style.display === 'none' || hiddenDescription.style.display === ''
                ? 'block'
                : 'none';
        });
    });
};
