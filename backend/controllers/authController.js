const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const generarToken = (usuario) => {
  return jwt.sign(
    { id: usuario.id_usuario, email: usuario.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

// Registro
exports.register = async (req, res) => {
  const { nombreUsuario, apellidos, email, password } = req.body;
  try {
    const [existe] = await pool.query("SELECT * FROM Usuarios WHERE email = ?", [email]);
    if (existe.length > 0) return res.status(400).json({ msg: "El email ya está registrado" });

    const hash = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO Usuarios (nombreUsuario, apellidos, email, password_hash) VALUES (?,?,?,?)",
      [nombreUsuario, apellidos, email, hash]
    );

    res.json({ msg: "Usuario registrado con éxito" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await pool.query("SELECT * FROM Usuarios WHERE email = ?", [email]);
    if (rows.length === 0) return res.status(404).json({ msg: "Usuario no encontrado" });

    const usuario = rows[0];
    const valido = await bcrypt.compare(password, usuario.password_hash);
    if (!valido) return res.status(401).json({ msg: "Credenciales inválidas" });

    const token = generarToken(usuario);
    res.json({ token, usuario: { id: usuario.id_usuario, email: usuario.email } });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
