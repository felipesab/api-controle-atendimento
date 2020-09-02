const deletarRoutes = (app, fs) => {
    app.delete("/deletar/:dia", (req, res)=>{
        res.status(200).send("OK! deletar");
    });
}

module.exports = deletarRoutes;