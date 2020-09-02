const cadastroRoutes = (app, fs) => {
    app.post("/cadastro/:dia/:inicio/:fim", (req, res)=>{
        res.status(200).send({
            mensagem : 'OK! post'
        });
    });
}


module.exports = cadastroRoutes;