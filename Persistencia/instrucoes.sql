CREATE DATABASE sistema;

USE sistema;

CREATE TABLE cargo(
    carg_codigo INT NOT NULL AUTO_INCREMENT,
    carg_descricao VARCHAR(100) NOT NULL,
    CONSTRAINT pk_cargo PRIMARY KEY(carg_codigo)
);

            CREATE TABLE IF NOT EXISTS COLABORADOR(
                colab_codigo INT NOT NULL AUTO_INCREMENT,
                colab_nome VARCHAR(50) NOT NULL,
                colab_cpf VARCHAR(14) NOT NULL,
                colab_contato VARCHAR(15) NOT NULL,
                colab_endereco VARCHAR(50) NOT NULL,
                colab_bairro VARCHAR(50) NOT NULL,
                colab_numero DECIMAL(10,0) NOT NULL,
                colab_dataNascimento date NOT NULL,
                colab_email VARCHAR(50) NOT NULL,
                carg_codigo INT NOT NULL,
                CONSTRAINT pk_colaborador PRIMARY KEY(colab_codigo),
                CONSTRAINT fk_cargo FOREIGN KEY(carg_codigo) REFERENCES cargo(carg_codigo)
            );



CREATE TABLE parteinteressada (
    codigo INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    telefone VARCHAR(15) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    profissao VARCHAR(255) NOT NULL
);

CREATE TABLE projeto (
    codigo INT AUTO_INCREMENT PRIMARY KEY,
    parteinteressada_codigo INT,
    nomeprojeto VARCHAR(255) NOT NULL,
    datainicio_projeto TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    totalcapital DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (parteinteressada_codigo) REFERENCES parteinteressada(codigo)
);


CREATE TABLE projeto_colaborador (
    projeto_codigo INT NOT NULL,
    colab_codigo INT NOT NULL,
    funcao VARCHAR(255) NOT NULL,
    PRIMARY KEY (projeto_codigo, colab_codigo),
    FOREIGN KEY (projeto_codigo) REFERENCES projeto(codigo),
    FOREIGN KEY (colab_codigo) REFERENCES colaborador(colab_codigo)
);
