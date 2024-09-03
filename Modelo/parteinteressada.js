import ParteinteressadaDAO from "../Persistencia/parteinteressadaDAO.js";

export default class Parteinteressada {
    #codigo;
    #nome;
    #telefone;
    #endereco;
    #profissao;

    constructor(codigo, nome, telefone, endereco, profissao) {
        this.#codigo = codigo;
        this.#nome = nome;
        this.#telefone = telefone;
        this.#endereco = endereco;
        this.#profissao = profissao;
    }

    // Métodos de acesso (get) e modificação (set)

    // Código
    get codigo() {
        return this.#codigo;
    }

    set codigo(novoCodigo) {
        if (novoCodigo === "" || typeof novoCodigo !== "number") {
            console.log("Formato de dado inválido");
        } else {
            this.#codigo = novoCodigo;
        }
    }

    // Nome
    get nome() {
        return this.#nome;
    }

    set nome(novoNome) {
        if (novoNome === "") {
            console.log("Dado não preenchido");
        } else {
            this.#nome = novoNome;
        }
    }

    // Telefone
    get telefone() {
        return this.#telefone;
    }

    set telefone(novoTelefone) {
        if (novoTelefone === "" || novoTelefone.length !== 11) {
            console.log("Formato de telefone inválido");
        } else {
            this.#telefone = novoTelefone;
        }
    }

    // Endereço
    get endereco() {
        return this.#endereco;
    }

    set endereco(novoEndereco) {
        if (novoEndereco === "") {
            console.log("Dado não preenchido");
        } else {
            this.#endereco = novoEndereco;
        }
    }

    //Profissao

    get profissao() {
        return this.#profissao;
    }

    set profissao(novaProfissao) {
        if (novaProfissao === "") {
            console.log("Dado não preenchido");
        } else {
            this.#profissao = novaProfissao;
        }
    }

    // JSON
    toJSON() {
        return {
            'codigo': this.#codigo,
            'nome': this.#nome,
            'telefone': this.#telefone,
            'endereco': this.#endereco,
            'profissao': this.#profissao
        };
    }

    async gravar() {
        const parteinteressadaDAO = new ParteinteressadaDAO();
        this.codigo = await parteinteressadaDAO.adicionar(this);
    }

    async atualizar() {
        const parteinteressadaDAO = new ParteinteressadaDAO();
        await parteinteressadaDAO.alterar(this);
    }

    async excluir() {
        const parteinteressadaDAO = new ParteinteressadaDAO();
        await parteinteressadaDAO.deletar(this);
    }

    async consultarPorNome(nome) {
        const parteinteressadaDAO = new ParteinteressadaDAO();
        const listaPartesinteressadas = await parteinteressadaDAO.consultar(nome);
        return listaPartesinteressadas;
    }

    async consultarPorTelefone(telefone) {
        const parteinteressadaDAO = new ParteinteressadaDAO();
        const listaPartesinteressadas = await parteinteressadaDAO.consultarTelefone(telefone);
        return listaPartesinteressadas;
    }
}