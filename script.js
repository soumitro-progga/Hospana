
function sendMessage() {
  let userInput = document.getElementById("user-input").value;
  if (userInput.trim() === "") {
    return;
  }

  // Display user's message
  let chatWindow = document.getElementById("chat-window");
  let userMessage = document.createElement("div");
  userMessage.textContent = "You: " + userInput;
  chatWindow.appendChild(userMessage);

  // Send the input to the backend and get the response
  fetch(`/api/guitar-bot?input=${encodeURIComponent(userInput)}`)
    .then(response => response.json())
    .then(data => {
      // Display bot's message
      let botMessage = document.createElement("div");
      botMessage.classList.add("bot-message");
      botMessage.textContent = "Bot: " + data.response;
      chatWindow.appendChild(botMessage);

      // Scroll to the bottom of the chat window
      chatWindow.scrollTop = chatWindow.scrollHeight;

      // Clear the input field
      document.getElementById("user-input").value = "";
    })
    .catch(error => console.error('Error:', error));
}
