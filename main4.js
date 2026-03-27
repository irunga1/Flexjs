import { TMDB } from "./models/TMDB.js";
import { movieCard } from "./views/movieCard.js";
import { runPostRender } from "./helper/postRenderFn.js";
import { FlexJS } from "./core/Flex.js";
import { runBeforeRender } from "./helper/preRenderFn.js";

const TMDB_API_KEY = "ae01670cab9fb38c45dc7b0199996909";
const tmdbPopularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=es-ES&page=1`;

const flexApp = new FlexJS(tmdbPopularMoviesUrl);
flexApp.init(movieCard, runPostRender, "container", TMDB, runBeforeRender, 20);
flexApp.applyStylesheet("netflix.css");

