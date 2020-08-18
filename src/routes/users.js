const router = require("express").Router(); // facilitar creacion rutas

router.get("/users/signin", (req, res) => {
    res.send("SignIn");
});

router.get("/users/signup", (req, res) => {
    res.send("SignUp");
});

module.exports = router;