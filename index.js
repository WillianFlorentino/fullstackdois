import express from 'express';
import cors from 'cors';
import rotaCargo from './Rotas/rotaCargo.js';
import rotaColaborador from './Rotas/rotaColaborador.js';


const host='0.0.0.0';
const porta=3000;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/cargo',rotaCargo);
app.use('/colaborador',rotaColaborador);

app.listen(porta, host, ()=>{
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
})
