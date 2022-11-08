// Select DOM element using any selector
export function queryEl(selector) {
    return document.querySelector(selector);
}

// Select group elements  
export function queryAllEl(selector) {
    return document.querySelectorAll(selector);
}

// Hide or Show an ELement using style's display 
let tmp;
function hideShow(el, flag) {
    if (el?.style) {
        el.style.display = flag ? 'block' : 'none';
    } else {
        tmp = queryEl(el);
        if (tmp) hideShow(tmp, flag);
    }
}

// Show Element
export function showEl(el) {
    hideShow(el, 1);
}

// Hide Element
export function hideEl(el) {
    hideShow(el, 0);
}