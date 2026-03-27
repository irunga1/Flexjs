// import { $ } from '../libs/QuerySelector.js';
// export const runPostRender = () => {
//     let cardElements = $('.character-card');
//     cardElements.forEach((cardElement) => {
//         cardElement.addEventListener('click', () => {
//             alert("is Clickable 2");
//         });
//     });
// };


import { $ } from '../libs/QuerySelector.js';
export const runPostRender = () => {
    const cardElements = $('.character-card');
    const heroTitle = $('#hero-title');
    const heroMeta = $('#hero-meta');
    const heroDescription = $('#hero-description');
    const heroBackdrop = $('#hero-backdrop');
    const heroPlay = $('#hero-play');
    const heroMore = $('#hero-more');
    const railRows = document.querySelectorAll('.rail-row');

    const closeAllExpansions = () => {
        railRows.forEach((row) => {
            const panel = row.querySelector('.rail-expand');
            const activeCard = row.querySelector('.character-card.is-active');
            if (panel) {
                panel.hidden = true;
                panel.classList.remove('is-open');
            }
            if (activeCard) {
                activeCard.classList.remove('is-active');
            }
        });
    };

    const openExpansion = (cardElement, { scrollIntoView = true } = {}) => {
        const row = cardElement.closest('.rail-row');
        const panel = row?.querySelector('.rail-expand');
        const panelTitle = panel?.querySelector('.rail-expand-title');
        const panelMeta = panel?.querySelector('.rail-expand-meta');
        const panelDescription = panel?.querySelector('.rail-expand-description');
        const panelPoster = panel?.querySelector('.rail-expand-poster');
        const panelBackdrop = panel?.querySelector('.rail-expand-backdrop');

        if (!row || !panel || !panelTitle || !panelMeta || !panelDescription || !panelPoster || !panelBackdrop) {
            return;
        }

        const isSameCardOpen = cardElement.classList.contains('is-active') && panel.classList.contains('is-open');
        closeAllExpansions();

        if (isSameCardOpen) {
            return;
        }

        cardElement.classList.add('is-active');
        panelTitle.textContent = cardElement.dataset.title || 'Pelicula';
        panelMeta.textContent = `Estreno: ${cardElement.dataset.release || 'N/A'} · Rating: ${cardElement.dataset.rating || 'N/A'}`;
        panelDescription.textContent = cardElement.dataset.overview || 'No hay descripcion disponible.';
        panelPoster.src = cardElement.dataset.poster || '';
        panelPoster.alt = cardElement.dataset.title || 'Poster';
        panelBackdrop.style.backgroundImage = `
            linear-gradient(90deg, rgba(6, 6, 6, 0.92) 0%, rgba(6, 6, 6, 0.52) 42%, rgba(6, 6, 6, 0.88) 100%),
            url("${cardElement.dataset.backdrop || cardElement.dataset.poster || ''}")
        `;
        panel.hidden = false;
        panel.classList.add('is-open');

        if (scrollIntoView) {
            panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    };

    const firstCard = cardElements[0];
    if (firstCard && heroTitle && heroMeta && heroDescription && heroBackdrop) {
        heroTitle.textContent = firstCard.dataset.title || 'Estrenos populares';
        heroMeta.textContent = `Popular en TMDB · ${firstCard.dataset.release || 'Fecha no disponible'} · ★ ${firstCard.dataset.rating || 'N/A'}`;
        heroDescription.textContent = firstCard.dataset.overview || 'Explora peliculas populares con una presentacion inspirada en plataformas de streaming.';
        if (firstCard.dataset.backdrop) {
            heroBackdrop.style.backgroundImage = `
                linear-gradient(90deg, rgba(0, 0, 0, 0.86) 0%, rgba(0, 0, 0, 0.4) 46%, rgba(0, 0, 0, 0.88) 100%),
                linear-gradient(180deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.82)),
                url("${firstCard.dataset.backdrop}")
            `;
        }
    }

    cardElements.forEach((cardElement) => {
        cardElement.addEventListener('click', () => {
            openExpansion(cardElement);
        });

        cardElement.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openExpansion(cardElement);
            }
        });
    });

    railRows.forEach((row) => {
        const closeButton = row.querySelector('.rail-expand-close');
        closeButton?.addEventListener('click', () => {
            closeAllExpansions();
        });
    });

    if (heroMore && firstCard && !heroMore.dataset.eventsBound) {
        heroMore.addEventListener('click', () => {
            openExpansion(firstCard, { scrollIntoView: true });
        });
        heroMore.dataset.eventsBound = 'true';
    }

    if (heroPlay && firstCard && !heroPlay.dataset.eventsBound) {
        heroPlay.addEventListener('click', () => {
            openExpansion(firstCard, { scrollIntoView: true });
        });
        heroPlay.dataset.eventsBound = 'true';
    }

    if (!document.body.dataset.netflixEscBound) {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeAllExpansions();
            }
        });
        document.body.dataset.netflixEscBound = 'true';
    }
};
