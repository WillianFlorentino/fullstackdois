
import ColaboradorDAO from "../Persistencia/colaboradorDAO.js";
import Cargo from "./cargo.js"; //vai importar a classe cargo

//UM COLABORADOR POSSUI UM NOVO ATRIBUTO QUE É O CARGO
//NO BANCO DE DADOS ISSO É FEITO PELA FK/CHAVE ESTRANGEIRA


export default class Colaborador{
    #codigo;
    #nome;
    #cpf;
    #contato;
    #endereco;
    #bairro;
    #numero;
    #dataNascimento;
    #email;
    #cargo;


    constructor(codigo=0,nome="", cpf=0, 
                contato=0, endereco=0, bairro=0, numero=0, dataNascimento='', email=0, cargo=null
                ){
        this.#codigo=codigo;
        this.#nome=nome;
        this.#cpf=cpf;
        this.#contato=contato;
        this.#endereco=endereco;
        this.#bairro=bairro;
        this.#numero=numero;
        this.#dataNascimento=dataNascimento;
        this.#email=email;
        this.#cargo=cargo;
        
    }

    get codigo(){
        return this.#codigo;
    }
    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }

    get nome(){
        return this.#nome;
    }

    set nome(novoNome){
        this.#nome=novoNome;
    }

    get cpf(){
        return this.#cpf;
    }

    set cpf(novoCpf){
        this.#cpf = novoCpf
    }

    get contato(){
        return this.#contato;
    }
    
    set contato(novoContato){
        this.#contato = novoContato
    }

    get endereco(){
        return this.#endereco;
    }

    set endereco(novoEndereco){
        this.#endereco = novoEndereco;
    }

    get bairro(){
        return this.#bairro;
    }

    set bairro(novoBairro){
        this.#bairro = novoBairro;
    }

    get numero(){
        return this.#numero;
    }

    set numero(novoNumero){
        this.#numero = novoNumero;
    }

    get dataNascimento(){
        return this.#dataNascimento;
    }

    set dataNascimento(novaDataNascimento){
        this.#dataNascimento = novaDataNascimento;
    }

    get email(){
        return this.#email;
    }

    set email(novoEmail){
        this.#email = novoEmail;
    }

    get cargo(){
        return this.#cargo;
    }

    set cargo(novoCargo){
        if (novoCargo instanceof Cargo){
            this.#cargo = novoCargo
        }
    }

    toJSON(){
        return {
            codigo:this.#codigo,
            nome:this.#nome,
            cpf:this.#cpf,
            contato:this.#contato,
            endereco:this.#endereco,
            bairro:this.#bairro,
            numero:this.#numero,
            dataNascimento: new Date(this.#dataNascimento).toLocaleDateString(),
            email:this.#email,
            cargo:this.#cargo.toJSON() //JS já faz isso ".toJSON"
        }
    }

     //camada de modelo acessa a camada de persistencia
     async gravar(){
        const colabDAO = new ColaboradorDAO();
        await colabDAO.gravar(this);
     }
 
     async excluir(){
        const colabDAO = new ColaboradorDAO();
        await colabDAO.excluir(this);
     }
 
     async atualizar(){
        const colabDAO = new ColaboradorDAO();
        await colabDAO.atualizar(this);
     }
 
     async consultar(termo){
        const colabDAO = new ColaboradorDAO();
        return await colabDAO.consultar(termo);
     }

}