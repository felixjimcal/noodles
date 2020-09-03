const router = require("express").Router(); // facilitar creacion rutas

const User = require("../models/User");

router.get("/users/login", (req, res) => {
    res.render("./users/login");
});

router.get("/users/signup", (req, res) => {
    res.render("./users/signup");
});

router.post("/users/signup", async (req, res) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = [];
    if (password != confirm_password) {
        errors.push({ text: 'Password do not match' });
    }
    if (password.length < 4) {
        errors.push({ text: 'Password must be at least 4 characters' });
    }
    if (errors.length > 0) {
        res.render('users/signup', { errors, name, email, password, confirm_password });
    } else {
        const emailUser = await User.findOne({ email: email });
        if (emailUser) { // if email already exists
            req.flash('error_msg', 'Email already in use');
            res.redirect('/users/signup');
        }
        const newUser = new User({ name, email, password });
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'You are registered');
        res.redirect("/users/login");
        res.respone('ok');
    }
});

module.exports = router;