export const playerView = (state = {}, containerId = "container") => {
    const movie = state.movie || {};

    document.getElementById(containerId).innerHTML = `
        <section class="player-shell">
            <header class="player-copy">
                <p class="player-eyebrow">ModularFlix MVP</p>
                <h1>${movie.title || "Reproductor local"}</h1>
                <p class="player-meta">${movie.year || "2026"} · ${movie.genre || "Drama"} · ${movie.duration || "95 min"}</p>
                <p class="player-description">${movie.description || "Ejemplo minimo viable con el reproductor nativo del navegador."}</p>
            </header>

            <section class="player-stage">
                <video
                    id="modular-player"
                    class="player-video"
                    controls
                    preload="metadata"
                    poster="${movie.poster || ""}"
                >
                    <source src="${movie.videoUrl || ""}" type="video/mp4">
                    Tu navegador no soporta reproduccion de video HTML5.
                </video>

                <div class="player-actions">
                    <button id="play-toggle" type="button">Reproducir</button>
                    <button id="restart-video" type="button">Reiniciar</button>
                </div>
            </section>
        </section>
    `;
};
