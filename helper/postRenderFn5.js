export const runPostRenderPlayer = () => {
    const video = document.getElementById("modular-player");
    const playButton = document.getElementById("play-toggle");
    const restartButton = document.getElementById("restart-video");

    if (!video || !playButton || !restartButton) {
        return;
    }

    const syncButtonText = () => {
        playButton.textContent = video.paused ? "Reproducir" : "Pausar";
    };

    playButton.addEventListener("click", async () => {
        if (video.paused) {
            try {
                await video.play();
            } catch (error) {
                console.error("No se pudo iniciar el video:", error);
            }
        } else {
            video.pause();
        }

        syncButtonText();
    });

    restartButton.addEventListener("click", () => {
        video.currentTime = 0;
        video.play().catch((error) => {
            console.error("No se pudo reiniciar el video:", error);
        });
        syncButtonText();
    });

    video.addEventListener("play", syncButtonText);
    video.addEventListener("pause", syncButtonText);
    video.addEventListener("ended", syncButtonText);

    syncButtonText();
};
