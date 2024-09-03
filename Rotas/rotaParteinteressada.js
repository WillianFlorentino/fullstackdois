import { Router } from "express";
import ParteinteressadaCtrl from "../Controle/parteinteressadaCtrl.js";

const rotaParteinteressada = new Router();
const parteinteressadaCtrl = new ParteinteressadaCtrl();


rotaParteinteressada.post('/', parteinteressadaCtrl.gravar)
.put('/', parteinteressadaCtrl.atualizar)
.delete('/', parteinteressadaCtrl.excluir)
.get('/', parteinteressadaCtrl.consultarPorNome)
.get('/telefone', parteinteressadaCtrl.consultarPorTelefone);

export default rotaParteinteressada;