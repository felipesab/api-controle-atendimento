const moment = require("moment");

const getDates = (dataFile, intervals) =>{
		if(dataFile.diario == undefined || dataFile.diario.length < 1)
			throw new Error("Não há regras cadastradas")

		return dataFile.diario.filter((i)=>{
			let day = moment(i.day, "DD-MM-YYYY");
			if(intervals.start_day <= day && day <= intervals.end_day){
				return true;
			}
				return false;
		})
};

const horariosRoutes = (app, fs) => {
	const path = "./regras/regras.json"

	app.get("/horarios", async (req, res) => {
		if(req.body.start_day == undefined || req.body.end_day == undefined){
			res.send({
				status : "error",
				message : "É necessário informar os paramêtros para a consulta"
			})
		}

		const start_day = moment(req.body.start_day, "DD-MM-YYYY");
		const end_day = moment(req.body.end_day, "DD-MM-YYYY");

		const intervals = {
			start_day : start_day,
			end_day : end_day
		}

		if(intervals.start_day > intervals.end_day){
			res.send({
				status : "error",
				message : "O dia inicial não pode ser maior que o dia final"
			})
		}
		else{
			try{
				let data = JSON.parse(await fs.readFile(path, "utf8"));
				const dates = getDates(data, intervals);

				dates.sort((a, b)=>{
						const bool = moment(a.day, "DD-MM-YYYY").diff(moment(), "months") - moment(b.day, "DD-MM-YYYY").diff(moment(), "months");
						return bool;
				}); 

				res.send(dates);
			}
			catch(err){
				res.send({
					status : "error",
					message : err.message
				});
			}
		}
	});
};

module.exports = horariosRoutes;