const express = require('express');
const router = express.Router();
const HUGGING_FACE_API = process.env.HUGGINGFACE_MODEL_URL;
const API_KEY = process.env.HUGGINGFACE_API_KEY;

// Rota POST /chatbot
router.post('/', async (req, res) => {
  try {
    const mensagens = req.body.messages;
    
    if (!mensagens || mensagens.length === 0) {
      return res.status(400).json({ error: 'Nenhuma mensagem enviada' });
    }
    
    const ultimaMensagem = mensagens[mensagens.length - 1].content;
    
    console.log('Mensagem recebida:', ultimaMensagem);
    
    const response = await fetch(HUGGING_FACE_API, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: ultimaMensagem,
        parameters: {
          max_length: 100,
          temperature: 0.7
        }
      })
    });
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error('Erro da API:', errorData);
      throw new Error(`Erro na API do Hugging Face: ${response.status}`);
    }
    
    const data = await response.json();
    
    console.log('Resposta da API:', data);
    
    let respostaBot = '';
    
    if (Array.isArray(data) && data.length > 0) {
      respostaBot = data[0].generated_text || 'Desculpe, não entendi.';
    } else if (data.generated_text) {
      respostaBot = data.generated_text;
    } else if (data[0] && data[0].generated_text) {
      respostaBot = data[0].generated_text;
    } else {
      respostaBot = 'Desculpe, ocorreu um erro ao processar sua mensagem.';
    }
    
    res.json({ reply: respostaBot });
    
  } catch (error) {
    console.error('Erro no chatbot:', error.message);
    res.status(500).json({ 
      error: 'Erro ao processar mensagem',
      details: error.message 
    });
  }
});

module.exports = router;