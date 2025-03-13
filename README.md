# FlexJS - Mini Framework JS

FlexJS es un mini framework en JavaScript diseñado para manejar vistas dinámicas, consumo de APIs y eventos sin depender de librerías externas. Su arquitectura modular permite reutilizar funciones, vistas y facilitar la gestión de datos en aplicaciones web.

## Características

- Consumo de APIs con un módulo base reutilizable.
- Gestión de vistas dinámicas para actualizar el DOM fácilmente.
- Sistema de eventos que facilita la interacción con elementos de la UI.
- Selector de elementos similar a jQuery para simplificar el acceso al DOM.
- Escalabilidad, permitiendo agregar nuevas vistas y modelos sin modificar el core.

## Estructura del Proyecto

/project-root  
│── /core  
│   ├── Flex.js  # Clase principal que gestiona la aplicación  
│── /models  
│   ├── ApiModule.js  # Módulo base para manejar peticiones API  
│   ├── RickAndMorty.js  # Implementación de ApiModule (Ejemplo de uso)  
│── /views  
│   ├── viewName.js  # Vista principal para renderizar datos  
│   ├── viewNameAlt.js  # Vista alternativa  
│── /helper  
│   ├── nfm.js  # Módulo para manejar eventos en la UI  
│── /libs  
│   ├── QuerySelector.js  # Selector de elementos con funciones optimizadas  
│── index.html  # Página principal  
│── main.js  # Punto de entrada del framework  

## Instalación y Uso

1. Clona el repositorio:  

   git clone https://github.com/tuusuario/FlexJS.git  
   cd FlexJS  

2. Usa un servidor local como Live Server o abre index.html en el navegador.  

## Ejemplo de Uso

import { FlexJS } from "./core/Flex.js";  
import { RickAndMorty } from "./models/RickAndMorty.js";  
import { viewName } from "./views/viewName.js";  
import { nfm1 } from "./helper/nfm.js";  

const app = new FlexJS("https://rickandmortyapi.com/api/character");  
app.init(viewName, nfm1, "container", RickAndMorty);  

## Extender el Framework

Para consumir otra API, simplemente crea un nuevo modelo extendiendo ApiModule y pásalo a FlexJS.  

import { ApiModule } from "./models/ApiModule.js";  

export class MyApi extends ApiModule {  
    constructor(url = "") {  
        super(url);  
    }  
}  

Luego usa MyApi en FlexJS:  

const app = new FlexJS("https://miapi.com/data");  
app.init(miVista, miEvento, "container", MyApi);  

## Contribución

Si deseas contribuir, abre un issue o un pull request en el repositorio.  

## Licencia

Este proyecto se distribuye bajo la licencia MIT.  
