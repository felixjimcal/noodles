const router = require("express").Router(); // facilitar creacion rutas

router.get("/notes", (req, res) => {
    res.send("notas");
});


module.exports = router;