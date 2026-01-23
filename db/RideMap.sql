-- TABELA: usuarios
-- =========================================

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


-- =========================================
-- TABELA: pistas
-- =========================================

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

-- =========================================
-- TABELA: notificacoes
-- =========================================

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

-- =========================================
-- TABELA: fotos_pistas
-- =========================================

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

-- =========================================
-- TABELA: fotos_perfil
-- =========================================

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

-- =========================================
-- TABELA: avaliacoes
-- =========================================

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

-- =========================================
-- TABELA: usuarios_banidos
-- =========================================

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

CREATE TABLE avisos (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('info', 'warning', 'success')),
    mensagem TEXT NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expira_em TIMESTAMP NULL
);

CREATE INDEX idx_avisos_ativos ON avisos(ativo, expira_em, data_criacao DESC);