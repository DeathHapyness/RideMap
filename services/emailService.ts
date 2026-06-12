import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

function gerarHTMLEmail(linkRecuperacao: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: 'Segoe UI', sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 40px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #ff6b35 0%, #ff9800 100%); padding: 40px 30px; text-align: center; color: white; }
          .content { padding: 40px 30px; color: #333; }
          .button { display: inline-block; background: linear-gradient(135deg, #ff6b35 0%, #ff9800 100%); color: white !important; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-weight: 600; margin: 20px 0; }
          .info-box { background: #fff5f0; border-left: 4px solid #ff9800; padding: 16px; margin: 20px 0; border-radius: 4px; }
          .footer { background: #f8f9fa; padding: 30px; text-align: center; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🛹 RideMap</h1>
            <p>Recuperação de Senha</p>
          </div>
          <div class="content">
            <p>Olá!</p>
            <p>Você solicitou a recuperação de senha da sua conta no <strong>RideMap</strong>.</p>
            <p>Clique no botão abaixo para criar uma nova senha:</p>
            <center><a href="${linkRecuperacao}" class="button">🔑 Redefinir Minha Senha</a></center>
            <div class="info-box"><strong>⏰ Atenção:</strong> Este link expira em <strong>1 hora</strong>.</div>
            <p>Se você não solicitou esta recuperação, ignore este email.</p>
          </div>
          <div class="footer">
            <p>© 2024 RideMap. Todos os direitos reservados.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export async function sendPasswordResetEmail(emailDestino: string, token: string) {
  if (!process.env.SENDGRID_API_KEY) {
    console.warn('SENDGRID_API_KEY não configurada; pulando envio de e-mail');
    return;
  }

  const linkRecuperacao = `http://localhost:3000/redefinir-senha?token=${token}`;
  const msg = {
    to: emailDestino,
    from: 'noreply@ridemap.com',
    subject: 'Recuperação de Senha - RideMap',
    html: gerarHTMLEmail(linkRecuperacao)
  };

  await sgMail.send(msg);
}
