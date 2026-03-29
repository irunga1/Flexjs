# LiteFlex

**LiteFlex** es un micro-framework en JavaScript modular orientado al ciclo de vida del render y a la integracion de datos, vistas y comportamiento en aplicaciones basadas en APIs.

Su objetivo no es competir directamente con React, Vue o Angular, sino ofrecer una base ligera para construir pantallas dinamicas con un flujo claro:

1. obtener datos
2. prepararlos
3. renderizar una vista
4. ejecutar logica antes y despues del render

## Idea central

LiteFlex separa la aplicacion en piezas simples:

- `core/`: coordina el flujo general
- `models/`: encapsulan el acceso a datos
- `views/`: renderizan la interfaz
- `helper/`: ejecutan logica antes y despues del render

Esto permite reutilizar la misma base para distintos dominios, por ejemplo:

- personajes
- productos
- peliculas
- catalogos
- dashboards simples

## Como funciona

El flujo principal de LiteFlex es este:

1. `main*.js` define la URL, el modelo, la vista y los hooks.
2. `FlexJS` espera a que el DOM este listo.
3. El modelo obtiene los datos desde una API.
4. `ApiModule` normaliza la respuesta.
5. Se ejecuta `preRender`.
6. La vista genera el HTML.
7. Se ejecuta `postRender` para eventos, interacciones o logica adicional.

## Estructura base

- `core/Flex.js`: orquestador principal.
- `models/ApiModule.js`: clase base para consumo de APIs.
- `models/`: modelos concretos como `TMDB`, `FakeStore` o `RickAndMorty`.
- `views/`: funciones de render para cada tipo de interfaz.
- `helper/preRenderFn.js`: logica previa al render.
- `helper/postRenderFn.js`: logica posterior al render.
- `main.js`, `main2.js`, `main3.js`, `main4.js`: puntos de entrada segun el ejemplo.

## Instrucciones de uso

### 1. Abrir el proyecto

Abre uno de los HTML del proyecto en un servidor local. Por ejemplo, si usas Live Server, puedes iniciar desde:

- `index.html`
- `index-netflix.html`
- `movies.html`

### 2. Elegir un punto de entrada

Cada archivo `main*.js` conecta una API con una vista distinta.

Ejemplos:

- `main.js`: ejemplo con Rick and Morty
- `main2.js`: ejemplo con FakeStore
- `main4.js`: ejemplo con TMDB

## Ejemplo de uso

```js
import { TMDB } from "./models/TMDB.js";
import { movieCard } from "./views/movieCard.js";
import { runPostRender } from "./helper/postRenderFn.js";
import { FlexJS } from "./core/Flex.js";
import { runBeforeRender } from "./helper/preRenderFn.js";

const apiUrl = "TU_API_AQUI";
const flexApp = new FlexJS(apiUrl);

flexApp.init(
    movieCard,
    runPostRender,
    "container",
    TMDB,
    runBeforeRender
);

flexApp.applyStylesheet("netflix.css");
```

### 3. Crear un flujo nuevo

Para usar LiteFlex con otra API:

1. crea o reutiliza un modelo en `models/`
2. crea una vista en `views/`
3. define la URL en un `main*.js`
4. llama a `new FlexJS(url)`
5. inicializa con `init(...)`

## Que puedes personalizar

- la API de origen
- la vista que renderiza los datos
- el contenedor donde se pinta el HTML
- la hoja de estilos
- la logica previa al render
- la logica posterior al render

## Casos donde encaja bien

- catalogos de productos
- listados de peliculas o series
- galerias de contenido
- demos de APIs REST
- proyectos academicos
- prototipos modulares en JavaScript puro

## Alcance del proyecto

LiteFlex no esta pensado solo para pintar listas con `forEach`. Su propuesta es ofrecer un pipeline reutilizable para coordinar datos, render e interaccion.

Los hooks de `preRender` y `postRender` permiten extender el comportamiento para:

- eventos
- peticiones adicionales
- transformaciones
- logica de interfaz
- enriquecimiento del DOM

## Futuras mejoras sugeridas

- manejo formal de errores
- estados de carga
- sistema de estado global
- actualizacion parcial del DOM
- routing
- paginacion y filtros
- componentes mas reutilizables
