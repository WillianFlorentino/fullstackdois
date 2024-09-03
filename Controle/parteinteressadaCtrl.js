import Parteinteressada from "../Modelo/parteinteressada.js";

export default class ParteinteressadaCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const { nome, telefone, endereco, profissao } = dados;
            if (nome && telefone && endereco && profissao) {
                const parteinteressada = new Parteinteressada(0, nome, telefone, endereco, profissao);
                parteinteressada.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": parteinteressada.codigo,
                        "mensagem": "Parte interessada incluída com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao registrar a parte interessada: " + erro.message
                    });
                });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os campos (nome, telefone, endereço, profissão)!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar uma parte interessada!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const { codigo, nome, telefone, endereco, profissao } = dados;
            if (codigo && nome && telefone && endereco && profissao) {
                const parteinteressada = new Parteinteressada(codigo, nome, telefone, endereco, profissao);
                parteinteressada.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Parte interessada atualizada com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao atualizar a parte interessada: " + erro.message
                    });
                });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código, nome, telefone, endereço e profissão para atualizar a parte interessada!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar uma parte interessada!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const { codigo } = dados;
            if (codigo) {
                const parteinteressada = new Parteinteressada(codigo);
                parteinteressada.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Parte interessada excluída com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao excluir a parte interessada: " + erro.message
                    });
                });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código da parte interessada para excluí-la!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir uma parte interessada!"
            });
        }
    }

    consultarPorNome(requisicao, resposta) {
        resposta.type('application/json');
        let nome = requisicao.params.nome || "";
        if (requisicao.method === "GET") {
            const parteinteressada = new Parteinteressada();
            parteinteressada.consultarPorNome(nome).then((listaPartesinteressadas) => {
                resposta.json({
                    "status": true,
                    "listaPartesinteressadas": listaPartesinteressadas
                });
            }).catch((erro) => {
                resposta.json({
                    "status": false,
                    "mensagem": "Não foi possível obter as partes interessadas: " + erro.message
                });
            });
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar partes interessadas!"
            });
        }
    }

    consultarPorTelefone(requisicao, resposta) {
        resposta.type('application/json');
        let telefone = requisicao.params.telefone || "";
        if (requisicao.method === "GET") {
            const parteinteressada = new Parteinteressada();
            parteinteressada.consultarPorTelefone(telefone).then((listaPartesinteressadas) => {
                resposta.json({
                    "status": true,
                    "listaPartesinteressadas": listaPartesinteressadas
                });
            }).catch((erro) => {
                resposta.json({
                    "status": false,
                    "mensagem": "Não foi possível obter as partes interessadas: " + erro.message
                });
            });
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar partes interessadas!"
            });
        }
    }
}