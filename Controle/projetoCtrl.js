import Colaborador from "../Modelo/colaborador.js";
import Parteinteressada from "../Modelo/parteinteressada.js";
import Projeto from "../Modelo/projeto.js";
import ProjetoColaborador from "../Modelo/ProjetoColaborador.js";
import ProjetoDAO from "../Persistencia/projetoDAO.js";

export default class ProjetoCtrl {

async gravar(requisicao, resposta) {
    resposta.type('application/json');
    if (requisicao.method === 'POST' && requisicao.is('application/json')) {
        const dados = requisicao.body;
        const nomeProjeto = dados.nomeprojeto;
        const parteinteressada = dados.parteinteressada;
        const dataProjeto = dados.datainicio; // já está no formato correto
        const totalProjeto = dados.totalcapital;
        const colaboradores = dados.colaboradores; // Use "colaboradores" ao invés de "itensProjeto"

        const objParteinteressada = new Parteinteressada(parteinteressada);

        let itens = [];
        for (const item of colaboradores) {
            const colaborador = new Colaborador(item.colaborador.codigo);

            const objItem = new ProjetoColaborador(colaborador, item.funcao, item.dataEntrada);
            itens.push(objItem);
        }

        const projeto = new Projeto(0, nomeProjeto, objParteinteressada, dataProjeto, totalProjeto, itens);
        projeto.gravar().then(() => {
            resposta.status(200).json({
                "status": true,
                "mensagem": "Projeto registrado com sucesso!",
                "codigo": projeto.codigo
            });
        })
        .catch((erro) => {
            resposta.status(500).json({
                "status": false,
                "mensagem": "Erro ao registrar o projeto: " + erro.message
            });
        });
    } else {
        resposta.status(400).json({
            "status": false,
            "mensagem": "Requisição inválida!"
        });
    }
}
        

    consultar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === "GET") {
            let termo = requisicao.params.termo;
            if (!isNaN(termo)){
                const projeto = new Projeto(0);
                projeto.consultar(termo).then((listaProjetos)=>{
                    resposta.status(200).json({
                        "status": true,
                        "listaProjetos": listaProjetos
                    })
                })
                .catch((erro)=>{
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao consultar o Projeto: " + erro.message
                    });
                })
            }
            else{
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Favor informar um código de Projeto válido: " + erro.message
                })
            }
        }
        else{
            resposta.status(400).json({
                  "status": false,
                  "mensagem": "Requisição inválida"
            })
        }
    }
}
