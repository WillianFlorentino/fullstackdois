import express from 'express';
import cors from 'cors';
import rotaCargo from './Rotas/rotaCargo.js';
import rotaColaborador from './Rotas/rotaColaborador.js';
import session from 'express-session';
import dotenv from 'dotenv';
import rotaAutenticacao from './Rotas/rotaAutenticacao.js';
import { verificarAutenticacao } from './Seguranca/autenticar.js';
import rotaParteinteressada from './Rotas/rotaParteinteressada.js';
import rotaProjeto from './Rotas/rotaProjeto.js';

dotenv.config();//carrega as variáveis de ambiente extraindo elas do arquivo .env
const host='0.0.0.0';
const porta=3000;

const app = express();

app.use(session({
    secret: process.env.CHAVE_SECRETA,
    resave: false, //a cada requisição a sessão precisa ser atualizada
    saveUninitialized: true, //salvar sessões não iniciadas
    cookie: { maxAge: 1000 * 60 * 15 } //define quanto tempo a sessão será válida (tempo máximo de ociosidade para considerar a sessão vencida)
}));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/cargo', verificarAutenticacao, rotaCargo);
app.use('/colaborador', verificarAutenticacao, rotaColaborador);
app.use('/parteinteressada', verificarAutenticacao, rotaParteinteressada);
app.use('/projeto', verificarAutenticacao, rotaProjeto);
app.use('/autenticacao', rotaAutenticacao);

app.listen(porta, host, ()=>{
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
})
