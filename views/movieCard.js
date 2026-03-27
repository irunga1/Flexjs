const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const TMDB_BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";
const RAIL_TITLES = [
    "Tendencias",
    "Populares en tu pais",
    "Solo en ModularFlix",
    "Peliculas para hoy",
    "Accion y aventura",
    "Porque viste estrenos"
];

export const movieCard = (items = [], containerId) => {
    const movieList = Array.isArray(items) ? items : (items && typeof items === "object" ? [items] : []);
    const rows = [];
    const itemsPerRow = 6;

    for (let index = 0; index < movieList.length; index += itemsPerRow) {
        rows.push(movieList.slice(index, index + itemsPerRow));
    }

    const createCardMarkup = (movie) => {
        if (!movie || !movie.title) {
            return "";
        }

        const sanitizeAttr = (value = "") => String(value)
            .replace(/&/g, "&amp;")
            .replace(/"/g, "&quot;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

        const posterUrl = movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : "";
        const backdropUrl = movie.backdrop_path ? `${TMDB_BACKDROP_BASE_URL}${movie.backdrop_path}` : posterUrl;
        const releaseDate = movie.release_date || "Fecha no disponible";
        const voteAverage = typeof movie.vote_average === "number" ? movie.vote_average.toFixed(1) : "N/A";
        const releaseYear = releaseDate !== "Fecha no disponible" ? releaseDate.slice(0, 4) : "N/A";
        const overview = movie.overview || "No hay descripcion disponible para esta pelicula.";

        return `
            <article
                class="character-card"
                tabindex="0"
                data-title="${sanitizeAttr(movie.title)}"
                data-release="${sanitizeAttr(releaseDate)}"
                data-rating="${sanitizeAttr(voteAverage)}"
                data-overview="${sanitizeAttr(overview)}"
                data-poster="${sanitizeAttr(posterUrl)}"
                data-backdrop="${sanitizeAttr(backdropUrl)}"
            >
                <div class="card-poster-wrap">
                    ${posterUrl ? `<img src="${posterUrl}" alt="${movie.title}" loading="lazy">` : ""}
                    <div class="card-overlay">
                        <span class="card-chip">Top 10</span>
                        <h3>${movie.title}</h3>
                        <p class="card-description">${overview}</p>
                        <div class="card-meta">
                            <p class="category">${releaseYear}</p>
                            <p class="price">★ ${voteAverage}</p>
                        </div>
                    </div>
                </div>
            </article>
        `;
    };

    const cardMarkup = rows.map((row, index) => `
        <section class="rail-row">
            <div class="rail-row-header">
                <h3>${RAIL_TITLES[index % RAIL_TITLES.length]}</h3>
            </div>
            <div class="rail-track">
                ${row.map(createCardMarkup).join("")}
            </div>
            <div class="rail-expand" hidden>
                <div class="rail-expand-backdrop"></div>
                <div class="rail-expand-content">
                    <button class="rail-expand-close" type="button" aria-label="Cerrar detalle">&times;</button>
                    <div class="rail-expand-copy">
                        <p class="rail-expand-kicker">Vista previa</p>
                        <h4 class="rail-expand-title"></h4>
                        <p class="rail-expand-meta"></p>
                        <p class="rail-expand-description"></p>
                    </div>
                    <div class="rail-expand-poster-wrap">
                        <img class="rail-expand-poster" src="" alt="">
                    </div>
                </div>
            </div>
        </section>
    `).join("");

    document.getElementById(containerId).innerHTML = cardMarkup;
};
