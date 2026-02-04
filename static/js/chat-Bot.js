function showChatBot() {
  document.getElementById("chatBotModal").style.display = "block";
  console.log("ChatBot opened");
}

function closeChatBot() {
  document.getElementById("chatBotModal").style.display = "none";
}

let chatMessages = []

function enviarMensagem() {
  var input = document.getElementById("chat-input");
  var mensagem = input.value.trim();
  
  if (mensagem !== "") {
    chatMessages.push({ role: "user", content: mensagem });
    input.value = "";
    atualizarChat();

    //adicionar API-Escolher modelo
    fetch("/chatbot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ messages: chatMessages })
    })
    .then(response => response.json())
    .then(data => {
      chatMessages.push({ role: "assistant", content: data.reply });
      atualizarChat();
    })
    .catch(error => {
      console.error("Erro ao comunicar com o servidor:", error);
    });
  }
}

function atualizarChat() {
  var chatMessagesDiv = document.getElementById("chat-messages");
  chatMessagesDiv.innerHTML = "";

  chatMessages.forEach(msg => {
    var messageDiv = document.createElement("div");
    messageDiv.className = msg.role === "user" ? "messageUser" : "messageBot";
    messageDiv.textContent = msg.content;
    chatMessagesDiv.appendChild(messageDiv);
  });

  chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
}

