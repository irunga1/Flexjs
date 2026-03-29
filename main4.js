import { TMDB } from "./models/TMDB.js";
import { movieCard } from "./views/movieCard.js";
import { runPostRender } from "./helper/postRenderFn.js";
import { FlexJS } from "./core/Flex.js";
import { runBeforeRender } from "./helper/preRenderFn.js";
import { getPopularMoviesUrl } from "./models/TMDB.js";

const tmdbPopularMoviesUrl = getPopularMoviesUrl();

const flexApp = new FlexJS(tmdbPopularMoviesUrl);
flexApp.init(movieCard, runPostRender, "container", TMDB, runBeforeRender, 20);
flexApp.applyStylesheet("netflix.css");
