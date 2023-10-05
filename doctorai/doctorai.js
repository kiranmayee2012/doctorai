
const form = document.getElementById("chat-form");
const patient_input = document.getElementById("patient_input");
const chatmessages = document.getElementById("chat-messages");
const ask_button = document.getElementById("ask-button");

let conversation = [];
const apiURL = "https://api.openai.com/v1/chat/completions";
let audiores;

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const message = patient_input.value;
  patient_input.value = "";
  patient_input.disabled = true;
  ask_button.disabled = true;
  
  chatmessages.innerHTML += `<div class="message patient-message">
  <img src="./icons/patient.png" alt="user icon"> <span>${message}</span>
  </div>`;

  const response = await axios.post(apiURL,getBody(conversation,message),{ headers: getHeaders()});
  let chatbotResponse = response.data.choices[0].message.content;
  conversation.push({ role: 'assistant', content: chatbotResponse });
  
  chatmessages.innerHTML += `<div class="message chatgpt-message">
  <img src="./icons/doctor.png" alt="bot icon"> <span>${chatbotResponse}</span>
  </div>`;

  textToSpeech(chatbotResponse)
  .then(() => {
    console.log('Audio playback completed.');
    scrollToLastGPT();
  })
  .catch(error => {
    console.error(error);
  });
  // scrollToLastGPT();
});










