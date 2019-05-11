const search_input = document.getElementById('search_input');
const search_form = document.getElementById('search-form')
const voice_output = document.getElementById('voice-output');
const voice_overlay = document.getElementById('voice-overlay');
const voice_start_aud = new Audio('/audio/main/search/voice-start.mp3');
const voice_end_aud = new Audio('/audio/main/search/voice-end.mp3');

window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;   // Idk why this says var

function voice_search() {
    if(window.webkitSpeechRecognition ) {
        voice_start_aud.play();

        voice_overlay.style.display = 'block';

        var rec = new SpeechRecognition();
        rec.lang = 'en-US';
        rec.interimResults = false;
        rec.start();
    
        rec.onresult = function(event) {
            voice_end_aud.play();
            var last = event.results.length -1;
            voice_output.innerHTML = event.results[last][0].transcript;
            setTimeout(function() {
                search_input.value = event.results[last][0].transcript;
                search_form.submit();
            }, 1100)
        }
    
        rec.onend = function() {
            setTimeout(function() {
                voice_overlay.style.display = 'none';
            }, 1100)
        }   
    }
}