import Cargo from "../Modelo/cargo.js";
import conectar from "./conexao.js";
//DAO = Data Access Object -> Objeto de acesso aos dados
export default class CargoDAO{

    constructor() {
        this.init();
    }
    
    async init() {
        try 
        {
            const conexao = await conectar(); //retorna uma conexão
            const sql = `
                CREATE TABLE IF NOT EXISTS cargo(
                    carg_codigo INT NOT NULL AUTO_INCREMENT,
                    carg_descricao VARCHAR(100) NOT NULL,
                    CONSTRAINT pk_cargo PRIMARY KEY(carg_codigo)
                );`;
            await conexao.execute(sql);
            global.poolConexoes.releaseConnection(conexao);
            // await conexao.release();
        }
        catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }
    async gravar(cargo){
        if (cargo instanceof Cargo){
            const sql = "INSERT INTO cargo(carg_descricao) VALUES(?)"; 
            const parametros = [cargo.descricao];
            const conexao = await conectar(); //retorna uma conexão
            const retorno = await conexao.execute(sql,parametros); //prepara a sql e depois executa
            cargo.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(cargo){
        if (cargo instanceof Cargo){
            const sql = "UPDATE cargo SET carg_descricao = ? WHERE carg_codigo = ?"; 
            const parametros = [cargo.descricao, cargo.codigo];
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql,parametros); //prepara a sql e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(cargo){
        if (cargo instanceof Cargo){
            //EXCLUIR O CARGO IMPLICA EM EXCLUIR ANTES OS COLABORADORES, CASO CONTRÁRIO HAVERÁ UMA VIOLAÇÃO DE INTEGRIDADE REFERENCIAL NO BANCO DE DADOS RELACIONAL (NÃO DEVE SER POSSÍVEL EXCLUIR UM CARGO CASO EXISTE COLABORADOR COM ESSE CARGO)
            //ESSA RESTRIÇÃO DEVE SER IMPLEMENTADA NA LÓGICA DE NEGÓCIO DA APLICAÇÃO (SERÁ FEITO NA CAMADA DE CONTROLE A VERIFICAÇÃO SE EXISTE UM COLABORADOR COM O CARGO QUE TENTARÁ SER EXCLUÍDO)
            const sql = "DELETE FROM cargo WHERE carg_codigo = ?"; 
            const parametros = [cargo.codigo];
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql,parametros); //prepara a sql e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(parametroConsulta) {
        let sql = '';
        let parametros = [];
    
        if (!isNaN(parseInt(parametroConsulta))) {
            // Consultar pelo código do cargo
            sql = 'SELECT * FROM cargo WHERE carg_codigo = ? ORDER BY carg_descricao';
            parametros = [parametroConsulta];
        } else {
            // Consultar pela descrição
            if (!parametroConsulta) {
                parametroConsulta = '';
            }
            sql = 'SELECT * FROM cargo WHERE carg_descricao LIKE ?';
            parametros = ['%' + parametroConsulta + '%'];
        }
    
        const conexao = await conectar();
        try {
            const [registros] = await conexao.execute(sql, parametros);
            let listaCargos = [];
            for (const registro of registros) {
                const cargo = new Cargo(registro.carg_codigo, registro.carg_descricao);
                listaCargos.push(cargo);
            }
            return listaCargos;
        } catch (erro) {
            console.error('Erro ao consultar cargos:', erro);
            throw erro; // Gera erro se algo falhar
        } finally {
            global.poolConexoes.releaseConnection(conexao); // Libera a conexão no final
        }
    }
    
    //verifica a existencia de colaboradores para x cargo

    async possuiColaboradores(cargo) {
        if (cargo instanceof Cargo) {
            const sql = `SELECT count(*) as qtd FROM colaborador p
                        INNER JOIN cargo c ON p.carg_codigo = c.carg_codigo
                        WHERE c.carg_codigo = ?`;
            const parametros = [cargo.codigo];
            const conexao = await conectar(); // Cria a conexão corretamente
            try {
                const [registros] = await conexao.execute(sql, parametros);
                return registros[0].qtd > 0;
            } catch (erro) {
                console.error('Erro ao verificar colaboradores:', erro);
                throw erro; // Gera erro se algo falhar
            } finally {
                global.poolConexoes.releaseConnection(conexao); // Libera a conexão no final
            }
        }
    }
}