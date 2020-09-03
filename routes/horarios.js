const moment = require("moment");

const horariosRoutes = (app, fs) => {
	const path = "./regras/regrasExtra.json"

	const getDates = (dataFile, intervals, callback)=>{
		callback(dataFile.filter((i)=>{
			let day = moment(i.day, "DD-MM-YYYY").format();
			if(day >= intervals.start_day && day < intervals.end_day){
				return true;
			}
				return false;
		}))
	};


	app.get("/horarios", (req, res) => {
		const start_day = moment(req.query.start_day, "DD-MM-YYYY").format();
		const end_day = moment(req.query.end_day, "DD-MM-YYYY").format();

		const intervals = {
			start_day : start_day,
			end_day : end_day
		}

		if(intervals.start_day > intervals.end_day){
			let output = {
				status : "error",
				message : "The start_day argument cannot be greater than end_day"
			}

			res.json(output);
		}
		else{
			fs.readFile(path, "utf8", (err, data)=>{
				if(err){
					const output = {
						status : "error",
						message : err
					}
					res.json(output);
				}
				else{
					getDates(JSON.parse(data), intervals, (dataFile)=>{
						res.json(dataFile);
					});
				}
			});
		}
	});
};

module.exports = horariosRoutes;