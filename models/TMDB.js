import { ApiModule } from "./ApiModule.js";

const TMDB_API_KEY = "ae01670cab9fb38c45dc7b0199996909";

export const getPopularMoviesUrl = (page = 1, language = "es-ES") =>
    `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=${language}&page=${page}`;

export const getMovieVideosUrl = (movieId, language = "es-ES") =>
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${TMDB_API_KEY}&language=${language}`;

export const getYoutubeEmbedUrl = (videoKey) =>
    `https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0`;

export const getYoutubeWatchUrl = (videoKey) =>
    `https://www.youtube.com/watch?v=${videoKey}`;

export class TMDB extends ApiModule {
    constructor(apiUrl = "") {
        super(apiUrl);
    }
}
