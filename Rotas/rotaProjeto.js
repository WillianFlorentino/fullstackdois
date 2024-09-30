import { Router } from "express";
import ProjetoCtrl from "../Controle/projetoCtrl.js";

const rotaProjeto = new Router();
const projetoCtrl = new ProjetoCtrl();

rotaProjeto
.get('/:termo', projetoCtrl.consultar)

.post('/', projetoCtrl.gravar)
.get('/:termo', projetoCtrl.consultar)
.get('/', projetoCtrl.consultar);


export default rotaProjeto;