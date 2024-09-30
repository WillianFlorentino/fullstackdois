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
        const colaboradores = dados.itens; // Use "colaboradores" ao invés de "itensProjeto"

        const objParteinteressada = new Parteinteressada(parteinteressada.codigo);

        let itens = [];
        for (const item of colaboradores) {
            const colaborador = new Colaborador(item.codigo);

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
        

    // consultar(requisicao, resposta) {
    //     resposta.type('application/json');
    //     if (requisicao.method === "GET") {
    //         let termo = requisicao.params.termo;
    //         if (!isNaN(termo)){
    //             const projeto = new Projeto(0);
    //             projeto.consultar(termo).then((listaProjetos)=>{
    //                 resposta.status(200).json({
    //                     "status": true,
    //                     "listaProjetos": listaProjetos
    //                 })
    //             })
    //             .catch((erro)=>{
    //                 resposta.status(500).json({
    //                     "status": false,
    //                     "mensagem": "Erro ao consultar o Projeto: " + erro.message
    //                 });
    //             })
    //         }
    //         else{
    //             resposta.status(400).json({
    //                 "status": false,
    //                 "mensagem": "Favor informar um código de Projeto válido: " + erro.message
    //             })
    //         }
    //     }
    //     else{
    //         resposta.status(400).json({
    //               "status": false,
    //               "mensagem": "Requisição inválida"
    //         })
    //     }
    // }


    //aqui começa o novo

    // async consultar(requisicao, resposta) {
    //     resposta.type('application/json');
        
    //     if (requisicao.method === 'GET') {
    //         let termo = requisicao.params.termo;
    //         const projeto = new Projeto(0);  // Instancia a classe Projeto
        
    //         // Se 'termo' for um número, consulta um projeto específico
    //         if (termo && !isNaN(termo)) {
    //             projeto.consultar(termo).then((listaProjetos) => {
    //                 resposta.status(200).json({
    //                     "status": true,
    //                     "listaProjetos": listaProjetos
    //                 });
    //             }).catch((erro) => {
    //                 resposta.status(500).json({
    //                     "status": false,
    //                     "mensagem": "Erro ao consultar o projeto: " + erro.message
    //                 });
    //             });
    //         } 
    //         // Se 'termo' não for fornecido, consulta todos os projetos
    //         else {
    //             projeto.consultarTodos().then((listaProjetos) => {
    //                 resposta.status(200).json({
    //                     "status": true,
    //                     "listaProjetos": listaProjetos
    //                 });
    //             }).catch((erro) => {
    //                 resposta.status(500).json({
    //                     "status": false,
    //                     "mensagem": "Erro ao consultar os projetos: " + erro.message
    //                 });
    //             });
    //         }
    //     } else {
    //         resposta.status(400).json({
    //             "status": false,
    //             "mensagem": "Requisição inválida!"
    //         });
    //     }
    // }
    
    // async consultarTodos(requisicao, resposta) {
    //     resposta.type('application/json');
        
    //     if (requisicao.method === 'GET') {
    //         const projeto = new Projeto(0);  // Instancia a classe Projeto
        
    //         projeto.consultarTodos().then((listaProjetos) => {
    //             resposta.status(200).json({
    //                 "status": true,
    //                 "listaProjetos": listaProjetos
    //             });
    //         }).catch((erro) => {
    //             resposta.status(500).json({
    //                 "status": false,
    //                 "mensagem": "Erro ao consultar os projetos: " + erro.message
    //             });
    //         });
    //     } else {
    //         resposta.status(400).json({
    //             "status": false,
    //             "mensagem": "Requisição inválida!"
    //         });
    //     }
    // }

    consultar(requisicao, resposta){
        resposta.type('application/json');  
        if (requisicao.method === 'GET'){
            //tentar obter o código do pedido a partir dos parâmetros da URL 
            let termo = requisicao.params.termo;
            /*if (!isNaN(termo)){*/
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
                    "mensagem": "Erro ao consultar o projeto: " + erro.message
                });
            });
            /*}
            else{
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe um códido de pedido válido!"
                });
            }*/
        }
        else{
            resposta.status(400).json({
                "status": false,
                "mensagem": "Requisição inválida!"
            })
        }     
    }
}
