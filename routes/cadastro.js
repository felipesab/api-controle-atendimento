const cadastroRouter = (app, fs) => {
    app.get("/cadastro", (req, res)=>{
        res.status(200).send({
            mensagem : 'OK! GET'
        });
    });

    app.get("/cadastro/:data", (req, res)=>{
        res.status(200).send({
            mensagem : 'OK! GET with Parameters'
        });
    });
}


module.exports = cadastroRouter;