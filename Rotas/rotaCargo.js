import { Router } from "express";
import CargoCtrl from "../Controle/cargoCtrl.js";

//rotas é o mapeamento das requisições da web para um determinado
//endpoint da aplicação

const cargCtrl = new CargoCtrl();
const rotaCargo = new Router();

rotaCargo
.get('/',cargCtrl.consultar)
.get('/:termo', cargCtrl.consultar)
.post('/',cargCtrl.gravar)
.patch('/',cargCtrl.atualizar)
.put('/',cargCtrl.atualizar)
.delete('/',cargCtrl.excluir);

export default rotaCargo;