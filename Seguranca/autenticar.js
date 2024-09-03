import { assinar, verificarAssinatura } from "./funcoesJWT.js";

export default function login(req, resp){

    const usuario = req.body.usuario;
    const senha = req.body.senha;

    if (usuario === 'admin' && senha === 'admin'){ //lembre-se de verificar com uma consulta no banco de dados
        //para lembrar que o usuário esta logado, seguindo as características do protocolo HTTP em ser um protocolo stateless(não guarda estado, não lembra com quem se comunicou), para identificar a origem com quem o servidor se comunicou, é necessário utilizar sessões(para que ele se lembre com quem se comunicou).
        req.session.usuario = usuario;
        resp.status(200).json({
            status: true, 
            mensagem: "Logado com sucesso!",
            token: assinar(usuario)}
        )


    } else{
        resp.status(401).json({
            status: false,
            mensagem: 'Usuário ou senha inválido'
        })
    }

}   

export function logout(req, resp){
    req.session.destroy(); //exclui a variável usuário da sessão
}


//essa função funcionará como um mddleware que é processado a cada requisição, decidindo sempre se ela será atendida ou recusada, por esse motivo o padrão |"next"
export function verificarAutenticacao(req, resp, next){

    const token = req.headers['authorization'];
    let tokenVerificado = undefined;
    if (token){
        tokenVerificado = verificarAssinatura(token);
        if (tokenVerificado != undefined && tokenVerificado.usuario == req.session.usuario){
            next();
        }
    }
    else{
        resp.status(401).json(
            {
                status: false,
                mensagem: 'Acesso não autorizado! Favor realizar o login na aplicação'
            }
        )
    }
}