# 🛹 RideMap

> Plataforma colaborativa para skatistas encontrarem e compartilharem pistas de skate pelo Brasil

![Badge](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Badge](https://img.shields.io/badge/license-MIT-blue)

## 📖 Sobre o Projeto

RideMap é uma aplicação web que conecta skatistas, permitindo descobrir novas pistas, avaliar locais e construir uma comunidade em torno do skate. Com sistema de moderação e notificações em tempo real, garantimos conteúdo de qualidade para todos os usuários.

## ✨ Funcionalidades

### Para Usuários
- 🗺️ Mapa interativo com pistas de skate
- ➕ Adicionar novas pistas com localização precisa
- 📍 Visualizar detalhes (tipo, dificuldade, descrição)
- 🔔 Sistema de notificações em tempo real
- 👤 Perfil personalizável com avatar

### Para Administradores
- ✅ Sistema de moderação de pistas
- 📊 Painel administrativo
- 🚫 Aprovar ou rejeitar pistas com justificativa
- 👥 Gerenciamento de usuários

## 🚀 Tecnologias

**Frontend:**
- HTML5, CSS3, JavaScript (ES6+)
- Handlebars (Template Engine)
- Bootstrap 5
- Leaflet.js (Mapas)
- SweetAlert2 (Alertas)
- Select2 (Dropdowns)

**Backend:**
- Node.js
- Express.js
- MySQL 8.0
- bcrypt (Criptografia)
- express-session (Sessões)

## 📦 Instalação

### Pré-requisitos
- Node.js 16+
- MySQL 8.0+
- Git

### Passos

1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/ridemap.git
cd ridemap
```

2. Instale as dependências
```bash
npm install
```

3. Configure o banco de dados
```sql
CREATE DATABASE ridemap;
```

4. Configure as variáveis de ambiente
```bash
cp .env.example .env
# Edite o .env com suas credenciais
```

5. Execute as migrations (SQL)
```bash
# Execute os scripts em db/migrations/
mysql -u seu_usuario -p ridemap < db/setup.sql
```

6. Inicie o servidor
```bash
npm start
```

7. Acesse no navegador
```
http://localhost:3000
```

## 🎯 Como Usar

### Criar uma conta
1. Acesse `/register`
2. Preencha nome, email e senha
3. Faça login

### Adicionar uma pista
1. Clique em "Adicionar Pista"
2. Preencha os dados
3. Clique no mapa para definir localização
4. Aguarde aprovação do admin

### Aprovar pistas (Admin)
1. Acesse `/admin/dashboard`
2. Veja pistas pendentes
3. Aprove ou rejeite com justificativa

## 📸 Screenshots

[Adicione screenshots aqui]

## 🗺️ Roadmap

- [x] Sistema de autenticação
- [x] Mapa interativo
- [x] Sistema de moderação
- [x] Notificações em tempo real
- [ ] Upload de fotos nas pistas
- [ ] Sistema de avaliações
- [ ] Filtros avançados
- [ ] Rotas/trilhas de skate
- [ ] Aplicativo mobile

## 🤝 Contribuindo

Contribuições são bem-vindas! Siga os passos:

1. Fork o projeto
2. Crie sua branch (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Henrique**

- GitHub: [@DeathHapyness](https://github.com/seu-usuario)
- Email: henrique.dev2@gmail.com

---

⭐ Se este projeto te ajudou, deixe uma estrela!

🛹 Feito com ❤️ por skatistas, para skatistas

💡 DICAS EXTRAS:
Adicione badges:

Mostrar Imagem
Mostrar Imagem

Crie um .env.example:
envDB_HOST=localhost
DB_USER=ridemap
DB_PASSWORD=sua_senha
DB_NAME=ridemap
SESSION_SECRET=seu_secret_aqui
PORT=3000
Tire screenshots:

Página inicial
Dashboard
Painel admin
Sistema de notificações


Quer que eu crie um README completo específico pro seu projeto com todas as informações corretas? 🚀Tentar novamenteHfaca algo mais completo e tudo de uma forma que eu possa apenas copiar e colarmarkdown# 🛹 RideMap

<div align="center">

![RideMap Logo](https://via.placeholder.com/800x200/667eea/ffffff?text=RideMap+-+Encontre+as+Melhores+Pistas+de+Skate)

**Plataforma colaborativa para skatistas encontrarem e compartilharem pistas de skate pelo Brasil**

[![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)](https://github.com/seu-usuario/ridemap)
[![Node](https://img.shields.io/badge/node-16+-green)](https://nodejs.org)
[![MySQL](https://img.shields.io/badge/mysql-8.0-blue)](https://www.mysql.com)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

[Demo](#) • [Documentação](#instalação) • [Reportar Bug](https://github.com/seu-usuario/ridemap/issues)

</div>

---

## 📖 Sobre o Projeto

**RideMap** é uma aplicação web full-stack que conecta a comunidade de skatistas, permitindo descobrir novas pistas, compartilhar locais e construir um mapa colaborativo de spots pelo Brasil. 

Com sistema de moderação robusto, notificações em tempo real e interface intuitiva, o RideMap garante conteúdo de qualidade e experiência profissional para todos os usuários.

### 🎯 Problema que resolve

Skatistas frequentemente enfrentam dificuldade em:
- Encontrar novas pistas na sua região
- Saber detalhes sobre dificuldade e tipo de pista
- Compartilhar descobertas com a comunidade
- Ter informações confiáveis sobre os spots

### 💡 Solução

Uma plataforma centralizada onde a própria comunidade cadastra, avalia e mantém atualizado um mapa completo de pistas, com sistema de moderação para garantir qualidade.

---

## ✨ Funcionalidades

### 👤 Para Usuários Comuns

- 🗺️ **Mapa Interativo** - Visualize todas as pistas aprovadas em um mapa usando Leaflet.js
- ➕ **Adicionar Pistas** - Cadastre novos spots com:
  - Nome e descrição
  - Localização precisa (clique no mapa)
  - Tipo (skate, patins ou ambos)
  - Nível de dificuldade (fácil, médio, difícil)
  - Cidade e estado
- 🔔 **Notificações em Tempo Real** - Receba alertas quando:
  - Sua pista for aprovada
  - Sua pista for rejeitada (com motivo)
  - Badge mostra número de notificações não lidas
  - Atualização automática a cada 5 segundos
- 👤 **Perfil Personalizável** - Avatar customizável e informações pessoais
- 📍 **Visualizar Detalhes** - Veja informações completas de cada pista

### 🛡️ Para Administradores

- ✅ **Sistema de Moderação** - Painel completo para análise de pistas
- 📊 **Dashboard Administrativo** - Estatísticas e métricas em tempo real
- 🎯 **Aprovar/Rejeitar Pistas** - Com justificativa obrigatória em caso de rejeição
- 🔔 **Notificações Automáticas** - Sistema envia feedback automático aos usuários
- 👥 **Gerenciamento de Usuários** - Controle de permissões e roles
- 📈 **Métricas** - Acompanhe total de pistas aprovadas, rejeitadas e pendentes

---

## 🚀 Tecnologias Utilizadas

### Frontend
```
HTML5, CSS3, JavaScript (ES6+)
├── Handlebars        # Template engine
├── Bootstrap 5       # Framework CSS
├── Leaflet.js        # Mapas interativos
├── SweetAlert2       # Alertas e modais
├── Select2           # Dropdowns avançados
└── Font Awesome      # Ícones
```

### Backend
```
Node.js + Express.js
├── MySQL 8.0              # Banco de dados
├── mysql2                 # Driver MySQL com promises
├── bcrypt                 # Criptografia de senhas
├── express-session        # Gerenciamento de sessões
├── multer                 # Upload de arquivos
└── dotenv                 # Variáveis de ambiente
```

### Arquitetura
- **Padrão MVC** - Separação de responsabilidades
- **REST API** - Endpoints RESTful para comunicação
- **Session-based Auth** - Autenticação por sessão
- **Role-based Access Control** - Controle de permissões por roles

---

## 📦 Instalação e Configuração

### Pré-requisitos

Certifique-se de ter instalado:
- [Node.js](https://nodejs.org/) 16 ou superior
- [MySQL](https://www.mysql.com/) 8.0 ou superior
- [Git](https://git-scm.com/)

### Passo a Passo

#### 1️⃣ Clone o repositório
```bash
git clone https://github.com/seu-usuario/ridemap.git
cd ridemap
```

#### 2️⃣ Instale as dependências
```bash
npm install
```

#### 3️⃣ Configure o banco de dados

Entre no MySQL:
```bash
mysql -u root -p
```

Execute os comandos:
```sql
CREATE DATABASE ridemap CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ridemap;

-- Criação da tabela usuarios
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    avatar VARCHAR(255),
    role VARCHAR(20) DEFAULT 'user',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criação da tabela pistas
CREATE TABLE pistas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(150) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    estado VARCHAR(2) NOT NULL,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    tipo ENUM('skate','patins','ambos') NOT NULL,
    dificuldade ENUM('facil','medio','dificil') NOT NULL,
    descricao TEXT,
    usuario_id INT NOT NULL,
    status VARCHAR(20) DEFAULT 'pendente',
    motivo_rejeicao TEXT,
    data_moderacao DATETIME,
    moderador_id INT,
    ativa TINYINT(1) DEFAULT 1,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- Criação da tabela notificacoes
CREATE TABLE notificacoes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    mensagem TEXT NOT NULL,
    lida BOOLEAN DEFAULT FALSE,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Criação da tabela usuarios_banidos (futura implementação)
CREATE TABLE usuarios_banidos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    admin_id INT NOT NULL,
    motivo TEXT NOT NULL,
    data_banimento DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_expiracao DATETIME,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (admin_id) REFERENCES usuarios(id)
);

-- Criar primeiro usuário admin (ALTERE A SENHA!)
INSERT INTO usuarios (nome, email, senha, role) 
VALUES ('Admin', 'admin@ridemap.com', '$2b$10$exemplo_hash_bcrypt', 'admin');
```

#### 4️⃣ Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:
```bash
touch .env
```

Adicione o seguinte conteúdo (ajuste com suas credenciais):
```env
# Banco de Dados
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha_mysql
DB_NAME=ridemap

# Servidor
PORT=3000

# Sessão (gere uma string aleatória segura)
SESSION_SECRET=seu_secret_super_seguro_aqui_123456

# Ambiente
NODE_ENV=development
```

#### 5️⃣ Inicie o servidor
```bash
npm start
```

Ou para desenvolvimento com auto-reload:
```bash
npm run dev
```

#### 6️⃣ Acesse a aplicação

Abra seu navegador em:
```
http://localhost:3000
```

---

## 🎮 Como Usar

### Para Usuários

#### 1. Criar uma conta
1. Acesse `http://localhost:3000`
2. Clique em "Criar Conta"
3. Preencha nome, email e senha
4. Faça login com suas credenciais

#### 2. Adicionar uma pista
1. No dashboard, clique em "Adicionar Pista"
2. Preencha as informações:
   - Nome da pista
   - Cidade e Estado
   - Tipo (skate, patins ou ambos)
   - Dificuldade (fácil, médio ou difícil)
   - Descrição detalhada
3. Clique no mapa para marcar a localização exata
4. Clique em "Salvar"
5. Aguarde a aprovação do administrador
6. Você receberá uma notificação quando for aprovada ou rejeitada

#### 3. Ver notificações
1. O ícone de sino 🔔 mostra quantas notificações você tem
2. Clique no sino para abrir o dropdown
3. Clique em uma notificação para marcá-la como lida

#### 4. Editar perfil
1. Clique em "Perfil" no menu lateral
2. Altere seu nome ou avatar
3. Clique em "Salvar Alterações"

### Para Administradores

#### 1. Acessar painel admin
1. Faça login com uma conta admin
2. Clique em "Administração" no menu lateral
3. Acesse `http://localhost:3000/admin/dashboard`

#### 2. Moderar pistas
1. Veja a lista de "Pistas Aguardando Moderação"
2. Analise os detalhes de cada pista
3. Clique em "Aprovar" para liberar no mapa
4. Ou clique em "Rejeitar" e informe o motivo
5. O usuário receberá notificação automaticamente

---

## 📁 Estrutura do Projeto
```
ridemap/
├── config/
│   └── multer.js           # Configuração upload de arquivos
├── db/
│   └── config.js           # Conexão MySQL
├── public/
│   ├── css/
│   │   ├── style.css       # Estilos globais
│   │   └── dashboard.css   # Estilos do dashboard
│   ├── js/
│   │   ├── dashboard.js    # Lógica do dashboard
│   │   ├── admin.js        # Lógica do painel admin
│   │   └── map.js          # Lógica do mapa
│   └── img/                # Imagens estáticas
├── views/
│   ├── partials/
│   │   ├── sidebar.hbs     # Menu lateral
│   │   ├── profile-view.hbs # Modal de perfil
│   │   └── add-spot-modal.hbs # Modal adicionar pista
│   ├── home.hbs            # Página inicial
│   ├── dashboard.hbs       # Dashboard do usuário
│   └── admin-dashboard.hbs # Painel administrativo
├── routes.js               # Todas as rotas da aplicação
├── server.js               # Arquivo principal do servidor
├── .env                    # Variáveis de ambiente (não commitado)
├── .gitignore              # Arquivos ignorados pelo Git
├── package.json            # Dependências do projeto
└── README.md               # Este arquivo
```

---

## 🔐 Segurança

O RideMap implementa diversas camadas de segurança:

- ✅ **Senhas criptografadas** com bcrypt (salt rounds: 10)
- ✅ **Sessões seguras** com express-session
- ✅ **Validação de inputs** no frontend e backend
- ✅ **Proteção contra SQL Injection** usando prepared statements
- ✅ **Controle de acesso** baseado em roles (user/admin)
- ✅ **Variáveis sensíveis** em arquivo .env (não versionado)
- ✅ **CSRF protection** em formulários críticos

---

## 🗺️ Roadmap

### ✅ Concluído
- [x] Sistema de autenticação completo
- [x] Mapa interativo com Leaflet
- [x] CRUD de pistas
- [x] Sistema de moderação
- [x] Notificações em tempo real
- [x] Painel administrativo
- [x] Upload de avatares
- [x] Sistema de roles (user/admin)

### 🚧 Em Desenvolvimento
- [ ] Upload de múltiplas fotos por pista
- [ ] Sistema de avaliações (estrelas/comentários)
- [ ] "Minhas Pistas" - ver pistas enviadas
- [ ] Editar pista rejeitada

### 📋 Planejado
- [ ] Filtros avançados (tipo, dificuldade, distância)
- [ ] Sistema de favoritos
- [ ] Compartilhamento social
- [ ] Rotas/trilhas personalizadas
- [ ] Eventos e campeonatos
- [ ] Versão mobile (React Native)
- [ ] PWA (Progressive Web App)
- [ ] Modo offline
- [ ] Integração com redes sociais
- [ ] Gamificação (badges, rankings)

---

## 🤝 Contribuindo

Contribuições são muito bem-vindas! Este projeto segue o padrão de código aberto.

### Como contribuir

1. **Fork** o projeto
2. Crie uma **branch** para sua feature (`git checkout -b feature/MinhaFeature`)
3. **Commit** suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. **Push** para a branch (`git push origin feature/MinhaFeature`)
5. Abra um **Pull Request**

### Diretrizes

- Siga o padrão de código existente
- Escreva mensagens de commit claras
- Comente código complexo
- Teste suas mudanças antes de enviar
- Atualize a documentação se necessário

### Reportar Bugs

Encontrou um bug? Abra uma [issue](https://github.com/seu-usuario/ridemap/issues) com:
- Descrição clara do problema
- Passos para reproduzir
- Comportamento esperado vs atual
- Screenshots (se aplicável)
- Ambiente (SO, navegador, versão Node)

---

## 📝 Scripts Disponíveis
```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Iniciar servidor de produção
npm start

# Verificar erros de código
npm run lint

# Formatar código
npm run format
```

---

## 🐛 Problemas Conhecidos

- Upload de fotos ainda não implementado nas pistas
- Sistema de avaliações em desenvolvimento
- Notificações não persistem após logout (por design)

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Isso significa que você pode:

- ✅ Usar comercialmente
- ✅ Modificar
- ✅ Distribuir
- ✅ Uso privado

Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/seu-usuario">
        <img src="https://github.com/seu-usuario.png" width="100px;" alt="Foto do Henrique"/><br>
        <sub>
          <b>Henrique</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

- 💼 LinkedIn: [seu-linkedin](https://linkedin.com/in/seu-linkedin)
- 📧 Email: henrique.dev2@gmail.com
- 🐙 GitHub: [@seu-usuario](https://github.com/seu-usuario)

---

## 🙏 Agradecimentos

- Comunidade de skatistas que inspirou este projeto
- [Leaflet.js](https://leafletjs.com/) pelo mapa interativo
- [Bootstrap](https://getbootstrap.com/) pelo framework CSS
- [SweetAlert2](https://sweetalert2.github.io/) pelos alertas bonitos
- Todos os contribuidores futuros

---

## 📊 Status do Projeto
```
Progresso Geral: ████████░░ 80%

Funcionalidades Core:   ██████████ 100%
Frontend:               ████████░░  85%
Backend:                █████████░  90%
Testes:                 ██░░░░░░░░  20%
Documentação:           ████████░░  80%
```

---

<div align="center">

### ⭐ Se este projeto te ajudou, deixe uma estrela!

### 🛹 Feito com ❤️ por skatistas, para skatistas

**[⬆ Voltar ao topo](#-ridemap)**

</div>

📝 Arquivo .env.example
Crie também um arquivo .env.example:
env# Database Configuration
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=ridemap

# Server Configuration
PORT=3000

# Session Secret (generate a random string)
SESSION_SECRET=seu_secret_aqui_mude_isso

# Environment
NODE_ENV=development
