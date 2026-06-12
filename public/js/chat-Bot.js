const corBotPadrao = '#e9ecef';
const corUsuarioPadrao = '#0d6efd';
let corBotAtual = corBotPadrao;
let corUsuarioAtual = corUsuarioPadrao;

function showChatBot() {
  document.getElementById("chatBotModal").style.display = "block";
  console.log("ChatBot opened");
  carregarCores();
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
    
    // ADICIONE ISSO AQUI:
    if (msg.role === "user") {
      messageDiv.style.backgroundColor = corUsuarioAtual;
    } else {
      messageDiv.style.backgroundColor = corBotAtual;
    }
    
    chatMessagesDiv.appendChild(messageDiv);
  });
  
  chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight;
}

function toggleMenuCores() {
  const menu = document.getElementById('menuCores');
  menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
}

function trocarCores() {
  corBotAtual = document.getElementById('corBot').value;
  corUsuarioAtual = document.getElementById('corUsuario').value;
  
  const baloesBot = document.querySelectorAll('.messageBot');
  baloesBot.forEach(function(balao) {
    balao.style.backgroundColor = corBotAtual; 
  })
  
  const baloesUser = document.querySelectorAll('.messageUser');
  baloesUser.forEach(function(balao) {
    balao.style.backgroundColor = corUsuarioAtual;
  })
}

function carregarCores() {
  const inputCorBot = document.getElementById('corBot');
  const inputCorUsuario = document.getElementById('corUsuario');
  
  corBotAtual = inputCorBot.value;
  corUsuarioAtual = inputCorUsuario.value;
  
  const baloesBot = document.querySelectorAll('.messageBot');
  baloesBot.forEach(function(balao) {
    balao.style.backgroundColor = corBotAtual; 
  })
  
  const baloesUser = document.querySelectorAll('.messageUser');
  baloesUser.forEach(function(balao) {
    balao.style.backgroundColor = corUsuarioAtual;
  })
}