import express from "express";

const app = express();
const PORT = 8080;
const router = express.Router();

app.use("/api/productos", router);

const server = app.listen(PORT, () => {
  console.log("Servidor HTTP escuchando en el puerto", server.address().port);
});
server.on("error", (error) => console.log("Error en servidor", error));

router.get("/actualizar/:id", (req, res) => {
  const objRes = "actualizar";
  let params = req.params;
  res.json(objRes + params.id);
});

router.delete("/borrar/:id", (req, res) => {
  const objRes = "borrar";
  let params = req.params;
  res.json(objRes + params.id);
});
router.get("/borrar/:id", (req, res) => {
  const objRes = "borrar";
  let params = req.params;
  res.json(objRes + params.id);
});
