const listarRoutes = (app, fs) =>{
    const path = "./regras/regras.json";

    app.get("/listar/:dia", (req, res)=>{
        fs.readFile(path, "utf8", (err, data)=>{
            if(err){
                throw err;
            }

            res.send(JSON.parse(data));
        })
    });
}

module.exports = listarRoutes;