const regrasRoutes = (app, fs)=>{
    const path = "./regras/regras.json";

    app.get("/regras", (req, res)=>{
        res.status(200).send({
            listar: "../listar",
            cadastrar: "../cadastrar",
            deletar: "../deletar",
        });
    })

    //listas todas regras cadastradas 
    app.get("/regras/listar", (req, res)=>{
        fs.readFile(path, "utf8", (err, data)=>{
            if(err){
                throw err;
            }

            res.send(JSON.parse(data));
        })
    });

    //deletar regra de dia especifico
    app.delete("/regras/deletar/:dia", (req, res)=>{
        res.status(200).send("OK! deletar");
    });

    //cadastrar nova regra
    app.post("/regras/cadastro/:dia/:inicio/:fim", (req, res)=>{
        res.status(200).send({
            mensagem : 'OK! post'
        });
    });
}

module.exports = regrasRoutes;