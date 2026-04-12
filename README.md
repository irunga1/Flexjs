# LiteFlex

**LiteFlex** es un microframework experimental en JavaScript modular para construir interfaces conectadas a APIs con la menor cantidad posible de HTML fijo.

La idea central es simple: desde un `main*.js` defines datos, vista, hooks y estilos; el core se encarga de coordinar el flujo de carga y render.

## Que es hoy

LiteFlex ya resuelve un pipeline real:

1. toma una URL base
2. obtiene datos desde una API o archivo local
3. normaliza la respuesta
4. ejecuta hooks antes y despues del render
5. pinta una vista
6. aplica estilos
7. puede mostrar una capa de carga inicial con `blackout()`

No busca competir con React, Vue o Angular. Su propuesta es ofrecer una base ligera, entendible y extensible para apps pequeñas o medianas construidas con JavaScript puro.

## Filosofia

- poco HTML base
- logica centralizada en `main*.js`
- vistas desacopladas
- modelos separados del render
- hooks para extender comportamiento
- estructura simple, sin build step obligatorio

## Estructura

- `core/`: orquestacion principal del framework
- `models/`: acceso y normalizacion de datos
- `views/`: render de interfaces
- `helper/`: hooks de pre y post render
- `css/`: estilos por pagina o demo
- `main*.js`: puntos de entrada
- `index*.html`: cascaras minimas para arrancar cada demo

## Flujo actual

El flujo principal de LiteFlex es:

1. un `main*.js` crea una instancia de `FlexJS`
2. `FlexJS` espera `DOMContentLoaded`
3. opcionalmente muestra `blackout()`
4. crea una instancia del modelo
5. el modelo obtiene datos con `fetch`
6. `ApiModule` normaliza `results`
7. se ejecuta el hook previo
8. la vista pinta el contenido
9. se ejecuta el hook posterior

## Core actual

En [core/Flex.js](/home/irunga/nodeproyects/liveserver/Modularjs/core/Flex.js) hoy tienes:

- `constructor(baseUrl, css)`: guarda la URL base y puede cargar un stylesheet
- `init(...)`: flujo inicial de carga y render
- `init2(...)`: segunda via para cargas posteriores con otra URL
- `applyStylesheet(name)`: inyecta una hoja de estilos
- `blackout(duration)`: muestra una capa negra temporal mientras arranca la vista

## Capa de datos

En [models/ApiModule.js](/home/irunga/nodeproyects/liveserver/Modularjs/models/ApiModule.js):

- `getData()` hace la peticion
- `showData(...)` normaliza la respuesta
- si existe `dataKey`, mueve ese contenido a `results`
- luego delega el render a la vista

Esto permite reutilizar la misma base con APIs que no siempre responden con la misma estructura.

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
    runBeforeRender
);
```

## Demos actuales

- `main.js`: Rick and Morty
- `main2.js`: FakeStore
- `main3.js`: peliculas con TMDB
- `main4.js`: portada tipo streaming con TMDB
- `main5.js`: noticias locales
- `main7.js`: reproductor

HTML de entrada disponibles:

- `index.html`
- `movies.html`
- `indexnews.html`
- `indexplayer.html`

## Lo que ya lo hace parecer un microframework

- tiene un core reconocible
- tiene una API de inicializacion propia
- separa datos, render y hooks
- soporta distintas fuentes de datos
- ya tiene convenciones de estructura
- permite reutilizar la misma arquitectura en varias demos

En otras palabras: ya no es solo un conjunto de scripts. Ya tiene identidad de framework pequeno.

## Lo que todavia le falta

Para que LiteFlex se sienta mas claramente como microframework, yo diria que faltan estas piezas:

### 1. Un contrato de render mas claro

Hoy varias vistas escriben directo en el DOM con `innerHTML`.

Eso funciona, pero limita:

- scroll infinito
- append de contenido
- re-render parcial
- composicion de vistas

Lo ideal seria que las vistas:

- devuelvan markup
- o acepten un modo: `replace` / `append`

### 2. Una sola API para cargar y recargar

Ahora `init()` e `init2()` sirven para explorar, pero a futuro convendria una API mas clara, por ejemplo:

- `init(...)`
- `load(url, options)`
- `append(url, options)`

o un unico metodo con modos.

### 3. Estado minimo interno

Para scroll infinito o paginacion necesitas que el core pueda recordar:

- URL actual
- pagina actual
- si ya esta cargando
- si ya no hay mas resultados
- modo de insercion

No hace falta un gran store global, pero si un estado minimo por instancia.

### 4. Manejo de errores y loading mas formal

Ya existe `blackout()`, lo cual es un buen paso, pero faltaria estandarizar:

- errores de red
- respuestas vacias
- estados de carga por vista
- fallback visual

### 5. Convenciones mas estables

Seria bueno definir con claridad:

- que debe hacer un modelo
- que debe recibir una vista
- que parametros reciben los hooks
- cuando usar `init` y cuando cargas sucesivas

Eso vuelve el framework mas facil de extender.

### 6. Nombres y superficie publica

Si quieres que madure, conviene cuidar mas la API publica:

- nombres coherentes
- menos metodos duplicados
- parametros mas predecibles

Ejemplo: `init2()` es util para experimentar, pero a largo plazo un nombre semantico como `loadMore()` probablemente comunica mejor.

### 7. Documentar la arquitectura como producto

El README ya puede explicar:

- que problema resuelve
- cual es el ciclo de vida
- como crear una vista nueva
- como crear un modelo nuevo
- que partes son estables y cuales experimentales

Eso es importante porque un framework no solo es codigo: tambien es convencion.

## Ruta sugerida

Si quieres seguir llevandolo a microframework sin hacerlo pesado, yo seguiria este orden:

1. definir un contrato de vista con `replace` y `append`
2. separar mejor carga inicial y cargas sucesivas
3. agregar estado minimo por instancia
4. formalizar loading y error
5. limpiar nombres de la API publica

## Conclusion

LiteFlex ya esta en una zona interesante: todavia es pequeno, pero ya tiene una arquitectura repetible y una idea clara de uso.

Mi lectura honesta es esta:

- como experimento modular, ya funciona
- como microframework personal, practicamente ya es uno
- para sentirse mas solido, le falta cerrar mejor la API de render, recarga y estado
