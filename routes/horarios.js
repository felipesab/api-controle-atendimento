const horariosRoutes = (app, fs) => {
    app.get("/horarios", (req, res)=>{
        res.status(200).send({
            listar : "../:dia_inicio/:dia_fim"
        });
    });

    app.get("/horarios/:inicio/:fim", (req, res)=>{
        res.status(200).send("OK! horarios");
    });
}

module.exports = horariosRoutes;