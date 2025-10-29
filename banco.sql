CREATE DATABASE IF NOT EXISTS inova_tech_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE inova_tech_db;

CREATE TABLE IF NOT EXISTS ordens_servico (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cliente_nome VARCHAR(255) NOT NULL,
  equipamento VARCHAR(200) NOT NULL,
  descricao_problema TEXT NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'Aberto',
  data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO ordens_servico (cliente_nome, equipamento, descricao_problema, status)
VALUES
('Suzana', 'Roteador 4331', 'Porta queimada', 'Aberto'),
('Sofia', 'Smart TV LG', 'Não conecta no Wi-Fi', 'Aberto'),
('Samilly', 'Laptop Positivo', 'Reinicia sozinho', 'Aberto');
