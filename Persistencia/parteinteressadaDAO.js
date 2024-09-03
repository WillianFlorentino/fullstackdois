import conectar from "./conexao.js";
import Parteinteressada from "../Modelo/parteinteressada.js";

export default class ParteinteressadaDAO {
    async adicionar(parteinteressada) {
        if (parteinteressada instanceof Parteinteressada) {
            const conexao = await conectar();
            const sql = 'INSERT INTO parteinteressada (nome, telefone, endereco, profissao) VALUES (?, ?, ?, ?)';
            const parametros = [parteinteressada.nome, parteinteressada.telefone, parteinteressada.endereco, parteinteressada.profissao];
            const [resultado] = await conexao.execute(sql, parametros);
            return resultado.insertId;
        }
        throw new Error("Objeto não é uma instância de Parteinteressada");
    }

    async alterar(parteinteressada) {
        if (parteinteressada instanceof Parteinteressada) {
            const conexao = await conectar();
            const sql = 'UPDATE parteinteressada SET nome = ?, telefone = ?, endereco = ?, profissao = ? WHERE codigo = ?';
            const parametros = [parteinteressada.nome, parteinteressada.telefone, parteinteressada.endereco, parteinteressada.profissao, parteinteressada.codigo];
            await conexao.execute(sql, parametros);
        } else {
            throw new Error("Objeto não é uma instância de Parteinteressada");
        }
    }

    async deletar(parteinteressada) {
        if (parteinteressada instanceof Parteinteressada) {
            const conexao = await conectar();
            const sql = 'DELETE FROM parteinteressada WHERE codigo = ?';
            const parametros = [parteinteressada.codigo];
            await conexao.execute(sql, parametros);
        } else {
            throw new Error("Objeto não é uma instância de Parteinteressada");
        }
    }

    async consultar(nome) {
        const listaParteinteressada = [];
        const conexao = await conectar();
        const sql = `SELECT * FROM parteinteressada WHERE nome LIKE ?`;
        const parametros = [`%${nome}%`];
        const [registros] = await conexao.execute(sql, parametros);

        for (const registro of registros) {
            const parteinteressada = new Parteinteressada(registro.codigo, registro.nome, registro.telefone, registro.endereco, registro.profissao);
            listaParteinteressada.push(parteinteressada);
        }

        return listaParteinteressada;
    }

    async consultarTelefone(telefone) {
        const listaParteinteressada = [];
        const conexao = await conectar();
        const sql = `SELECT * FROM parteinteressada WHERE telefone = ?`;
        const parametros = [telefone];
        const [registros] = await conexao.execute(sql, parametros);

        for (const registro of registros) {
            const parteinteressada = new Parteinteressada(registro.codigo, registro.nome, registro.telefone, registro.endereco, registro.profissao);
            listaParteinteressada.push(parteinteressada);
        }

        return listaParteinteressada;
    }
}
