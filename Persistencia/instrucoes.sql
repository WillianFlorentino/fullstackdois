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