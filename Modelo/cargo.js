import CargoDAO from "../Persistencia/cargoDAO.js";


export default class Cargo {
    //definição dos atributos privados
    #codigo;
    #descricao;

    constructor(codigo=0, descricao=''){
        this.#codigo=codigo;
        this.#descricao=descricao;
    }

    //métodos de acesso públicos

    get codigo(){
        return this.#codigo;
    }

    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }

    get descricao(){
        return this.#descricao;
    }

    set descricao(novaDesc){
        this.#descricao = novaDesc;
    }

    //override do método toJSON
    toJSON()     
    {
        return {
            codigo:this.#codigo,
            descricao:this.#descricao
        }
    }

    //camada de modelo acessa a camada de persistencia
    async gravar(){
        const cargDAO = new CargoDAO();
        await cargDAO.gravar(this);
    }

    async excluir(){
        const cargDAO = new CargoDAO();
        await cargDAO.excluir(this);
    }

    async atualizar(){
        const cargDAO = new CargoDAO();
        await cargDAO.atualizar(this);

    }

    async consultar(parametro){
        const cargDAO = new CargoDAO();
        return await cargDAO.consultar(parametro);
    }

    async possuiColaboradores(){
        const cargDAO = new CargoDAO();
        return await cargDAO.possuiColaboradores(this);
    }
}