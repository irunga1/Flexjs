export const runBeforeRenderPlayer = (state = {}) => {
    console.log("Inicializando reproductor local:", state.movie?.title || "Sin titulo");
};
