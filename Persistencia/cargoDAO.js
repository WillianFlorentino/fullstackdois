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
            await conexao.release();
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

    async consultar(parametroConsulta){
        let sql='';
        let parametros=[];
        //é um número inteiro?
        if (!isNaN(parseInt(parametroConsulta))){
            //consultar pelo código da cargo
            sql='SELECT * FROM cargo WHERE carg_codigo = ? order by carg_descricao';
            parametros = [parametroConsulta];
        }
        else{
            //consultar pela descricao
            if (!parametroConsulta){
                parametroConsulta = '';
            }
            sql = "SELECT * FROM cargo WHERE carg_descricao like ?";
            parametros = ['%'+parametroConsulta+'%'];
        }
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql,parametros);
        let listaCargos = [];
        for (const registro of registros){
            const cargo = new Cargo(registro.carg_codigo,registro.carg_descricao);
            listaCargos.push(cargo);
        }
        return listaCargos;
    }

    //verifica a existencia de colaboradores para x cargo

    async possuiColaboradores(cargo){
        if (cargo instanceof Cargo){
            const sql = `SELECT count(*) as qtd FROM colaborador p
	                    INNER JOIN cargo c ON p.carg_codigo = c.carg_codigo
	                    WHERE c.carg_codigo = ?`;
            const parametros = [cargo.codigo];
            const [registros] = await global.poolConexoes.execute(sql,parametros);
            return registros[0].qtd > 0;
        }
    }
}