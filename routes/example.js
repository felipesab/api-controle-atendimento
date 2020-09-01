const express = require("express");
const router = express.Router();

router.get("/", (req, res)=>{
    res.status(200).send({
        mensagem : 'OK! GET'
    });
});

router.post("/", (req, res)=>{
    res.status(200).send({
        mensagem : 'OK! POST'
    });
});

module.exports = router;