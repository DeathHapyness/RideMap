//TODO: Refatorar,nao esta funcionando
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function enviarEmailRecuperacao(emailDestino, token) {
    console.log('📧 Tentando enviar email para:', emailDestino);
    
    const linkRecuperacao = `http://localhost:3000/redefinir-senha?token=${token}`;
    
    const msg = {
        to: emailDestino,
        from: 'noreply@ridemap.com', // Pode ser qualquer email
        subject: 'Recuperação de Senha - RideMap',
        html: gerarHTMLEmail(linkRecuperacao)
    };
    
    try {
        await sgMail.send(msg);
        console.log('Email enviado com sucesso!');
    } catch (error) {
        console.error('ERRO ao enviar email:', error);
        throw error;
    }
}

function gerarHTMLEmail(linkRecuperacao) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                body {
                    font-family: 'Segoe UI', sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 40px auto;
                    background: white;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                }
                .header {
                    background: linear-gradient(135deg, #ff6b35 0%, #ff9800 100%);
                    padding: 40px 30px;
                    text-align: center;
                    color: white;
                }
                .header h1 {
                    margin: 0;
                    font-size: 28px;
                }
                .content {
                    padding: 40px 30px;
                    color: #333;
                }
                .content p {
                    font-size: 16px;
                    line-height: 1.6;
                    margin-bottom: 20px;
                }
                .button {
                    display: inline-block;
                    background: linear-gradient(135deg, #ff6b35 0%, #ff9800 100%);
                    color: white !important;
                    text-decoration: none;
                    padding: 16px 40px;
                    border-radius: 8px;
                    font-weight: 600;
                    margin: 20px 0;
                }
                .info-box {
                    background: #fff5f0;
                    border-left: 4px solid #ff9800;
                    padding: 16px;
                    margin: 20px 0;
                    border-radius: 4px;
                }
                .footer {
                    background: #f8f9fa;
                    padding: 30px;
                    text-align: center;
                    color: #666;
                    font-size: 14px;
                }
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
                    
                    <center>
                        <a href="${linkRecuperacao}" class="button">
                            🔑 Redefinir Minha Senha
                        </a>
                    </center>
                    
                    <div class="info-box">
                        <strong>⏰ Atenção:</strong> Este link expira em <strong>1 hora</strong>.
                    </div>
                    
                    <p>Se você não solicitou esta recuperação, ignore este email.</p>
                    
                    <p style="margin-top: 30px; color: #666; font-size: 14px;">
                        <strong>Não consegue clicar no botão?</strong><br>
                        Copie e cole este link:<br>
                        <a href="${linkRecuperacao}" style="color: #ff9800;">${linkRecuperacao}</a>
                    </p>
                </div>
                
                <div class="footer">
                    <p>© 2024 RideMap. Todos os direitos reservados.</p>
                </div>
            </div>
        </body>
        </html>
    `;
}

module.exports = { enviarEmailRecuperacao };