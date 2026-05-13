# LiteFlex

**LiteFlex** es un micro framework modular en JavaScript para construir interfaces conectadas a APIs usando HTML base minimo, componentes de vista y una capa simple de datos.

El framework organiza una aplicacion en cuatro piezas principales:

- **Core**: coordina la carga inicial, los estilos, los hooks y el render.
- **Modelos**: obtienen y normalizan datos desde una API o archivo local.
- **Vistas**: reciben datos normalizados y los pintan en un contenedor del DOM.
- **Hooks**: ejecutan logica antes y despues del render.

## Objetivo

LiteFlex permite crear paginas dinamicas con JavaScript puro sin depender de un build step obligatorio. Su proposito es ofrecer una estructura pequena y entendible para demos, prototipos o aplicaciones ligeras que consumen datos externos.

## Estructura del proyecto

```text
core/       Orquestacion principal del micro framework
models/     Modelos y adaptadores de datos
views/      Funciones de render para la interfaz
helper/     Hooks ejecutados antes y despues del render
css/        Hojas de estilo por vista o demo
data/       Datos locales reutilizables
libs/       Utilidades compartidas
main*.js    Puntos de entrada de cada demo
index*.html HTML minimo para iniciar cada pagina
```

## Ciclo de vida

El flujo principal de LiteFlex ocurre desde una instancia de `FlexJS`:

1. Se crea una instancia con una URL base y, opcionalmente, una hoja de estilos.
2. `FlexJS` espera el evento `DOMContentLoaded`.
3. Se muestra una capa temporal de carga con `blackout()`.
4. Se instancia el modelo indicado.
5. El modelo obtiene datos usando `fetch`.
6. `ApiModule` normaliza la respuesta en `results`.
7. Se ejecuta el hook previo al render.
8. La vista recibe los datos y pinta el contenido.
9. Se ejecuta el hook posterior al render.
10. Opcionalmente se agrega un boton para cargar/ver mas contenido.

## Core

El core principal esta en `core/Flex.js` y exporta la clase `FlexJS`.

### Constructor

```js
const flexApp = new FlexJS(baseUrl, css);
```

- `baseUrl`: URL usada por el modelo para solicitar datos.
- `css`: nombre opcional de una hoja ubicada en `css/`.

Cuando se entrega un archivo CSS, LiteFlex lo inyecta en el documento con `applyStylesheet()`.

### `init()`

```js
flexApp.init(
    renderView,
    afterRenderCallback,
    containerId,
    ModelClass,
    beforeRenderCallback,
    verMas
);
```

Parametros:

- `renderView`: funcion de vista que recibe los datos y el id del contenedor.
- `afterRenderCallback`: hook ejecutado despues de pintar la vista.
- `containerId`: id del elemento donde se renderiza el contenido.
- `ModelClass`: clase encargada de obtener los datos.
- `beforeRenderCallback`: hook ejecutado antes de pintar la vista.
- `verMas`: activa o desactiva el boton de ver mas.

### `init2()`

`init2()` permite iniciar una carga usando una URL diferente a la del constructor. Mantiene el mismo contrato de `init()`, pero recibe un parametro adicional `url2`.

### `applyStylesheet()`

```js
flexApp.applyStylesheet("netflix.css");
```

Agrega al documento una hoja de estilos desde la carpeta `css/`.

### `blackout()`

```js
flexApp.blackout(1000);
```

Muestra una capa de carga temporal mientras la aplicacion inicia.

## Capa de datos

La clase base para modelos esta en `models/ApiModule.js`.

```js
export class ApiModule {
    constructor(apiUrl = "") {
        this.url = apiUrl;
    }

    async getData() {
        const response = await fetch(this.url);
        const responseData = await response.json();
        return responseData;
    }
}
```

Los modelos concretos pueden extender `ApiModule` para reutilizar el mismo flujo de carga.

```js
import { ApiModule } from "./ApiModule.js";

export class TMDB extends ApiModule {
    constructor(apiUrl = "") {
        super(apiUrl);
    }
}
```

## Normalizacion de respuestas

`ApiModule.showData()` adapta diferentes respuestas al formato esperado por las vistas.

- Si la respuesta contiene la clave definida por `dataKey`, ese valor se asigna a `responseData.results`.
- Si no existe `results`, la respuesta completa se usa como `results`.
- La vista siempre recibe `responseData.results`.

Esto permite trabajar con APIs que devuelven arrays directamente o con APIs que envuelven los datos dentro de propiedades como `results`, `products`, `articles`, etc.

## Vistas

Una vista en LiteFlex es una funcion que recibe datos y el id de un contenedor.

```js
export const movieCard = (items = [], containerId) => {
    const container = document.getElementById(containerId);
    container.innerHTML = items.map((item) => `
        <article class="character-card">
            <h3>${item.title}</h3>
        </article>
    `).join("");
};
```

Contrato recomendado:

- Recibir un array u objeto normalizado.
- Buscar el contenedor por `containerId`.
- Renderizar el contenido dentro del contenedor.
- Mantener la logica visual dentro de `views/`.

## Hooks

Los hooks permiten ejecutar comportamiento antes o despues del render sin mezclarlo con la vista.

### Hook previo

```js
export const runBeforeRender = () => {
    console.log("Antes de renderizar");
};
```

### Hook posterior

```js
export const runPostRender = () => {
    document.querySelectorAll(".character-card").forEach((card) => {
        card.addEventListener("click", () => {
            console.log("Card seleccionada");
        });
    });
};
```

El hook posterior es util para agregar eventos, inicializar interacciones o actualizar elementos que dependen del DOM ya renderizado.

## Ejemplo de uso

```js
import { TMDB } from "./models/TMDB.js";
import { movieCard } from "./views/movieCard.js";
import { runPostRender } from "./helper/postRenderFn.js";
import { FlexJS } from "./core/Flex.js";
import { runBeforeRender } from "./helper/preRenderFn.js";
import { getPopularMoviesUrl } from "./models/TMDB.js";

const apiUrl = getPopularMoviesUrl();
const flexApp = new FlexJS(apiUrl, "netflix.css");

flexApp.init(
    movieCard,
    runPostRender,
    "container",
    TMDB,
    runBeforeRender,
    true
);
```

## Crear una pagina con LiteFlex

1. Crear un archivo HTML con un contenedor.

```html
<main id="container"></main>
<script type="module" src="./main.js"></script>
```

2. Crear o reutilizar un modelo en `models/`.
3. Crear una vista en `views/`.
4. Crear hooks opcionales en `helper/`.
5. Conectar todo desde un `main*.js` usando `FlexJS`.

## Demos incluidas

- `main.js`: personajes de Rick and Morty.
- `main2.js`: productos de Fake Store API.
- `main3.js`: peliculas populares de TMDB.
- `main4.js`: portada tipo streaming con TMDB.
- `main5.js`: noticias locales.
- `main7.js`: reproductor.

Entradas HTML disponibles:

- `index.html`
- `movies.html`
- `indexnews.html`
- `indexplayer.html`

## Convenciones

- Los puntos de entrada viven en archivos `main*.js`.
- Los modelos se guardan en `models/` y pueden extender `ApiModule`.
- Las vistas se guardan en `views/` y reciben `(items, containerId)`.
- Los hooks se guardan en `helper/`.
- Los estilos se guardan en `css/` y pueden cargarse desde `FlexJS`.

## Requisitos

LiteFlex usa modulos ES, por lo que debe ejecutarse desde un servidor local o un entorno que soporte `type="module"`.

Ejemplo con un servidor local:

```bash
npx live-server
```

Luego abrir el archivo HTML correspondiente desde el navegador.
