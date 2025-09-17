const express = require("express");
const { verificarToken } = require("../middleware/auth");
const { crearTarea, obtenerTareas, actualizarTarea, eliminarTarea } = require("../controllers/tareasController");


const router = express.Router();

router.post("/", verificarToken, crearTarea);
router.get("/", verificarToken, obtenerTareas);
router.put("/:id", verificarToken, actualizarTarea);
router.delete("/:id", verificarToken, eliminarTarea);

module.exports = router;
