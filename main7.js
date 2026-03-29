import { FlexJSLocal } from "./core/Flex2.js";
import { playerView } from "./views/playerView.js";
import { runBeforeRenderPlayer } from "./helper/preRenderFn5.js";
import { runPostRenderPlayer } from "./helper/postRenderFn5.js";

const initialState = {
    movie: {
        title: "Big Buck Bunny",
        year: "2008",
        genre: "Animacion",
        duration: "9 min",
        description: "MVP minimo para ModularFlix usando el reproductor nativo del navegador con un archivo mp4 publico.",
        poster: "https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
    }
};

const playerApp = new FlexJSLocal(initialState);
playerApp.init(playerView, runPostRenderPlayer, "container", runBeforeRenderPlayer);
playerApp.applyStylesheet("player.css");
