import { queryEl, hideEl, showEl } from "./helpers.js";

// Views
const [
    introView, 
    startView, 
    helpView, 
    mainView, 
    errorView,
    settDataView,
    mainDataView,
    closeBtn
] = [
    '#introView', 
    '#startView', 
    '#helpView', 
    '#mainView', 
    '#errorView',
    '#settDataView',
    '#mainDataView',
    '#closeBtn'
].map(id => queryEl(id));

// Switch Views
export const switchViewTo = function(view) {
    switch (view) {
        case 'intro':
            // hide
            [startView, helpView, mainView, errorView].forEach(el => hideEl(el));
            // show
            showEl(introView);
            break;
        case 'start':
            // hide
            [introView, helpView, mainView, errorView].forEach(el => hideEl(el));
            // show
            showEl(startView);
            break;
        case 'help':
            // hide
            [introView, startView, mainView, errorView].forEach(el => hideEl(el));
            // show
            showEl(helpView);
            break;
        case 'main':
            // hide
            [introView, startView, helpView, errorView].forEach(el => hideEl(el));
            // show
            showEl(mainView);
            break;
        case 'error':
            // hide
            [introView, startView, helpView, mainView].forEach(el => hideEl(el));
            // show
            showEl(errorView);
            break;

        case 'open-settings':   
            // Go to Settings
            showEl(settDataView);
            // hide Input box
            hideEl(mainDataView);
            // Show Closing btn
            showEl(closeBtn);
            break;
        
        case 'close-settings':   
            // Hide Settings
            hideEl(settDataView);
            // Show Input box
            showEl(mainDataView);
            // Hide Closing btn
            hideEl(closeBtn);
            break;
    
        default:
            break;
    }
};