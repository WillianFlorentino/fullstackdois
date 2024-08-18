import { Router } from "express";
import ColaboradorCtrl from "../Controle/colaboradorCtrl.js";

const colabCtrl = new ColaboradorCtrl();
const rotaColaborador = new Router();

rotaColaborador
.get('/', colabCtrl.consultar)
.get('/:termo', colabCtrl.consultar)
.post('/', colabCtrl.gravar)
.patch('/', colabCtrl.atualizar)
.put('/', colabCtrl.atualizar)
.delete('/', colabCtrl.excluir);

export default rotaColaborador;