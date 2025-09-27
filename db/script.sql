-- =====================================================
-- usuarios
-- =====================================================
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
--  pistas
-- =====================================================
CREATE TABLE pistas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(150) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    estado VARCHAR(2) NOT NULL,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    tipo ENUM('skate', 'patins', 'ambos') NOT NULL,
    dificuldade ENUM('facil', 'medio', 'dificil') NOT NULL,
    descricao TEXT,
    ativa BOOLEAN DEFAULT TRUE,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
--  avaliacoes
-- =====================================================
CREATE TABLE avaliacoes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    pista_id INT NOT NULL,
    nota INT NOT NULL CHECK (nota >= 1 AND nota <= 5),
    comentario TEXT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (pista_id) REFERENCES pistas(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_pista (usuario_id, pista_id)
);

-- =====================================================
-- fotos_perfil
-- =====================================================
CREATE TABLE fotos_perfil (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    url_foto VARCHAR(500) NOT NULL,
    data_upload TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- =====================================================
-- fotos_pistas
-- =====================================================
CREATE TABLE fotos_pistas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pista_id INT NOT NULL,
    usuario_id INT NOT NULL,
    url_foto VARCHAR(500) NOT NULL,
    descricao VARCHAR(255),
    data_upload TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (pista_id) REFERENCES pistas(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- =====================================================
-- perfis e avaliacoes de exemplo
-- =====================================================

INSERT INTO usuarios (nome, email, senha) VALUES
('João Silva', 'joao@email.com', '$2y$10$hash_exemplo'),
('Maria Santos', 'maria@email.com', '$2y$10$hash_exemplo'),
('Pedro Costa', 'pedro@email.com', '$2y$10$hash_exemplo');

INSERT INTO pistas (nome, cidade, estado, tipo, dificuldade, descricao) VALUES
('Pista do Centro', 'São Paulo', 'SP', 'skate', 'medio', 'Pista de rua no centro da cidade'),
('Bowl da Praia', 'Rio de Janeiro', 'RJ', 'skate', 'dificil', 'Bowl clássico na praia'),
('Pista Municipal', 'Belo Horizonte', 'MG', 'ambos', 'facil', 'Pista para iniciantes');

INSERT INTO avaliacoes (usuario_id, pista_id, nota, comentario) VALUES
(1, 1, 4, 'Ótima pista, bem conservada'),
(2, 1, 5, 'Perfeita para treinar manobras'),
(1, 2, 3, 'Muito difícil para meu nível'),
(3, 3, 5, 'Ideal para quem está começando');

INSERT INTO fotos_perfil (usuario_id, url_foto) VALUES
(1, '/uploads/perfil/joao_avatar.jpg'),
(2, '/uploads/perfil/maria_avatar.jpg');

INSERT INTO fotos_pistas (pista_id, usuario_id, url_foto, descricao) VALUES
(1, 1, '/uploads/pistas/pista_centro_1.jpg', 'Vista geral da pista'),
(1, 2, '/uploads/pistas/pista_centro_2.jpg', 'Área de street'),
(2, 1, '/uploads/pistas/bowl_praia_1.jpg', 'Bowl completo'),
(3, 3, '/uploads/pistas/municipal_1.jpg', 'Área para iniciantes');