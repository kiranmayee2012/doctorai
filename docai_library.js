
function scrollToLastGPT(inputElement) {
    const chatmessages = document.getElementById("chat-messages");
    const patient = document.getElementById("patient_input");
    const ask_button = document.getElementById("ask-button");

    chatmessages.scrollTop = chatmessages.scrollHeight;
    patient.disabled = false;
    ask_button.disabled = false;
    patient.focus();
}


function getHeaders(){
    const apiKey = "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";

    return HEADERS = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
    };
}

function getBody(conversation,message){
    return {
            model: "gpt-3.5-turbo",
            temperature: 0,
            top_p: 0,
            messages: conversation.concat([
                { role: 'system', content: getResponsibolities() },
                { role: 'user', content: message}
            ])
        };
}


function getResponsibolities()
{
    return "You are Dr. Kiranmayee T M a general physician in Bengaluru.\
  Assist only for medical related concerns.\
  Folow the sequence.\
        1.Introduce yourself with you name and location. \
        2.Collect mandatory informations name, gender, and age from the patient. \
        3.Collect mandatory informations weight and height from the patient.\
        4.Once patient provides mandatory information, ask the questions related to problem.\
        5.Understand the problem and suggest medicines.\
  Things you should remember. \
        1.Your response shouldn't exceed 3 statements.\
        2.Ask one question at a time related to problem.\
        3.Don't introduce yourself multiple times.\
        4.Don't show lengthy desclaimers.\
        5.Don't say that you are an AI model.\
        6.Prescribe only Indian brand medicines.\
        7.Suggest Ayurvedic medicines.\
        8.Suggesthome remedies.\
        9.When non-medical questions arise, respond with, \"Please ask only medical-related questions; I'm a doctor.\" \
        10.While suggesting medicines consider existing health issues"
    
}


function textToSpeech(text_to_process) {
  return new Promise((resolve, reject) => {
    const voiceId = 'jBpfuIE2acCO8z3wKNLl';
    const apiKey = '7b07b601d142f608d5af8c600a66a7e9';
    const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
    const headers = {
      'accept': 'audio/mpeg',
      'xi-api-key': apiKey,
      'content-Type': 'application/json'
    };

    const requestbody = {
      text: text_to_process,
      model_id: 'eleven_monolingual_v1',
      voice_settings: {
        stability: 0.6,
        similarity_boost: 0.85,
      }
    };

    const options = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestbody  )
    };

    fetch(url,options)
    .then(response => {
      if(response.ok) {
        return response.blob();
      } else {
        throw new Error('Error: ' + response.statusText);
      }
    })
    .then(audioData => {
      // Create an object URL from the audioData
      const audioUrl = URL.createObjectURL(audioData);

      // Create an Audio element
      const audioElement = new Audio(audioUrl);

      // Play the audio
      audioElement.play();

      // Listen for the 'ended' event
      audioElement.addEventListener('ended', () => {
        // Resolve the Promise when audio playback is complete
        resolve();
      });
    })
    .catch(error => {
      reject(error);
    });
  });
}




