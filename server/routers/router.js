import express from "express";

import { OrdemServico } from "../models/OrdemServico.js";

const router = express.Router();
const os = new OrdemServico();

/**
 * GET / -> rota inicial, mostrar a lista de ordens de serviço
 * GET /os -> detalhes
 * POST /os/nova -> nova ordem de serviço
 * UPDATE /os/{id} -> concluir uma ordem
 * DELETE /os/{id} -> excluir uma ordem
 */

router.get("/", async (req,res) => {
    const results = await os.consultarTodas();
    if(!results.success)
        return res.render("index", {message: results.message, values: null});

    res.render("index", {values: results.values});
});

router.get("/os/nova", (req, res) => {
    res.render("os_nova");
});

router.post("/os/nova", async (req, res) => {
    const results = await os.criarNova(req.body);

    if (!results.success)
        console.error("Falha ao criar OS:", results.message);

    res.redirect("/");
});

// estou usando post em ambos porque só fui descobrir depois que o formulário HTML não aceita PUT e DELETE no atributo
// method. Sei que não é o certo, mas não vou fazer o fetch() na página dessa vez.
router.post("/os/:id/concluir", async (req, res) => {
    const { id } = req.params;
    const results = await os.concluirUma(id);

    if (!results.success) { req.flash('error', results.message); }

    res.redirect("http://localhost:4040");
});


router.post("/os/:id", async (req, res) => {
    const { id } = req.params;
    const results = await os.deletarUma(id);

    if (!results.success) { req.flash('error', results.message); }

    res.redirect("http://localhost:4040");
});

export { router };