import Projeto from "../Modelo/projeto.js";
import Parteinteressada from "../Modelo/parteinteressada.js";
import Cargo from "../Modelo/cargo.js";
import Colaborador from "../Modelo/colaborador.js";
import ProjetoColaborador from "../Modelo/ProjetoColaborador.js";
import conectar from "./conexao.js";

export default class ProjetoDAO{
    async gravar(projeto) {
        if (projeto instanceof Projeto) {
            const conexao = await conectar();
            await conexao.beginTransaction();
            try {
                const sql = 'INSERT INTO projeto(parteinteressada_codigo, nomeprojeto, datainicio_projeto, totalcapital) VALUES(?, ?, str_to_date(?,"%d/%m/%Y"), ?)';
                const parametros = [projeto.parteinteressada.codigo, projeto.nomeprojeto, projeto.datainicio, projeto.totalcapital];
                console.log("Parâmetros para projeto:", parametros); 
                const retorno = await conexao.execute(sql, parametros);
                projeto.codigo = retorno[0].insertId;
    
                const sql2 = 'INSERT INTO projeto_colaborador(projeto_codigo, colab_codigo, funcao, parteinteressada_codigo) VALUES(?, ?, ?, ?)';
                for (const item of projeto.colaboradores) {
                    const parametros2 = [projeto.codigo, item.colaborador.codigo, item.funcao, projeto.parteinteressada.codigo];
                    console.log("Parâmetros para colaborador:", parametros2);
                    await conexao.execute(sql2, parametros2);
                }
                await conexao.commit();
            } catch (error) {
                await conexao.rollback();
                throw error;
            }
        }
    }
    

    async atualizar(projeto){

    }

    async excluir(projeto){

    }

    async consultar(termoBusca){
        const listaProjetos = [];
        if (!isNaN(termoBusca)){
            const conexao = await conectar();
            const sql = `SELECT 
                p.codigo AS projeto_codigo,
                p.parteinteressada_codigo,
                p.nomeprojeto,
                p.datainicio_projeto,
                p.totalcapital,
                c.nome AS parteinteressada_nome,
                c.endereco AS parteinteressada_endereco,
                c.telefone AS parteinteressada_telefone,
                c.profissao AS parteinteressada_profissao,
                colab.colab_codigo,
                colab.colab_nome,
                colab.colab_cpf,
                colab.colab_contato,
                colab.colab_endereco,
                colab.colab_bairro,
                colab.colab_numero,
                colab.colab_dataNascimento,
                colab.colab_email,
                carg.carg_codigo,
                carg.carg_descricao,
                i.funcao AS cargo_funcao
            FROM 
                projeto p
            INNER JOIN 
                parteinteressada c ON p.parteinteressada_codigo = c.codigo
            INNER JOIN 
                projeto_colaborador i ON i.projeto_codigo = p.codigo
            INNER JOIN 
                colaborador colab ON colab.colab_codigo = i.colab_codigo
            INNER JOIN 
                cargo carg ON colab.carg_codigo = carg.carg_codigo
            WHERE 
                p.codigo = ?
            `;
            const [registros, campos] = await conexao.execute(sql, [termoBusca]);
            if (registros.length > 0) {
    
                const parteinteressada = new Parteinteressada(registros[0].parteinteressada_codigo, registros[0].parteinteressada_nome, registros[0].parteinteressada_telefone, registros[0].parteinteressada_endereco, registros[0].parteinteressada_profissao);
                let listaItensProjeto = [];
                for (const registro of registros){
                    const cargo = new Cargo(registro.carg_codigo, registro.carg_descricao);
                    const colaborador = new Colaborador(registro.colab_codigo, registro.colab_nome, registro.colab_cpf, registro.colab_contato, registro.colab_endereco, registro.colab_bairro, registro.colab_numero, registro.colab_dataNascimento, registro.colab_email, cargo);
                    const projetoColaborador = new ProjetoColaborador(colaborador, registro.cargo_funcao, registro.dataEntrada);
                    listaItensProjeto.push(projetoColaborador);
                }
                const projeto = new Projeto(registros[0].projeto_codigo, registros[0].nomeprojeto, parteinteressada, registros[0].datainicio_projeto, registros[0].totalcapital, listaItensProjeto);
                listaProjetos.push(projeto);
            }
    
        }
    
        return listaProjetos;
    }
    

}