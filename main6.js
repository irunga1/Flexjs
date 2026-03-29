import { FlexJSLocal } from "./core/Flex2.js";
import { localFormView } from "./views/localFormView.js";
import { runBeforeRenderLocal } from "./helper/preRenderFn4.js";
import { runPostRenderLocal } from "./helper/postRenderFn4.js";

const initialState = {
    statusMessage: "Este ejemplo renderiza y actualiza contenido local sin modelos de API.",
    notes: [
        {
            title: "Documentar Flex2",
            description: "Explicar que este modo sirve para formularios, dashboards locales y pantallas sin fetch."
        },
        {
            title: "Probar componentes locales",
            description: "Usar la misma base del framework para UI interactivas que viven solo en el navegador."
        }
    ]
};

const flexLocalApp = new FlexJSLocal(initialState);
flexLocalApp.init(localFormView, runPostRenderLocal, "container", runBeforeRenderLocal);
flexLocalApp.applyStylesheet("local.css");
