// Views
var introView = document.getElementById('introView');
var startView = document.getElementById('startView');
var helpView = document.getElementById('helpView');
var mainView  = document.getElementById('mainView');
var errorView = document.getElementById('errorView');
// Switch Views
var switchViewTo = function(view) {
    switch (view) {
        case 'intro':
            // hide
            startView.style.display = 'none';
            helpView.style.display = 'none';
            mainView.style.display = 'none';
            errorView.style.display = 'none';
            // show
            introView.style.display = 'block';
            break;
        case 'start':
            // hide
            introView.style.display = 'none';
            helpView.style.display = 'none';
            mainView.style.display = 'none';
            errorView.style.display = 'none';
            // show
            startView.style.display = 'block';
            break;
        case 'help':
            // hide
            introView.style.display = 'none';
            startView.style.display = 'none';
            mainView.style.display = 'none';
            errorView.style.display = 'none';
            // show
            helpView.style.display = 'block';
            break;
        case 'main':
            // hide
            introView.style.display = 'none';
            startView.style.display = 'none';
            helpView.style.display = 'none';
            errorView.style.display = 'none';
            // show
            mainView.style.display = 'block';
            break;
        case 'error':
            // hide
            introView.style.display = 'none';
            startView.style.display = 'none';
            helpView.style.display = 'none';
            mainView.style.display = 'none';
            // show
            errorView.style.display = 'block';
            break;
    
        default:
            break;
    }
};

// Buttons
// Start view Button
var startBtn = document.getElementById('startBtn');
// Main view Button
var mainBtn = document.getElementById('mainBtn');
// Open Settings Button
var settingsBtn = document.getElementById('settBtn');
// Close Settings Button
var closeBtn = document.getElementById('closeBtn');
// listener
startBtn.addEventListener('click',function () {
   // help & settings
   switchViewTo('help');
});
// listener
mainBtn.addEventListener('click',function () {
    // Using Speech
    switchViewTo('main');
});
// listener
settingsBtn.addEventListener('click',function () {
    // Go to Settings
    document.getElementById('settDataView').style.display = 'block';
    // hide Input box
    document.getElementById('mainDataView').style.display = 'none';
    // Show Closing btn
    document.getElementById('closeBtn').style.display = 'block';
    // hide this btn
    settingsBtn.style.display = 'none';
});
// listener
closeBtn.addEventListener('click',function () {
    // Go to Settings
    document.getElementById('settDataView').style.display = 'none';
    // hide Input box
    document.getElementById('mainDataView').style.display = 'block';
    // Show Closing btn
    document.getElementById('closeBtn').style.display = 'none';
    // hide this btn
    settingsBtn.style.display = 'block';
});




// TEXT TO SPEECH

// New object
var xSpeech = new Object();
// Capture a Web Speech Synthesis Instance
xSpeech.synth = window.speechSynthesis || null;
// Voices available
xSpeech.voices = [];
// Select menu for voices
xSpeech.selectMenu = document.querySelector('#selectVoice');
// Pitch control
xSpeech.pitchRange = document.querySelector('#pitch');
// Rate control
xSpeech.rateRange = document.querySelector('#rate');
// Text Content
xSpeech.textBlock = document.querySelector('#textBlock');
// Run Button
xSpeech.runButton = document.querySelector('#runBtn');
// Populate the Select Element with Available voices
xSpeech.populateVoiceList = function () {
    // fetch voices
    xSpeech.voices = xSpeech.synth.getVoices();
    // loop through while creating an Option Element for the Select Element
    for(i = 0; i < xSpeech.voices.length ; i++) {
        // create Option Element
        var option = document.createElement('option');
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
    var utterThis = new SpeechSynthesisUtterance(anyText);
    // What is the selected language in the SELECT Element
    var selectedOption = xSpeech.selectMenu.selectedOptions[0].getAttribute('data-name');
    // Loop through searching for the selected Language
    for(i = 0; i < xSpeech.voices.length ; i++) {
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
    document.querySelector('#runBtnView').style.display = 'none';
    document.querySelector('#ranBtnView').style.display = 'block';
    // In case
    // When the running Instance is done
    utterThis.onend = function() {
        // show btn
        document.querySelector('#runBtnView').style.display = 'block';
        document.querySelector('#ranBtnView').style.display = 'none';
    }
    // When the running Instance is paused,
    utterThis.onpause = function(event) {
        // Get the current character to be spoken 
        var char = event.utterance.text.charAt(event.charIndex);
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
    if(xSpeech.textBlock.value && xSpeech.textBlock.value.trim().length !== 0 && typeof xSpeech.textBlock.value !== 'undefined')
    {
        try {
            xSpeech.speak(xSpeech.textBlock.value.trim());
        } catch (error) {
            switchViewTo('error');
        }
    }
}



// When Everything is loaded
window.addEventListener('load',function(){
    // Hide loader & switch to start
    switchViewTo('start');
    // Check for error
    if (xSpeech.synth == null || xSpeech.synth == 'undefined') {
        // Go to Error page
        switchViewTo('error');
    } else {
        // Fetch Voices
        xSpeech.work();
    }
    // Clear input
    xSpeech.textBlock.value = '';
    
},false);













