const moment = require("moment");

const getDates = (dataFile, intervals) =>{
		return dataFile.filter((i)=>{
			let day = moment(i.day, "DD-MM-YYYY").format();
			if(day >= intervals.start_day && day <= intervals.end_day){
				return true;
			}
				return false;
		})
};

const horariosRoutes = (app, fs) => {
	const path = "./regras/regrasExtra.json"

	app.get("/horarios/:start_day/:end_day", async (req, res) => {
		const start_day = moment(req.params.start_day, "DD-MM-YYYY").format();
		const end_day = moment(req.params.end_day, "DD-MM-YYYY").format();

		const intervals = {
			start_day : start_day,
			end_day : end_day
		}

		if(intervals.start_day > intervals.end_day){
			res.send({
				status : "error",
				message : "The start_day argument cannot be greater than end_day"
			})
		}
		else{
			try{
				let data = await fs.readFile(path, "utf8");
				const dates = getDates(JSON.parse(data), intervals);

				await dates.sort((a, b)=>{
						return moment(a.day, "DD-MM-YYYY").diff(moment().format(), "months") - moment(b.day, "DD-MM-YYYY").diff(moment().format(), "months");
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