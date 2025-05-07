const apiKey = '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; // Ganti dengan API Key OpenRouter Anda
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
  document.getElementById("userInput").value = ""; // Kosongkan input

  const response = await fetch('https://api.openrouter.ai/v1/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      prompt: userInput,
      max_tokens: 100
    })
  });

  const data = await response.json();
  const botReply = data?.choices[0]?.text || "Maaf, saya tidak mengerti.";
  appendMessage(botReply, "bot");
}