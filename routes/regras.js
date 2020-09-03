const regrasRoutes = (app, fs) => {
	const path = "./regras/regras.json";

	app.get("/regras", (req, res) => {
		res.status(200).send({
			listar: "../listar",
			cadastrar: "../cadastrar",
			deletar: "../deletar",
		});
	})

	app.get("/regras/listar", (req, res) => {
		fs.readFile(path, "utf8",	(err, data) => {
			if (err) {
				let output = {
					status : "erro",
					message : err
				};

				res.json(output);
			}

			res.send(JSON.parse(data));
		})
	});
	
	app.post("/regras/cadastro", (req, res) => {
		fs.readFile(path, "utf8", (err, data)=>{
			if(err){
				let output = {
					status : "erro",
					message : err
				};

				res.json(output);
			}
			else{
				let rules = JSON.parse(data);

				rules.push(req.body);

				fs.writeFile(path, JSON.stringify(rules), (err)=>{
					if(err){
						let output = {
							status : "error",
							message : err
						}

						res.json(output);
					}
					else{
						let output = {
							status : "sucesso",
							message : "Rule succesfully created!"
						};

						res.json(output);
					}
				});
			}
			
		});
	});
	
	app.delete("/regras/deletar", (req, res) =>{
		fs.readFile(path, "utf8", (err, data)=>{
			if(err){
				let output ={
					status : "error",
					message : err
				}

				res.json(output);
			}
			else{
				let day = req.query.day;
				let rules = JSON.parse(data);

				rules = rules.filter(i => {
					if(i.day == day)
						return true;
					return false;
				});

				fs.writeFile(path, JSON.stringify(rules), (err)=>{
					if(err){
						let output = {
							status : "erro",
							message : err
						}

						res.json(output);
					}
					else{
						let output = {
							status : "success",
							message : "rule succesfully deleted"
						}

						res.json(output);
					}
				});
			}
		});
	});

}

module.exports = regrasRoutes;