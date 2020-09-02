const listarRouter = (app, fs) =>{
    const path = "./regras/regras.json";

    app.get("/listar", (req, res)=>{
        fs.readFile(path, "utf8", (err, data)=>{
            if(err){
                throw err;
            }

            res.send(JSON.parse(data));
        })
    });
}

module.exports = listarRouter;