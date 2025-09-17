const pool = require("../config/db");

// Crear tarea
exports.crearTarea = async (req, res) => {
  const { titulo, descripcion, prioridad } = req.body;
  try {
    await pool.query(
      "INSERT INTO Tareas (id_usuario, titulo, descripcion, prioridad) VALUES (?,?,?,?)",
      [req.user.id, titulo, descripcion, prioridad]
    );
    res.json({ msg: "Tarea creada con éxito" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Obtener tareas
exports.obtenerTareas = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Tareas WHERE id_usuario = ?", [req.user.id]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Actualizar tarea
exports.actualizarTarea = async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, prioridad, estado } = req.body;
  try {
    await pool.query(
      "UPDATE Tareas SET titulo=?, descripcion=?, prioridad=?, estado=? WHERE id_tarea=? AND id_usuario=?",
      [titulo, descripcion, prioridad, estado, id, req.user.id]
    );
    res.json({ msg: "Tarea actualizada" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Eliminar tarea
exports.eliminarTarea = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM Tareas WHERE id_tarea=? AND id_usuario=?", [id, req.user.id]);
    res.json({ msg: "Tarea eliminada" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
