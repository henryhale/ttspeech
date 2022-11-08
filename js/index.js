import { queryEl, hideEl, showEl } from "./helpers.js";
import { switchViewTo } from "./views.js";
import app from "./model/index.js";


// Buttons
const [
    // Start view Button
    startBtn,
    // Main view Button
    mainBtn,
    // Open Settings Button
    settingsBtn,
    // Close Settings Button
    closeBtn
] = ['#startBtn', '#mainBtn', '#settBtn', '#closeBtn'].map(id => queryEl(id));


// Show Intro with Help
startBtn.addEventListener('click', function () {
   // help & settings
   switchViewTo('help');
});

// Main View
mainBtn.addEventListener('click', function () {
    // Using Speech
    switchViewTo('main');
});

// Settings View
settingsBtn.addEventListener('click', function () {
    // toggle
    switchViewTo('open-settings');
    // hide this btn
    hideEl(settingsBtn);
});

// Hide Settings View
closeBtn.addEventListener('click', function () {
    // toggle
    switchViewTo('close-settings');
    // hide this btn
    showEl(settingsBtn);
});


// When Everything is loaded
window.addEventListener('DOMContentLoaded', function () {

    // Hide loader & switch to start
    switchViewTo('start');
    // Check for error
    if (app.synth == null || app.synth == 'undefined') {
        // Go to Error page
        switchViewTo('error');
    } else {
        // Fetch Voices
        app.work();
    }

    // Clear input
    app.textBlock.value = '';

}, false);


