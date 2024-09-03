// export default class ItemPedido {
//     #produto;
//     #quantidade;
//     #precoUnitario;
//     #subtotal; 
    
//     constructor(produto, quantidade, precoUnitario,subtotal) {
//         this.#produto = produto;
//         this.#quantidade = quantidade;
//         this.#precoUnitario = precoUnitario;
//         this.#subtotal = quantidade * precoUnitario;
//     }

export default class ProjetoColaborador {
    #colaborador;
    #funcao;
    #dataEntrada;

    constructor(colaborador, funcao, dataEntrada) {
        this.#colaborador = colaborador;
        this.#funcao = funcao;
        this.#dataEntrada = dataEntrada;
    }


    // Métodos de acesso (get) e modificação (set)


    get colaborador() {
        return this.#colaborador;
    }

    set colaborador(novoColaborador) {
        this.#colaborador = novoColaborador;
    }
    
    //funcao
    get funcao() {
        return this.#funcao;
    }

    set funcao(novaFuncao) {
        this.#funcao = novaFuncao;
    }
    // Produto dataentrada
    
    get dataEntrada() {
        return this.#dataEntrada;
    }

    set dataEntrada(novaDataentrada) {
        this.#dataEntrada = novaDataentrada;
    }

    
    // JSON
    toJSON() {
        return {
            'colaborador': this.#colaborador,
            'funcao': this.#funcao,
            'dataEntrada': this.#dataEntrada
        };
    }
}

