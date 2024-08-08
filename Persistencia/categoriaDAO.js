import Categoria from "../Modelo/categoria.js";
import conectar from "./conexao.js";
//DAO = Data Access Object -> Objeto de acesso aos dados
export default class CategoriaDAO{

    constructor() {
        this.init();
    }
    
    async init() {
        try 
        {
            const conexao = await conectar(); //retorna uma conexão
            const sql = `
                CREATE TABLE IF NOT EXISTS categoria(
                    cat_codigo INT NOT NULL AUTO_INCREMENT,
                    cat_descricao VARCHAR(100) NOT NULL,
                    CONSTRAINT pk_categoria PRIMARY KEY(cat_codigo)
                );`;
            await conexao.execute(sql);
            await conexao.release();
        }
        catch (e) {
            console.log("Não foi possível iniciar o banco de dados: " + e.message);
        }
    }
    async gravar(categoria){
        if (categoria instanceof Categoria){
            const sql = "INSERT INTO categoria(cat_descricao) VALUES(?)"; 
            const parametros = [categoria.descricao];
            const conexao = await conectar(); //retorna uma conexão
            const retorno = await conexao.execute(sql,parametros); //prepara a sql e depois executa
            categoria.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(categoria){
        if (categoria instanceof Categoria){
            const sql = "UPDATE categoria SET cat_descricao = ? WHERE cat_codigo = ?"; 
            const parametros = [categoria.descricao, categoria.codigo];
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql,parametros); //prepara a sql e depois executa
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(categoria){
        if (categoria instanceof Categoria){
            const sql = "DELETE FROM categoria WHERE cat_codigo = ?"; 
            const parametros = [categoria.codigo];
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
            //consultar pelo código da categoria
            sql='SELECT * FROM categoria WHERE cat_codigo = ? order by cat_descricao';
            parametros = [parametroConsulta];
        }
        else{
            //consultar pela descricao
            if (!parametroConsulta){
                parametroConsulta = '';
            }
            sql = "SELECT * FROM categoria WHERE cat_descricao like ?";
            parametros = ['%'+parametroConsulta+'%'];
        }
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql,parametros);
        let listaCategorias = [];
        for (const registro of registros){
            const categoria = new Categoria(registro.cat_codigo,registro.cat_descricao);
            listaCategorias.push(categoria);
        }
        return listaCategorias;
    }
}