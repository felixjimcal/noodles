const router = require("express").Router(); // facilitar creacion rutas

// ------------------------------------------------------
router.get("/notes/add", (req, res) => {
    res.render("./notes/add.hbs");
});


// ------------------------------------------------------
const Note = require("../models/Note");

router.post("/notes/add", async(req, res) => { // async para indicar proceso asincrono
    const { title, description } = req.body;
    const errors_form = [];

    if (!title) {
        errors_form.push({ text: "Write a title, please" });
    }

    if (!description) {
        errors_form.push({ text: "Write a description, please" });
    }

    if (errors_form.length > 0) {
        res.render("notes/add", {
            errors: errors_form,
            title,
            description
        });
    } else {
        const newNote = new Note({ title, description });
        await newNote.save(); // await para indicar proceso asincrono
        res.redirect("/notes");
    }
});

// ------------------------------------------------------
router.get('/notes', async(req, res) => {
    await Note.find().sort({ date: "desc" })
        .then(documentos => {
            const contexto = {
                notes: documentos.map(documento => {
                    return {
                        title: documento.title,
                        description: documento.description
                    }
                })
            }
            res.render('notes/all_notes', {
                notes: contexto.notes
            })
        })
})


module.exports = router;