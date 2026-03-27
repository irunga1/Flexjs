export const $ = (selector) => {
    if (selector.startsWith('#')) {
        return document.querySelector(selector);
    } else if (selector.startsWith('.')) {
        return document.querySelectorAll(selector);
    }
    return null;
};
