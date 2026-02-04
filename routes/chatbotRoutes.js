const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const filePath = path.join(__dirname, "..", "config", "chatbot-faq.json");
const faqData = JSON.parse(
  fs.readFileSync(filePath, "utf-8")
);

function responderComFaq(mensagem) {
  const msg = mensagem.toLowerCase();

  for (const faq of faqData.faqs) {
    const match = faq.keywords.some(keyword =>
      msg.includes(keyword.toLowerCase())
    );

    if (match) {
      return faq.respostas[
        Math.floor(Math.random() * faq.respostas.length)
      ];
    }
  }

  return null;
}

router.post("/", async (req, res) => {
  try {
    const mensagens = req.body.messages;

    if (!mensagens || mensagens.length === 0) {
      return res.status(400).json({ error: "Nenhuma mensagem enviada" });
    }

    const ultimaMensagem = mensagens[mensagens.length - 1].content;
    console.log("Mensagem recebida:", ultimaMensagem);
    //**funcao que tenta usar o faq */
    const respostaFaq = responderComFaq(ultimaMensagem);

    if (respostaFaq) {
      console.log("Respondido via FAQ");
      return res.json({
        reply: respostaFaq,
        source: "faq"
      });
    }
    //personalidade da IA nao mexer 
    const systemPrompt = `
    Você é um chatbot de ajuda do sistema.
    Responda sempre em português.
    Seja claro, direto e educado.
    `;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: systemPrompt
            },
            {
              role: "user",
              content: `[RESPONDA EM PORTUGUÊS] ${ultimaMensagem}`
            }
          ],
          temperature: 0.4,
          max_tokens: 100
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error(" Erro da API:", errorText);
      throw new Error(`Erro da API: ${response.status}`);
    }

    const data = await response.json();
    const respostaBot = data.choices[0].message.content;

    console.log("API foi usada");

    res.json({
      reply: respostaBot,
      source: "ia"
    });

  } catch (error) {
    console.error(" Erro no chatbot:", error.message);
    res.status(500).json({
      error: "Erro ao processar mensagem",
      details: error.message
    });
  }
});

module.exports = router;
