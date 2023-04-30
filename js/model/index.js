import { queryEl, hideEl, showEl } from "../helpers.js";
import { switchViewTo } from "../views.js";


// TEXT TO SPEECH Model

// Initialization
const xSpeech = {};

// Capture a Web Speech Synthesis Instance
xSpeech.synth = window.speechSynthesis || null;

// Voices available
xSpeech.voices = [];

// Select menu for voices
xSpeech.selectMenu = queryEl('#selectVoice');

// Pitch control
xSpeech.pitchRange = queryEl('#pitch');

// Rate control
xSpeech.rateRange = queryEl('#rate');

// Text Content
xSpeech.textBlock = queryEl('#textBlock');

// Run Button
xSpeech.runButton = queryEl('#runBtn');


// Populate the Select Element with Available voices
xSpeech.populateVoiceList = function () {
    // fetch voices
    xSpeech.voices = xSpeech.synth.getVoices();
    // loop through while creating an Option Element for the Select Element
    for(let i = 0; i < xSpeech.voices.length ; i++) {
        // create Option Element
        let option = document.createElement('option');
        // The name and language of the Voice
        option.textContent = xSpeech.voices[i].name + ' (' + xSpeech.voices[i].lang + ')';
        // Check if the current language is Default
        if(xSpeech.voices[i].default) {
            option.textContent += ' -- DEFAULT';
        }
        // Create attributes to store a Voice's specs
        option.setAttribute('data-lang', xSpeech.voices[i].lang);
        option.setAttribute('data-name', xSpeech.voices[i].name);
        // Add it to the Select Menu
        xSpeech.selectMenu.appendChild(option);
    }
};


// Searching and Saving Voices
xSpeech.work = function () {
    // If not Firefox
    xSpeech.populateVoiceList();
    // => Firefox doesn't support SpeechSynthesis.onvoiceschanged, so
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = xSpeech.populateVoiceList;
    }
};


// Now, Speak
xSpeech.speak = function (anyText) {
    // New Synthesis Instance
    let utterThis = new SpeechSynthesisUtterance(anyText);
    // What is the selected language in the SELECT Element
    let selectedOption = xSpeech.selectMenu.selectedOptions[0].getAttribute('data-name');
    // Loop through searching for the selected Language
    for(let i = 0; i < xSpeech.voices.length ; i++) {
      if(xSpeech.voices[i].name === selectedOption) {
        utterThis.voice = xSpeech.voices[i];
        break;
      }
    }
    // Apply the Pitch of Sound-Voice
    utterThis.pitch = xSpeech.pitchRange.value;
    // Apply the Speech Speed Rate
    utterThis.rate = xSpeech.rateRange.value;
    // Finally, Speak
    xSpeech.synth.speak(utterThis);
    
    // hide btn
    hideEl('#runBtnView');
    showEl('#ranBtnView');

    // In case
    // When the running Instance is done
    utterThis.onend = function() {
        // show btn
        showEl('#runBtnView');
        hideEl('#ranBtnView');
    }

    // When the running Instance is paused,
    utterThis.onpause = function(event) {
        // Get the current character to be spoken 
        let char = event.utterance.text.charAt(event.charIndex);
        // Log the character
        console.log('Speech paused at character ' + event.charIndex + ' of "' +
        event.utterance.text + '", which is "' + char + '".');
    }

    // When the running Instance is damaged/failed,
    utterThis.onerror = function() {
        switchViewTo('error');
    }

};


// Event Listeners
// Updating the Pitch of the Voice
xSpeech.pitchRange.onchange = function() {
    xSpeech.rateRange.textContent = pitch.value;
}

// Updating the Rate of the Voice
xSpeech.rateRange.onchange = function() {
    xSpeech.rateRange.textContent = rate.value;
}

// Speaking the text
xSpeech.runButton.onclick = function() {
    // Then blur the input box to hide the Keyboard on Mobiles
    xSpeech.textBlock.blur();
    // Speak if there is text
    if(xSpeech.textBlock.value)
    {
        try {
            xSpeech.speak(xSpeech.textBlock.value.trim());
        } catch (error) {
            switchViewTo('error');
        }
    }
}

// Ready for use...
export default xSpeech;
