
// export default class Pedido {
//     #codigo;
//     #cliente;
//     #data;
//     #total;
//     #produtos;

//     constructor(codigo, cliente, data,  total, produtos) {
//         this.#codigo = codigo;
//         this.#cliente = cliente;
//         this.#data = data;
//         this.#total = total;
//         this.#produtos = produtos;
//     }
import conectar from "../Persistencia/conexao.js";
import ProjetoDAO from "../Persistencia/projetoDAO.js"

export default class Projeto {
    #codigo;
    #nomeprojeto;
    #parteinteressada;
    #datainicio;
    #totalcapital;
    #colaboradores;

    constructor(codigo, nomeprojeto, parteinteressada, datainicio,  totalcapital, colaboradores) {
        this.#codigo = codigo;
        this.#nomeprojeto = nomeprojeto;
        this.#parteinteressada = parteinteressada;
        this.#datainicio = datainicio;
        this.#totalcapital = totalcapital;
        this.#colaboradores = colaboradores;
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

    get nomeprojeto() {
        return this.#nomeprojeto;
    }

    set nomeprojeto(novonomeprojeto) {
        this.#nomeprojeto = novonomeprojeto;
        
    }

    
    get parteinteressada() {
        return this.#parteinteressada;
    }

    set parteinteressada(novaparteinteressada) {
        this.#parteinteressada = novaparteinteressada;
        
    }

    // Data
    get datainicio() {
        return this.#datainicio;
    }

    set datainicio(novaDatainicio) {
        this.#datainicio = novaDatainicio;
    }

    
    get totalcapital() {
        return this.#totalcapital;
    }

    set totalcapital(novoTotalcapital) {
        this.#totalcapital = novoTotalcapital;
    }

    
    get colaboradores() {
        return this.#colaboradores;
    }

    set colaboradores(novosColaboradores) {
        this.#colaboradores = novosColaboradores;
    }
    // JSON
    toJSON() {
        return {
            'codigo': this.#codigo,
            'nomeprojeto': this.#nomeprojeto,
            'parteinteressada': this.#parteinteressada,
            'datainicio': this.#datainicio,
            'totalcapital': this.#totalcapital,
            'colaboradores': this.#colaboradores

        };
    }

    async gravar() {
        const projetoDAO = new ProjetoDAO();
        this.codigo = await projetoDAO.gravar(this);
    }

    async atualizar() {
        const projetoDAO = new ProjetoDAO();
        await projetoDAO.alterar(this);
    }

    async apagar() {
        const projetoDAO = new ProjetoDAO();
        await projetoDAO.deletar(this);
    }

    async consultar(termoBusca) {
        const projetoDAO = new ProjetoDAO();
        const listaProjetos = await projetoDAO.consultar(termoBusca);
        return listaProjetos;
    }
    
async consultarTodos() {
  return new Promise((resolve, reject) => {
    conectar().then((conexao) => {
      const sql = 'SELECT * FROM projeto';
      conexao.execute(sql).then(([resultados]) => {
        conexao.release(); 
        resolve(resultados);  
      }).catch((erro) => {
        conexao.destroy(); 
        reject(erro);  
      });
    }).catch((erro) => {
      reject(erro); 
    });
  });
}
}
