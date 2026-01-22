<div align="center">

# 🛹 RideMap

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=32&duration=2800&pause=2000&color=667EEA&center=true&vCenter=true&width=940&lines=Encontre+as+Melhores+Pistas+de+Skate;Plataforma+Colaborativa+para+Skatistas;Construa+sua+Comunidade!" alt="Typing SVG" />

**Plataforma colaborativa para skatistas encontrarem e compartilharem pistas de skate pelo Brasil**

[![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow?style=for-the-badge)](https://github.com/DeathHapyness/ridemap)
[![Node](https://img.shields.io/badge/node-16+-green?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/pt-br)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17+-blue?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org)
[![License](https://img.shields.io/badge/license-CC%20BY--NC--SA%204.0-orange?style=for-the-badge)](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en)

**Idiomas:** 🇧🇷 **Português** | [🇺🇸 English](README_EN.md)

<p align="center">
  <a href="#-sobre-o-projeto">Sobre</a> •
  <a href="#-funcionalidades">Funcionalidades</a> •
  <a href="#-tecnologias">Tecnologias</a> •
  <a href="#-instalação">Instalação</a> •
  <a href="#-como-usar">Como Usar</a> •
  <a href="#-licença">Licença</a>
</p>

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="600">

</div>

---

## 📖 Sobre o Projeto

<img align="right" src="https://user-images.githubusercontent.com/74038190/212748842-9fcbad5b-6173-4175-8a61-521f3dbb7514.gif" width="250">

**RideMap** é uma aplicação web full-stack que conecta a comunidade de skatistas, permitindo descobrir novas pistas, compartilhar locais e construir um mapa colaborativo de spots pelo Brasil. 

Com sistema de moderação robusto, notificações em tempo real e interface intuitiva, o RideMap garante conteúdo de qualidade e experiência profissional para todos os usuários.

<br clear="right"/>

### 🎯 Problema que Resolve

<table>
<tr>
<td width="50%">

**Desafios dos Skatistas:**
- 🔍 Dificuldade em encontrar novas pistas
- ❓ Falta de informações sobre dificuldade
- 🤝 Ausência de plataforma para compartilhar
- ⚠️ Informações não confiáveis sobre spots

</td>
<td width="50%">

**Nossa Solução:**
- 🗺️ Mapa centralizado e interativo
- 📊 Informações detalhadas e verificadas
- 👥 Comunidade ativa e engajada
- ✅ Sistema de moderação de qualidade

</td>
</tr>
</table>

---

## ✨ Funcionalidades

<details open>
<summary><b>👤 Para Usuários Comuns</b></summary>
<br>

- 🗺️ **Mapa Interativo**
  - Visualize todas as pistas aprovadas usando Leaflet.js
  - Interface responsiva e fácil de usar
  
- ➕ **Adicionar Pistas**
  - Nome e descrição detalhada
  - Localização precisa (clique no mapa)
  - Tipo: skate, patins ou ambos
  - Nível de dificuldade (fácil, médio, difícil)
  - Cidade e estado
  
- 🔔 **Notificações em Tempo Real**
  - Alertas quando sua pista for aprovada
  - Notificação de rejeição com motivo
  - Badge mostra notificações não lidas
  - Atualização automática a cada 5 segundos
  - Design moderno com gradientes laranja
  
- 👤 **Perfil Personalizável**
  - Avatar customizável com upload via Cloudinary
  - Upload de imagens com validação automática
  - Redimensionamento inteligente (300x300px)
  - Crop automático focando no rosto
  - Informações pessoais editáveis
  - Alteração de senha segura
  - Modal moderno e responsivo
  
- 📍 **Visualizar Detalhes**
  - Informações completas de cada pista
  - Sistema de avaliações (em breve)

</details>

<details>
<summary><b>🛡️ Para Administradores</b></summary>
<br>

- ✅ **Sistema de Moderação**
  - Painel completo para análise de pistas
  - Interface intuitiva de aprovação/rejeição
  
- 📊 **Dashboard Administrativo**
  - Estatísticas em tempo real
  - Métricas de engajamento
  
- 🎯 **Aprovar/Rejeitar Pistas**
  - Justificativa obrigatória em rejeições
  - Histórico de moderações
  
- 🔔 **Notificações Automáticas**
  - Sistema envia feedback automático
  - Comunicação transparente com usuários
  
- 👥 **Gerenciamento de Usuários**
  - Controle de permissões e roles
  - Sistema anti-spam
  
- 📈 **Métricas Detalhadas**
  - Total de pistas aprovadas/rejeitadas/pendentes
  - Análise de crescimento da plataforma

</details>

---

## 🚀 Tecnologias Utilizadas

<div align="center">

### Frontend

<img src="https://skillicons.dev/icons?i=html,css,js,bootstrap" alt="Frontend Stack" />

| Tecnologia | Descrição |
|------------|-----------|
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) | Estrutura da aplicação |
| ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) | Estilização customizada |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) | Lógica do cliente |
| ![Bootstrap](https://img.shields.io/badge/Bootstrap_5-7952B3?style=flat&logo=bootstrap&logoColor=white) | Framework CSS |
| ![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=flat&logo=leaflet&logoColor=white) | Mapas interativos |
| ![Handlebars](https://img.shields.io/badge/Handlebars-000000?style=flat&logo=handlebarsdotjs&logoColor=white) | Template engine |
| ![Animate.css](https://img.shields.io/badge/Animate.css-FF6B35?style=flat) | Animações CSS |
| ![SweetAlert2](https://img.shields.io/badge/SweetAlert2-7952B3?style=flat) | Alertas bonitos |

### Backend

<img src="https://skillicons.dev/icons?i=nodejs,express,mysql,cloudinary" alt="Backend Stack" />

| Tecnologia | Descrição |
|------------|-----------|
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white) | Ambiente de execução |
| ![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white) | Framework web |
| ![PostgreSQL](https://img.shields.io/badge/PostgreSQL_17+-4169E1?style=flat&logo=postgresql&logoColor=white) | Banco de dados |
| ![bcrypt](https://img.shields.io/badge/bcrypt-003A70?style=flat) | Criptografia de senhas |
| ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat&logo=cloudinary&logoColor=white) | Upload de imagens |
| ![Multer](https://img.shields.io/badge/Multer-FF6B35?style=flat) | Processamento de arquivos |

</div>

### 🏗️ Arquitetura

```
┌─────────────────────────────────────────────┐
│          Padrão MVC Completo                │
├─────────────────────────────────────────────┤
│  ┌─────────┐  ┌────────┐  ┌──────────┐      │
│  │  Model  │  │  View  │  │Controller│      │
│  └─────────┘  └────────┘  └──────────┘      │
├─────────────────────────────────────────────┤
│  • REST API                                 │
│  • Session-based Authentication             │
│  • Role-based Access Control (RBAC)         │
│  • Real-time Notifications                  │
│  • Cloud Image Storage (Cloudinary)         │
│  • Responsive Design with Animations        │
└─────────────────────────────────────────────┘
```

---

## 🎨 Novidades da Interface

### 🆕 Design Moderno com Gradientes Laranja

O RideMap agora conta com uma interface completamente renovada:

- **🎨 Paleta de Cores**
  - Gradientes laranja vibrantes (#FF6B35 → #F7931E)
  - Tema consistente em toda aplicação
  - Efeitos de hover suaves e profissionais
  
- **✨ Animações Integradas**
  - Logo RideMap com animação de gradiente contínuo
  - Efeito de brilho passando pelo texto
  - Hover com bounce suave
  - Pulso de luz ao redor do logo
  
- **📱 Sidebar Aprimorado**
  - Gradiente de fundo laranja moderno
  - Menu items com efeitos de hover
  - Ícones alinhados e organizados
  - Scrollbar personalizado
  
- **🔔 Sistema de Notificações Renovado**
  - Badge animado com efeito de pulso
  - Dropdown com header laranja
  - Animação de abertura suave
  - Itens com hover interativo

### 🖼️ Sistema de Upload de Avatar

- **☁️ Integração com Cloudinary**
  - Upload direto para nuvem
  - Imagens otimizadas automaticamente
  - Redimensionamento inteligente (300x300px)
  - Crop focando automaticamente no rosto
  - URLs seguras e permanentes
  
- **✅ Validações Automáticas**
  - Limite de 5MB por imagem
  - Apenas formatos de imagem aceitos
  - Feedback visual instantâneo
  - Tratamento de erros amigável
  
- **🎯 Experiência do Usuário**
  - Preview instantâneo da imagem
  - Loading animado durante upload
  - Confirmação visual de sucesso
  - Modal responsivo e moderno

---

## 📦 Instalação e Configuração

### Pré-requisitos

<table>
<tr>
<td>

```bash
📌 Node.js 16+
📌 MySQL 8.0+
📌 Git
📌 Conta Cloudinary (gratuita)
```

</td>
<td>

[![Node](https://img.shields.io/badge/Download-Node.js-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/Download-MySQL-blue?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Git](https://img.shields.io/badge/Download-Git-orange?style=for-the-badge&logo=git&logoColor=white)](https://git-scm.com/)
[![Cloudinary](https://img.shields.io/badge/Criar_Conta-Cloudinary-3448C5?style=for-the-badge&logo=cloudinary)](https://cloudinary.com/)

</td>
</tr>
</table>

### 🚀 Passo a Passo

<details open>
<summary><b>Clique para expandir as instruções</b></summary>

#### 1️⃣ Clone o repositório

```bash
git clone https://github.com/DeathHapyness/ridemap.git
cd ridemap
```

#### 2️⃣ Instale as dependências

```bash
npm install
```

#### 3️⃣ Configure o banco de dados

Entre no MySQL:
```bash
postgreSQL -u root -p
```

Execute os comandos:
```sql
CREATE DATABASE ridemap CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ridemap;

-- Criação da tabela usuarios (ATUALIZADA)
CREATE TABLE usuarios (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    avatar VARCHAR(255),
    avatar_url VARCHAR(500),
    avatar_public_id VARCHAR(255),
    role VARCHAR(20) DEFAULT 'user',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultima_atividade TIMESTAMP NULL,
    ativo BOOLEAN DEFAULT TRUE
); 

--índices:
CREATE INDEX idx_email ON usuarios(email);
CREATE INDEX idx_role ON usuarios(role);
CREATE INDEX idx_ativo ON usuarios(ativo);

-- Criação da tabela pistas
CREATE TYPE tipo_pista AS ENUM ('skate', 'patins', 'ambos');
CREATE TYPE dificuldade_tipo AS ENUM ('facil', 'medio', 'dificil');

CREATE TABLE pistas (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    estado VARCHAR(2) NOT NULL,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    tipo tipo_pista NOT NULL,
    dificuldade dificuldade_tipo NOT NULL,
    descricao TEXT,
    usuario_id INT NOT NULL,
    status VARCHAR(20) DEFAULT 'pendente',
    motivo_rejeicao TEXT,
    data_moderacao TIMESTAMP,
    moderador_id INT,
    ativa BOOLEAN DEFAULT TRUE,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE INDEX idx_status ON pistas(status);
CREATE INDEX idx_cidade ON pistas(cidade);
CREATE INDEX idx_tipo ON pistas(tipo);
CREATE INDEX idx_dificuldade ON pistas(dificuldade);
CREATE INDEX idx_usuario ON pistas(usuario_id);
CREATE INDEX idx_ativa ON pistas(ativa);    

-- Criação da tabela notificacoes
CREATE TABLE notificacoes (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY ,
    usuario_id INT NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    mensagem TEXT NOT NULL,
    lida BOOLEAN DEFAULT FALSE,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE INDEX idx_usuario_lida ON notificacoes(usuario_id, lida);
CREATE INDEX idx_data ON notificacoes(data_criacao);
CREATE INDEX idx_lida ON notificacoes(lida);

-- Criação da tabela fotos_pistas

CREATE TABLE fotos_pistas (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    pista_id INT NOT NULL,
    usuario_id INT NOT NULL,
    url VARCHAR(500) NOT NULL,
    public_id VARCHAR(255),
    descricao TEXT,
    principal BOOLEAN DEFAULT FALSE,
    aprovada BOOLEAN DEFAULT FALSE,
    data_upload TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pista_id) REFERENCES pistas(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE INDEX idx_pista ON fotos_pistas(pista_id);
CREATE INDEX idx_usuario ON fotos_pistas(usuario_id);
CREATE INDEX idx_aprovada ON fotos_pistas(aprovada);
CREATE INDEX idx_principal ON fotos_pistas(principal);

-- Criação da tabela fotos_perfil

CREATE TABLE fotos_perfil (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    usuario_id INT NOT NULL,
    url VARCHAR(500) NOT NULL,
    public_id VARCHAR(255),
    ativa BOOLEAN DEFAULT TRUE,
    data_upload TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE INDEX idx_usuario ON fotos_perfil(usuario_id);
CREATE INDEX idx_ativa ON fotos_perfil(ativa);

-- Criação da tabela avaliacoes

CREATE or REPLACE FUNCTION atualiza_data_atualizacao()
RETURNS TRIGGER AS $$
BEGIN
    NEW.data_atualizacao = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE avaliacoes (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    pista_id INT NOT NULL,
    usuario_id INT NOT NULL,
    nota INT NOT NULL CHECK (nota >= 1 AND nota <= 5),
    comentario TEXT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pista_id) REFERENCES pistas(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    CONSTRAINT unique_avaliacao UNIQUE (pista_id, usuario_id)
);


CREATE INDEX idx_pista ON avaliacoes(pista_id);
CREATE INDEX idx_usuario ON avaliacoes(usuario_id);
CREATE INDEX idx_nota ON avaliacoes(nota);
CREATE INDEX idx_data ON avaliacoes(data_criacao);

CREATE TRIGGER trg_atualiza_data_atualizacao
BEFORE UPDATE ON avaliacoes
FOR EACH ROW
EXECUTE FUNCTION atualiza_data_atualizacao();

CREATE TRIGGER trg_atualiza_data_atualizacao
BEFORE UPDATE ON avaliacoes
FOR EACH ROW
EXECUTE FUNCTION atualiza_data_atualizacao();

-- Criação da tabela usuarios_banidos

CREATE TABLE usuarios_banidos (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    usuario_id INT NOT NULL,
    motivo TEXT NOT NULL,
    data_banimento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_expiracao TIMESTAMP NULL,
    banido_por INT,
    permanente BOOLEAN DEFAULT FALSE,
    ativo BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (banido_por) REFERENCES usuarios(id) ON DELETE SET NULL
);

CREATE INDEX idx_usuario ON usuarios_banidos(usuario_id);
CREATE INDEX idx_ativo ON usuarios_banidos(ativo);
CREATE INDEX idx_permanente ON usuarios_banidos(permanente);
CREATE INDEX idx_data_expiracao ON usuarios_banidos(data_expiracao);    
```

#### 4️⃣ Configure as variáveis de ambiente

Crie um arquivo `.env`:
```bash
touch .env
```

Adicione o conteúdo:
```env
# Banco de Dados
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha_mysql
DB_NAME=ridemap

# Servidor
PORT=3000

# Sessões
SESSION_SECRET=seu_secret_super_seguro_aqui_12345

# Cloudinary (NOVO)
CLOUDINARY_CLOUD_NAME=seu_cloud_name
CLOUDINARY_API_KEY=sua_api_key
CLOUDINARY_API_SECRET=seu_api_secret
```

#### 5️⃣ Configurar Cloudinary

1. Acesse [cloudinary.com](https://cloudinary.com/) e crie uma conta gratuita
2. No Dashboard, copie:
   - **Cloud Name**
   - **API Key**
   - **API Secret**
3. Cole essas informações no arquivo `.env`

#### 6️⃣ Inicie o servidor

Desenvolvimento:
```bash
npm run dev
```

Produção:
```bash
npm start
```

#### 7️⃣ Acesse a aplicação

Abra seu navegador em:
```
http://localhost:3000
```

</details>

---

## 📖 Como Usar

### 👤 Para Usuários

<details open>
<summary><b>Instruções para Usuários</b></summary>

#### 1️⃣ Criar Conta
1. Acesse `http://localhost:3000/cadastro`
2. Preencha: **Nome**, **Email** e **Senha**
3. Clique em **"Cadastrar"**

#### 2️⃣ Personalizar Perfil
1. Faça login na sua conta
2. Clique no ícone de **perfil** no menu lateral
3. Clique em **"Trocar Foto"**
4. Selecione uma imagem (máx. 5MB)
5. Aguarde o upload (processamento automático)
6. Sua foto será otimizada e salva na nuvem
7. Edite nome e outras informações
8. Clique em **"Salvar Alterações"**

#### 3️⃣ Adicionar Pista
1. No mapa, clique em **"Adicionar Spot"**
2. Preencha todos os campos obrigatórios
3. **Clique no mapa** para marcar localização
4. Clique em **"Enviar para Aprovação"**
5. Aguarde notificação de aprovação/rejeição

#### 4️⃣ Ver Notificações
1. Clique no ícone de **sino** 🔔
2. Badge mostra número de não lidas
3. Clique para marcar como lida
4. Atualizações automáticas a cada 5s

</details>

### 🛡️ Para Administradores

<details>
<summary><b>Instruções de Moderação</b></summary>

#### 1️⃣ Acessar Painel Admin
1. Login com conta admin
2. Clique em **"Administração"**
3. Acesse `http://localhost:3000/admin/dashboard`

#### 2️⃣ Moderar Pistas
1. Veja lista de **"Pistas Aguardando Moderação"**
2. Analise os detalhes
3. Clique em **"Aprovar"** ou **"Rejeitar"**
4. Em caso de rejeição, informe o motivo
5. Usuário receberá notificação automática

</details>

---

## 📁 Estrutura do Projeto

```
ridemap/
├── 📁 config/
│   ├── cloudinary.js       
│   └── multer.js           
├── 📁 db/
│   ├── config.js                 # Conexão MySQL
│   ├── initDatabase.js           # Novo arquivo de criacao de BD (NOVO)
│   └── RideMap.sql               # Novo BD atualizado para postgreSQL (NOVO)
│ 
├── 📁 static/
│   ├── 📁 css/
│   │   ├── style.css       # Estilo principal
│   │   ├── sidebar.css     
│   │   ├── profile.css     
│   │   ├── profile.css     
│   │   ├── admin-dashboard.css 
│   │   ├── login.css       
│   │   ├── dashboard.css   
│   │   ├── adicionar-pista.css  
│   │   └── dashboard-perfil.css 
│   ├── 📁 js/
│   │   ├── dashboard.js    
│   │   ├── admin.js        # Funcoes da interface de admin 
│   │   ├── profile-view.js # Lógica do perfil 
│   │   ├── script.js       # Lógica de animacoes basicas
│   │   ├── recuperacao-senha.js # Lógica de recuperacao de senha com email 
│   │   ├── darkmod.js      # Lógica do dark mod
│   │   └── map.js          # Lógica do mapa
│   └── 📁 img/
│       ├── 📁 backgrounds/
│       │   ├── flechas-dashbaord.jpg  # Novo fundo do dashboard 
│       │   ├──login_Screen.png   # Novo arte da tela de login
│       │   ├──rosa-ad-pista-menor.jpg  # Nova logo de aba
│       │   └──rosa-add-pista.jpg   # Fundo novo screen de adicoa de pista
│       ├── 📁 imgs_reservas/
│       ├── 📁 logos/
│       │    ├── dark_mode_24dp.jpg   #icone de dark mod
│       │    ├── google-logo-search-new.jpg #icone google 
│       │    ├── light_mode_24dp.jpg  #icone de light mod
│       │    ├── logo-principal.png   #nova logo principal     
│       │    └── nova-logo-aba-prt.png #nova logo para aba do navegador
│       ├──  📁 imgs_reservas/   # Imgs reserva
│       │    ├──  back_add-pista.png    
│       │    ├── back-dsh2.jpg
│       │    ├── dashboard_bckgrd.jpg
│       │    └── dsh_back.jpg   
│       └── 📁 logos/
│            ├── logo-laranja-pronta.png
│            └── nova-logo-aba-prt.png
├── 📁 views/
│   ├── 📁 layouts/
│   │   ├── profile-view.hbs # Modal de perfil 
│   │   ├── login-modal.hbs  # Modal de login 
│   │   └── add-spot-modal.hbs
│   ├── 📁 partials/
│   │   ├── sidebar.hbs     # Menu lateral 
│   │   ├── profile-view.hbs # Modal de perfil 
│   │   ├── login-modal.hbs  # Modal de login 
│   │   └── add-spot-modal.hbs
│   ├── 404.hbs             # Página de erro 404
│   ├── add-spot.hbs        # Página de adicao de pista
│   ├── home.hbs            # Página inicial
│   ├── dashboard.hbs       # Dashboard usuário
│   ├── error.hbs           # Página de erros inesperados
│   └── admin-dashboard.hbs # Painel admin e administrcao
├── 📄 .env                 # Arquivos sigilosos
├── 📄 .gitignore
├── 📄 package.json
├── 📄 routes.js            # Rotas atualizada para o novo BD 
├── 📄 server.js            
├── 📄 email.js                        
├── 📄 .gitignore
├── 📄 package.json
├── 📄 README_EN.md        # (ATUALIZADO)
└── 📄 README.md           # (ATUALIZADO)
```

---

## 🔐 Segurança

O RideMap implementa múltiplas camadas de segurança:

<table>
<tr>
<td>

- ✅ **Senhas criptografadas** (bcrypt)
- ✅ **Sessões seguras** (express-session)
- ✅ **Validação de inputs**
- ✅ **Upload seguro** (Cloudinary)

</td>
<td>

- ✅ **Proteção SQL Injection**
- ✅ **Controle de acesso (RBAC)**
- ✅ **Variáveis sensíveis** (.env)
- ✅ **Validação de arquivos** (tipo/tamanho)

</td>
</tr>
</table>

---

## 🗺️ Roadmap

<div align="center">
<img src="https://user-images.githubusercontent.com/74038190/212284087-bbe7e430-757e-4901-90bf-4cd2ce3e1852.gif" width="100">
</div>

### ✅ Concluído

- [x] Sistema de autenticação completo
- [x] Mapa interativo com Leaflet
- [x] Sistema de moderação
- [x] Notificações em tempo real
- [x] Painel administrativo
- [x] Filtros avançados (tipo, dificuldade, distância) 
- [x] Modal de perfil responsivo 
- [x] Sistema de notificações aprimorado 
- [x] "Minhas Pistas" - ver pistas enviadas 
- [x] Dark mode ✨ **NOVO**

### 🚧 Em Desenvolvimento

- [ ] Upload de múltiplas fotos por pista
- [ ] Sistema de avaliações (estrelas/comentários)
- [ ] Editar pista rejeitada

### 📋 Planejado

- [ ] Sistema de favoritos
- [ ] Compartilhamento social
- [ ] Rotas/trilhas personalizadas
- [ ] Upload de avatares com Cloudinary

### 🌟 Futuramente 

- [ ] Eventos e campeonatos
- [ ] Versão mobile (React Native)
- [ ] PWA (Progressive Web App)
- [ ] Modo offline
- [ ] Integração com redes sociais
- [ ] Gamificação (badges, rankings)
- [ ] Cropper de imagem interativo

---

## 🤝 Contribuindo

<img align="right" src="https://user-images.githubusercontent.com/74038190/212257465-7ce8d493-cac5-494e-982a-5a9deb852c4b.gif" width="200">

Contribuições são muito bem-vindas! Este projeto segue o padrão de código aberto para uso não-comercial.

### Como Contribuir

1. **Fork** o projeto
2. Crie uma **branch** (`git checkout -b feature/MinhaFeature`)
3. **Commit** suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. **Push** para a branch (`git push origin feature/MinhaFeature`)
5. Abra um **Pull Request**

### 📋 Diretrizes

- ✅ Siga o padrão de código existente
- ✅ Escreva mensagens de commit claras
- ✅ Comente código complexo
- ✅ Teste suas mudanças
- ✅ Atualize a documentação

### 🐛 Reportar Bugs

Abra uma [issue](https://github.com/DeathHapyness/ridemap/issues) com:
- Descrição clara do problema
- Passos para reproduzir
- Comportamento esperado vs atual
- Screenshots (se aplicável)
- Ambiente (SO, navegador, versão)

---

## 📝 Scripts Disponíveis

```bash
# Instalar dependências
npm install

# Servidor de desenvolvimento (com auto-reload)
npm run dev

# Servidor de produção
npm start

# Verificar erros de código
npm run lint

# Formatar código
npm run format
```

---

## 📄 Licença

<div align="center">

### Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International

[![License](https://img.shields.io/badge/license-CC%20BY--NC--SA%204.0-orange?style=for-the-badge)](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en)

</div>

Este projeto está licenciado sob **CC BY-NC-SA 4.0**. Isso significa:

<table>
<tr>
<td width="50%" valign="top">

### ✅ Você Pode

- 🔄 **Compartilhar** - Copiar e redistribuir
- 🔧 **Adaptar** - Modificar e criar obras derivadas
- 📚 **Usar para fins educacionais**
- 👨‍💻 **Usar para projetos pessoais**

</td>
<td width="50%" valign="top">

### ⚠️ Condições

- 📝 **Atribuição** - Dar crédito apropriado
- 🚫 **Não Comercial** - Sem uso comercial
- 🔄 **Compartilha Igual** - Mesma licença
- ⚖️ **Sem garantias** - Fornecido "como está"

</td>
</tr>
</table>

### 💼 Uso Comercial

Para usar este projeto comercialmente (revender, integrar em produto pago, etc.), **entre em contato**:

📧 **Email:** henrique.dev2@gmail.com

Veja a licença completa: [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)

---

## 👨‍💻 Autores

<div align="center">

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/DeathHapyness">
        <img src="https://github.com/DeathHapyness.png" width="120px;" style="border-radius: 50%;" alt="Foto do Henrique"/><br>
        <sub>
          <b>Henrique</b>
        </sub>
      </a>
      <br>
      <a href="https://github.com/DeathHapyness">
        <img src="https://img.shields.io/badge/-GitHub-181717?style=flat&logo=github" alt="GitHub">
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/izlzy">
        <img src="https://github.com/izlzy.png" width="120px;" style="border-radius: 50%;" alt="Foto do João"/><br>
        <sub>
          <b>João</b>
        </sub>
      </a>
      <br>
      <a href="https://github.com/izlzy">
        <img src="https://img.shields.io/badge/-GitHub-181717?style=flat&logo=github" alt="GitHub">
      </a>
    </td>
  </tr>
</table>

📧 **Contato:** henrique.dev2@gmail.com

</div>

---

## 🙏 Agradecimentos

<div align="center">
<img src="https://user-images.githubusercontent.com/74038190/216122041-518ac897-8d92-4c6b-9b3f-ca01dcaf38ee.png" width="100">
</div>

- 🛹 Comunidade de skatistas que inspirou este projeto
- 🗺️ [Leaflet.js](https://leafletjs.com/) pelo mapa interativo
- 🎨 [Bootstrap](https://getbootstrap.com/) pelo framework CSS
- 💫 [SweetAlert2](https://sweetalert2.github.io/) pelos alertas bonitos
- ☁️ [Cloudinary](https://cloudinary.com/) pelo armazenamento de imagens
- ✨ [Animate.css](https://animate.style/) pelas animações
- 🤝 Todos os contribuidores futuros

---

## 📊 Status do Projeto

```
Progresso Geral: █████████░ 85%

Funcionalidades Core:   ██████████ 100%
Frontend:               █████████░  90%
Backend:                █████████░  92%
Upload de Imagens:      ██████████ 100% ✨
Testes:                 ██░░░░░░░░  20%
Documentação:           █████████░  85%
```

---

<div align="center">

<img src="https://user-images.githubusercontent.com/74038190/212284100-561aa473-3905-4a80-b561-0d28506553ee.gif" width="600">

### ⭐ Se este projeto te ajudou, deixe uma estrela!

### 🛹 Feito com ❤️ por skatistas, para skatistas

[![GitHub Stars](https://img.shields.io/github/stars/DeathHapyness/ridemap?style=social)](https://github.com/DeathHapyness/ridemap/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/DeathHapyness/ridemap?style=social)](https://github.com/DeathHapyness/ridemap/network/members)
[![GitHub Watchers](https://img.shields.io/github/watchers/DeathHapyness/ridemap?style=social)](https://github.com/DeathHapyness/ridemap/watchers)

**[⬆ Voltar ao topo](#-ridemap)**

</div>
