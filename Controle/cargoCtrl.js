//camada de interface da API que traduz HTTP
import Cargo from "../Modelo/cargo.js";



export default class CargoCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const descricao = dados.descricao;
            if (descricao) {
                const cargo = new Cargo(0, descricao);
                //resolver a promise
                cargo.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": cargo.codigo,
                        "mensagem": "Cargo incluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar o cargo:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe a descrição do cargo!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar um cargo!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            const descricao = dados.descricao;
            if (codigo && descricao) {
                const cargo = new Cargo(codigo, descricao);
                //resolver a promise
                cargo.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Cargo atualizado com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar o cargo:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código e a descrição do cargo!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar um cargo!"
            });
        }
    }

    // excluir(requisicao, resposta) {
    //     resposta.type('application/json');
    //     if (requisicao.method === 'DELETE') {
    //         const codigo = requisicao.params.codigo; // Obtém o código do cargo da URL
    //         if (codigo) {
    //             const cargo = new Cargo(codigo);
    //             cargo.possuiColaboradores().then(possui => {
    //                 if (!possui) {
    //                     cargo.excluir().then(() => {
    //                         resposta.status(200).json({
    //                             "status": true,
    //                             "mensagem": "Cargo excluído com sucesso!"
    //                         });
    //                     }).catch((erro) => {
    //                         resposta.status(500).json({
    //                             "status": false,
    //                             "mensagem": "Erro ao excluir o cargo: " + erro.message
    //                         });
    //                     });
    //                 } else {
    //                     resposta.status(500).json({
    //                         "status": false,
    //                         "mensagem": "Este cargo possui colaborador(es) e não pode ser excluído!"
    //                     });
    //                 }
    //             }).catch((erro) => {
    //                 resposta.status(500).json({
    //                     "status": false,
    //                     "mensagem": "Erro ao verificar colaboradores: " + erro.message
    //                 });
    //             });
    //         } else {
    //             resposta.status(400).json({
    //                 "status": false,
    //                 "mensagem": "Por favor, informe o código do cargo!"
    //             });
    //         }
    //     } else {
    //         resposta.status(400).json({
    //             "status": false,
    //             "mensagem": "Por favor, utilize o método DELETE para excluir um cargo!"
    //         });
    //     }
    // }
    
    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE') {
            const codigo = requisicao.params.codigo; // Código vem da URL
            if (codigo) {
                const cargo = new Cargo(codigo);
                cargo.possuiColaboradores().then(possui => {
                    if (!possui) {
                        cargo.excluir().then(() => {
                            resposta.status(200).json({
                                "status": true,
                                "mensagem": "Cargo excluído com sucesso!"
                            });
                        }).catch((erro) => {
                            resposta.status(500).json({
                                "status": false,
                                "mensagem": "Erro ao excluir o cargo: " + erro.message
                            });
                        });
                    } else {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Este cargo possui colaborador(es) e não pode ser excluído!"
                        });
                    }
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao verificar colaboradores: " + erro.message
                    });
                });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código do cargo!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir um cargo!"
            });
        }
    }
    


    consultar(requisicao, resposta) {
        resposta.type('application/json');
        //express, por meio do controle de rotas, será
        //preparado para esperar um termo de busca
        let termo = requisicao.params.termo;
        if (!termo){
            termo = "";
        }
        if (requisicao.method === "GET"){
            const cargo = new Cargo();
            cargo.consultar(termo).then((listaCargos)=>{
                resposta.json(
                    {
                        status:true,
                        listaCargos
                    });
            })
            .catch((erro)=>{
                resposta.json(
                    {
                        status:false,
                        mensagem:"Não foi possível obter os cargos: " + erro.message
                    }
                );
            });
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar cargos!"
            });
        }
    }
}