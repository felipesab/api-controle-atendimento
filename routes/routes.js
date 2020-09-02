const cadastroRouter = require("./cadastro");
const listarRegrasRouter = require("./listar");
const deletarRouter = require("./deletar");
const horariosRouter = require("./horarios");

const mainRouter = (app, fs) => {
    app.get("/", (req, res)=>{
        res.status(200).send({
            mensagem : "Te amo meu bebe"
        });
    });

    listarRegrasRouter(app, fs);
    cadastroRouter(app, fs);
    deletarRouter(app, fs);
    horariosRouter(app, fs);
}

module.exports = mainRouter;
