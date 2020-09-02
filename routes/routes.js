const routerCadastro = require("./cadastro");
const listarRegrasRouter = require("./listar");

const mainRouter = (app, fs) => {
    app.get("/", (req, res)=>{
        res.status(200).send({
            mensagem : "Te amo meu bebe"
        });
    });

    listarRegrasRouter(app, fs);
}

module.exports = mainRouter;
