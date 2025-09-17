const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const tareasRoutes = require("./routes/tareas");

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use("/auth", authRoutes);
app.use("/tareas", tareasRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
