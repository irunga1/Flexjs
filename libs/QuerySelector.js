export const $ = (el) => {
    if (el.startsWith('#')) {
        return document.querySelector(el); // Retorna un único elemento para ID
    } else if (el.startsWith('.')) {
        return document.querySelectorAll(el); // Retorna una lista de nodos para clases
    }
    return null; // Si no es ni clase ni ID, retorna nul
}