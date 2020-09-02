const horariosRoutes = (app, fs) => {
    app.get("/horarios/:inicio/:fim", (req, res)=>{
        res.status(200).send("OK! horarios")
    });
}

module.exports = horariosRoutes;