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
import { getMovieVideosUrl, getYoutubeEmbedUrl, getYoutubeWatchUrl } from '../models/TMDB.js';

export const runPostRender = () => {
    const cardElements = $('.character-card');
    const heroTitle = $('#hero-title');
    const heroMeta = $('#hero-meta');
    const heroDescription = $('#hero-description');
    const heroBackdrop = $('#hero-backdrop');
    const heroPlay = $('#hero-play');
    const heroMore = $('#hero-more');
    const railRows = document.querySelectorAll('.rail-row');
    const trailerCache = new Map();

    const resetPanelTrailer = (panel) => {
        const iframe = panel?.querySelector('.rail-expand-iframe');
        const videoSection = panel?.querySelector('.rail-expand-video');
        const emptyState = panel?.querySelector('.rail-expand-video-empty');
        const youtubeLink = panel?.querySelector('.rail-expand-youtube');
        const watchButton = panel?.querySelector('.rail-expand-watch');

        if (iframe) {
            iframe.src = '';
        }
        if (videoSection) {
            videoSection.hidden = true;
        }
        if (emptyState) {
            emptyState.hidden = true;
        }
        if (youtubeLink) {
            youtubeLink.hidden = true;
            youtubeLink.href = '#';
        }
        if (watchButton) {
            watchButton.disabled = false;
            watchButton.textContent = 'Ver trailer';
        }
    };

    const getBestTrailer = async (movieId) => {
        if (!movieId) {
            return null;
        }

        if (trailerCache.has(movieId)) {
            return trailerCache.get(movieId);
        }

        try {
            const response = await fetch(getMovieVideosUrl(movieId));
            const data = await response.json();
            const videos = Array.isArray(data.results) ? data.results : [];
            const trailer = videos.find((video) => video.site === 'YouTube' && video.type === 'Trailer' && video.official)
                || videos.find((video) => video.site === 'YouTube' && video.type === 'Trailer')
                || videos.find((video) => video.site === 'YouTube' && video.type === 'Teaser')
                || null;

            trailerCache.set(movieId, trailer);
            return trailer;
        } catch (error) {
            console.error('No se pudieron cargar los videos de TMDB:', error);
            trailerCache.set(movieId, null);
            return null;
        }
    };

    const loadTrailerIntoPanel = async (cardElement, panel) => {
        const watchButton = panel?.querySelector('.rail-expand-watch');
        const youtubeLink = panel?.querySelector('.rail-expand-youtube');
        const videoSection = panel?.querySelector('.rail-expand-video');
        const iframe = panel?.querySelector('.rail-expand-iframe');
        const emptyState = panel?.querySelector('.rail-expand-video-empty');

        if (!watchButton || !youtubeLink || !videoSection || !iframe || !emptyState) {
            return;
        }

        watchButton.disabled = true;
        watchButton.textContent = 'Cargando trailer...';

        const trailer = await getBestTrailer(cardElement.dataset.id);

        if (!trailer?.key) {
            videoSection.hidden = false;
            emptyState.hidden = false;
            watchButton.textContent = 'Sin trailer';
            return;
        }

        const embedUrl = getYoutubeEmbedUrl(trailer.key);
        iframe.src = embedUrl;
        videoSection.hidden = false;
        emptyState.hidden = true;
        youtubeLink.href = getYoutubeWatchUrl(trailer.key);
        youtubeLink.hidden = false;
        watchButton.textContent = 'Reproduciendo';
    };

    const closeAllExpansions = () => {
        railRows.forEach((row) => {
            const panel = row.querySelector('.rail-expand');
            const activeCard = row.querySelector('.character-card.is-active');
            resetPanelTrailer(panel);
            if (panel) {
                panel.hidden = true;
                panel.classList.remove('is-open');
            }
            if (activeCard) {
                activeCard.classList.remove('is-active');
            }
        });
    };

    const openExpansion = async (cardElement, { scrollIntoView = true, autoplayTrailer = false } = {}) => {
        const row = cardElement.closest('.rail-row');
        const panel = row?.querySelector('.rail-expand');
        const panelTitle = panel?.querySelector('.rail-expand-title');
        const panelMeta = panel?.querySelector('.rail-expand-meta');
        const panelDescription = panel?.querySelector('.rail-expand-description');
        const panelPoster = panel?.querySelector('.rail-expand-poster');
        const panelBackdrop = panel?.querySelector('.rail-expand-backdrop');
        const panelWatch = panel?.querySelector('.rail-expand-watch');

        if (!row || !panel || !panelTitle || !panelMeta || !panelDescription || !panelPoster || !panelBackdrop || !panelWatch) {
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
        panelWatch.onclick = () => {
            loadTrailerIntoPanel(cardElement, panel);
        };
        resetPanelTrailer(panel);
        panel.hidden = false;
        panel.classList.add('is-open');

        if (scrollIntoView) {
            panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        if (autoplayTrailer) {
            await loadTrailerIntoPanel(cardElement, panel);
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
        heroPlay.addEventListener('click', async () => {
            await openExpansion(firstCard, { scrollIntoView: true, autoplayTrailer: true });
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
