import Colaborador from '../Modelo/colaborador.js';
import Cargo from '../Modelo/cargo.js';
import conectar from './conexao.js';

export default class ColaboradorDAO {

    constructor() {
        this.init();
    }

    async init() {
        try 
        {
            const conexao = await conectar(); //retorna uma conexão
            const sql = `
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
            )
        `;
            await conexao.execute(sql);
            global.poolConexoes.releaseConnection(conexao);
        }
        catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }


    async gravar(colaborador) {
        if (colaborador instanceof Colaborador) {
            const sql = `INSERT INTO colaborador(colab_nome, colab_cpf,
                colab_contato, colab_endereco, colab_bairro, colab_numero, colab_dataNascimento, colab_email, carg_codigo)
                VALUES(?,?,?,?,?,?,str_to_date(?,"%d/%m/%Y"),?,?)`;
            const parametros = [colaborador.nome, colaborador.cpf, colaborador.contato,
                colaborador.endereco, colaborador.bairro, colaborador.numero, colaborador.dataNascimento, colaborador.email, colaborador.cargo.codigo];

            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            colaborador.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }
    async atualizar(colaborador) {
        if (colaborador instanceof Colaborador) {
            const sql = `UPDATE colaborador SET colab_nome = ?, colab_cpf = ?,
            colab_contato = ?, colab_endereco = ?, colab_bairro = ?, colab_numero = ?, colab_dataNascimento = str_to_date(?,"%d/%m/%Y"), colab_email = ?, carg_codigo = ?
            WHERE colab_codigo = ?`;
            const parametros = [colaborador.nome, colaborador.cpf, colaborador.contato,
                colaborador.endereco, colaborador.bairro, colaborador.numero, colaborador.dataNascimento, colaborador.email, colaborador.cargo.codigo, colaborador.codigo];

            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(colaborador) {
        if (colaborador instanceof Colaborador) {
            const sql = `DELETE FROM colaborador WHERE colab_codigo = ?`;
            const parametros = [colaborador.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termo) {
        if (!termo){
            termo="";
        }
        //termo é um número
        const conexao = await conectar();
        let listaColaboradores = [];
        if (!isNaN(parseInt(termo))){
            //consulta pelo código do colaborador
            const sql = `	SELECT p.colab_codigo, p.colab_nome,
	                        p.colab_cpf, p.colab_contato, p.colab_endereco, p.colab_bairro, p.colab_numero, p.colab_dataNascimento,
	                        p.colab_email, c.carg_codigo, c.carg_descricao
	                        FROM colaborador p 
                            INNER JOIN cargo c ON p.carg_codigo = c.carg_codigo
	                        WHERE p.colab_codigo = ?
	                        ORDER BY p.colab_nome;
                                            
            `;
            const parametros=[termo];
            const [registros, campos] = await conexao.execute(sql,parametros);
            global.poolConexoes.releaseConnection(conexao);
            for (const registro of registros){
                const colaborador = new Colaborador(registro.colab_codigo,registro.colab_nome,
                                            registro.colab_cpf,registro.colab_contato,
                                            registro.colab_endereco, registro.colab_bairro, registro.colab_numero, registro.colab_dataNascimento, registro.colab_email
                                            );
                listaColaboradores.push(colaborador);
            }
        }
        else
        {
            //consulta pelo nome do colaborador
            const sql = `SELECT p.colab_codigo, p.colab_nome,
	                    p.colab_cpf, p.colab_contato, p.colab_endereco, p.colab_bairro, p.colab_numero, p.colab_dataNascimento,
	                    p.colab_email, c.carg_codigo, c.carg_descricao
	                    FROM colaborador p 
                        INNER JOIN cargo c ON p.carg_codigo = c.carg_codigo
                         WHERE p.colab_nome like ?
                         ORDER BY p.colab_nome`;
            const parametros=['%'+termo+'%'];
            const [registros, campos] = await conexao.execute(sql,parametros);
            for (const registro of registros){
                const cargo = new Cargo(registro.carg_codigo, registro.carg_descricao);
                const colaborador = new Colaborador(registro.colab_codigo,registro.colab_nome,
                                            registro.colab_cpf,registro.colab_contato,
                                            registro.colab_endereco, registro.colab_bairro, registro.colab_numero, registro.colab_dataNascimento, registro.colab_email, cargo
                                            );
                listaColaboradores.push(colaborador);
            }
        }

        return listaColaboradores;
    }
}