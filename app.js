const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const PersonaRouter = require("./routes/persona.routes");
const UsuarioRouter = require("./routes/usuario.routes");

const app = express();

// Conexión MongoDB para serverless
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGODB_URI);
  isConnected = true;
};

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

app.use(cors({
  origin: ["https://app-gestor-de-gastos.vercel.app", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "X-User-Id"]
}));

app.use(bodyParser.json());
app.use("/api", UsuarioRouter);
app.use("/api", PersonaRouter);

module.exports = app;