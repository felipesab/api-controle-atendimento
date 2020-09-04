const regrasRoutes = (app, fs) => {
	const path = "./regras/regras.json";
	
	app.get("/regras", async (req, res) => {
		try{
			const data = await fs.readFile(path, "utf8");
			res.send(JSON.parse(data));
		}
		catch(err){
			res.send({
				status: "error",
				message: err.message
			});
		}
	});
	
	app.post("/regras/cadastro", async (req, res) => {
		try{
			const data = JSON.parse(await fs.readFile(path, "utf8"));
			data.push(req.body);
			fs.writeFile(path, JSON.stringify(data));
			res.send({
				status: "success",
				message: "New rule succesfully added!"
			})

		}
		catch(err){
			res.send({
				status:"error",
				message: err.message
			})
		}
	});
	
	app.delete("/regras/deletar/:day", async (req, res) =>{
		try{
			let day = req.params.day;
			let data = JSON.parse(await fs.readFile(path, "utf8"));

			data = data.filter(i =>{
				if(i.day == day)
					return false;
				return true;
			});

			fs.writeFile(path, JSON.stringify(data));

			res.send({
				status : "success",
				message : "Rule succesfully deleted!"
			});
		}
		catch(err){
			res.send({
				status : "error",
				message : err.message
			});
		}
	});

}

module.exports = regrasRoutes;