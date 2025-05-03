export const $ = (el) => {
    if (el.startsWith('#')) {
        return document.querySelector(el); 
    } else if (el.startsWith('.')) {
        return document.querySelectorAll(el); 
    }
    return null; 
}