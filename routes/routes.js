const regrasRouter = require("./regras");
const horariosRouter = require("./horarios");

const mainRouter = (app, fs) => {
	app.get("/", (req, res) => {
		res.status(200).send({
			regras: "/regras para métodos de regras",
			horarios: "/horarios para consultar metodos de horarios"
		});
	});

	regrasRouter(app, fs);
	horariosRouter(app, fs);
}

module.exports = mainRouter;
