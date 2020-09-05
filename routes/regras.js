const moment = require("moment");
const rules = require("./../rulesMethods.js");


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
			const rulesFile = JSON.parse(await fs.readFile(path, "utf8"));
			
			const isValid = rules.dayValidatorController(req.body.day);
			if( isValid)
				 rules.cadastroController(rulesFile, req.body);
			
			res.send({
				status: "success",
				message: "Nova regra adicionada com sucesso!"
			})

		}
		catch(err){
			res.send({
				status:"error",
				message: err.message
			})
		}
	});
	
	app.delete("/regras/deletar", async (req, res) =>{
		try{
			if(req.body.day == undefined){
				throw new Error("É necessário informar dia da regra a ser deletada");
			}

			let day = req.body.day;
			let data = JSON.parse(await fs.readFile(path, "utf8"));

			const isValid = rules.dayValidatorController(day);
			if(isValid){
				rules.deleteController(data, day);
			}

			res.send({
				status : "success",
				message : "Regra deletada com sucesso!"
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