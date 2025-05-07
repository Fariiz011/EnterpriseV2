const apiKey = 'U5lqq7pbOjGrz8mu4rqGIJQPChxOEQLfGy7WZqFn'; // Ganti dengan API Key dari Cohere
const chatbox = document.getElementById("chatbox");

function appendMessage(message, sender) {
  const div = document.createElement("div");
  div.classList.add(sender);
  div.textContent = message;
  chatbox.appendChild(div);
}

async function sendMessage() {
  const userInput = document.getElementById("userInput").value;
  if (userInput.trim() === "") return;

  appendMessage(userInput, "user");
  document.getElementById("userInput").value = "";

  const response = await fetch("https://api.cohere.ai/v1/chat", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "command-r-plus", // model gratis dan bagus
      message: userInput
    }),
  });

  const data = await response.json();
  const botReply = data.text || "Maaf, saya tidak mengerti.";
  appendMessage(botReply, "bot");
}
