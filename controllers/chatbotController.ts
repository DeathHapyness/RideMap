import type { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

const filePath = path.join(__dirname, '..', 'config', 'chatbot-faq.json');
const faqData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

function responderComFaq(mensagem: string) {
  const msg = mensagem.toLowerCase();

  for (const faq of faqData.faqs) {
    const match = faq.keywords.some((keyword: string) => msg.includes(keyword.toLowerCase()));
    if (match) {
      return faq.respostas[Math.floor(Math.random() * faq.respostas.length)];
    }
  }

  return null;
}

class ChatbotController {
  answer = async (req: any, res: any, next: any) => {
    try {
      const mensagens = req.body.messages;
      if (!mensagens || mensagens.length === 0) {
        return res.status(400).json({ error: 'Nenhuma mensagem enviada' });
      }

      const ultimaMensagem = mensagens[mensagens.length - 1].content;
      const respostaFaq = responderComFaq(ultimaMensagem);

      if (respostaFaq) {
        return res.json({ reply: respostaFaq, source: 'faq' });
      }

      const systemPrompt = `Você é um chatbot de ajuda do sistema. Responda sempre em português. Seja claro, direto e educado.`;
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `[RESPONDA EM PORTUGUÊS] ${ultimaMensagem}` }
          ],
          temperature: 0.4,
          max_tokens: 100
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro da API: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      return res.json({ reply: data.choices[0].message.content, source: 'ia' });
    } catch (error) {
      next(error);
    }
  };
}

export default new ChatbotController();
