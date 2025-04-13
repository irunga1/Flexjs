 ⚡ LiteFlex - Mini Framework Modular para APIs REST

**LiteFlex** es un **mini framework en JavaScript puro** diseñado para facilitar el consumo de APIs REST y el renderizado dinámico de datos en el navegador. Su arquitectura modular permite separar responsabilidades y reutilizar lógica de forma simple y escalable.

Aunque el ejemplo incluido utiliza la **API de Rick and Morty**, LiteFlex es completamente adaptable a **cualquier API pública o privada** que devuelva datos en formato JSON.

## 🧩 ¿Qué es LiteFlex?

Un micro-framework ligero y extensible que permite:

- Conectar a cualquier API.
- Renderizar los datos mediante funciones de vista personalizadas.
- Aplicar lógica antes y después del renderizado.
- Usar un flujo claro y modular en JavaScript moderno (ES6+).

## 👀 Ejemplo: Rick and Morty

Este proyecto viene con un ejemplo que utiliza la [Rick and Morty API](https://rickandmortyapi.com/), mostrando personajes mediante tarjetas animadas. Este ejemplo puede ser fácilmente reemplazado por cualquier otra fuente de datos.

## 📁 Estructura del proyecto


## ⚙️ ¿Cómo funciona?

1. `FlexJS` gestiona el flujo general al cargar el DOM.
2. Un modelo (como `RickAndMorty`) extiende de `ApiModule` y maneja las peticiones.
3. Una vista (`viewName` o `viewNameAlt`) define cómo mostrar los datos.
4. Se ejecutan funciones opcionales antes (`prefn`) y después (`nfm1`) del renderizado para personalización adicional.

## 🧪 Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript ES6+ (con módulos)
- APIs REST externas (ejemplo: Rick and Morty API)

## ⚡ Características

- **Modular y extensible**: fácilmente adaptable a otras APIs o estructuras de datos.
- **Sin dependencias externas**: 100% JavaScript puro.
- **Reutilizable**: define tus propios modelos, vistas y lógica.
- **Minimalista y claro**: ideal para prácticas o prototipos rápidos.

## 📦 Cómo usar LiteFlex

1. Clona o descarga el proyecto.
2. Abre `index.html` en tu navegador.
3. Modifica `main.js` para apuntar a otra API si lo deseas.
4. Cambia vistas, modelos o helpers según tu necesidad.

## ✏️ Personalización

- Reemplaza `RickAndMorty.js` por otro modelo que apunte a tu API.
- Crea una vista personalizada en `views/`.
- Agrega lógica adicional en los helpers para animaciones, eventos, etc.

## 🛠️ Ideas para futuras mejoras

- Integración con paginación.
- Filtros o búsqueda.
- Soporte para múltiples modelos en una misma vista.
- Compatibilidad con componentes reutilizables.

