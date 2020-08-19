const router = require("express").Router(); // facilitar creacion rutas

router.get("/notes/add", (req, res) => {
    res.render("./notes/add.hbs");
});

router.post("/notes/add", (req, res) => {
    console.log(req.body);
    res.send("ok");
});

router.get("/notes", (req, res) => {
    res.send("notas");
});


module.exports = router;