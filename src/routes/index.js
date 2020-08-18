const router = require("express").Router(); // facilitar creacion rutas

router.get("/", (req, res) => {
    res.send("Index");
});

router.get("/about", (req, res) => {
    res.send("about");
});

module.exports = router;