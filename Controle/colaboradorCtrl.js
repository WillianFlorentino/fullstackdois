import Colaborador from "../Modelo/colaborador.js";
import Cargo from "../Modelo/cargo.js";

export default class ColaboradorCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const { nome, cpf, contato, endereco, bairro, numero, dataNascimento, email, cargo } = dados;
    
            // Verificar se todos os campos obrigatórios estão presentes
            if (nome && cpf && contato && endereco && bairro && numero > 0 && dataNascimento && email && cargo && cargo.codigo > 0) {
               const cargoObj = new Cargo(cargo.codigo);
                const colaborador = new Colaborador(0, nome, cpf, contato, endereco, bairro, numero, dataNascimento, email, cargoObj);
    
                colaborador.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": colaborador.codigo,
                        "mensagem": "Colaborador incluído com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao registrar o colaborador: " + erro.message
                    });
                });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, preencha todos os campos obrigatórios corretamente!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar um colaborador!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const { codigo, nome, cpf, contato, endereco, bairro, numero, dataNascimento, email, cargo } = dados;
            const carg_codigo = cargo.codigo;
    
            if (
                nome && cpf && contato && endereco && bairro && numero &&
                dataNascimento && email && carg_codigo > 0
            ) {
                const cargoObj = new Cargo(carg_codigo);
                const colaborador = new Colaborador(codigo, nome, cpf, contato, endereco, bairro, numero, dataNascimento, email, cargoObj);
    
                colaborador.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Colaborador atualizado com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao atualizar o colaborador: " + erro.message
                    });
                });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados do colaborador segundo a documentação da API!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar um colaborador!"
            });
        }
    }
    

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            if (codigo) {
                const colaborador = new Colaborador(codigo);
                colaborador.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Colaborador excluído com sucesso!"
                    });
                }).catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao excluir o colaborador: " + erro.message
                        });
                    });
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código do colaborador!"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir um colaborador!"
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');
        let termo = requisicao.params.termo;
        if (!termo) {
            termo = "";
        }
        if (requisicao.method === "GET") {
            const colaborador = new Colaborador();
            colaborador.consultar(termo).then((listaColaboradores) => {
                resposta.json(
                    {
                        status: true,
                        listaColaboradores
                    });
            }).catch((erro) => {
                resposta.json(
                    {
                        status: false,
                        mensagem: "Não foi possível obter os colaboradores: " + erro.message
                    }
                );
            });
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar colaboradores!"
            });
        }
    }
}
