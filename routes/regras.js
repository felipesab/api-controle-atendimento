const moment = require("moment");

function validateDay(day){
	const dias = ["domingo", "segunda", "terca", "quarta", "quinta", "sexta", "sabado", "todos"]
	const index = dias.indexOf(day);
	const validMoment = moment(day, "DD-MM-YYYY").isValid()
	
	if(index == -1 && !validMoment){
		throw new Error("Invalid day format")
	}
}

function dayController(day){
	try{
		if(typeof(day)=="object"){
			for(x in day){
				validateDay(day[x]);
			}
		}
		else{
			validateDay(day);
		}
	}
	catch(err){
		throw err
	}
}

function deleteController(rulesFile, day){
	let found = false

	for(i in rulesFile){
		if(typeof(rulesFile[i].day)=="object"){
			const index = rulesFile[i].day.indexOf(day);
			if(index > -1){
				if(rulesFile[i].day.length > 1)
					rulesFile[i].day.splice(index, 1);
				else
					rulesFile.splice(i, 1);
				found = true;
			}
		}
		else{
			if(rulesFile[i].day == day){
				rulesFile.splice(i, 1);
				found = true;
			} 
		}
	}

	if(found){
		return rulesFile
	}
	else{
		throw new Error("Rule not found for that day");
	}
}

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
			
			dayController(req.body.day);

			await data.push(req.body);
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

			validateDay(day);
			data = deleteController(data, await day);

			fs.writeFile(path, JSON.stringify(await data));

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