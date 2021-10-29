const express = require("express");
const router = express.Router();
const firebase = require("../firebase");

router.get("/", function (req, res) {
  res.render("main");
});
router.get("/listar", (req, res) => {
  try {
    const listar = async () => {
      const querySnapshot = await firebase.query.get();
      let docs = querySnapshot.docs;
      const response = docs.map((doc) => ({
        _id: doc.id,
        title: doc.data().title,
        description: doc.data().description,
        codigo: doc.data().codigo,
        price: doc.data().price,
        stock: doc.data().stock,
        thumbnail: doc.data().thumbnail,
      }));
      res.json({
        response: response,
        message: "Success",
        status: 200,
      });
    };
    listar();
  } catch (error) {
    res.json({
      message: "Error",
      status: 404,
    });
  }
});

router.get("/listar/:id", (req, res) => {
  const listarId = async () => {
    const doc = firebase.query.doc(req.params.id);
    const item = await doc.get();
    const response = item.data();
    if (response) {
      res.json({
        response: response,
        message: "Success",
        status: 200,
      });
    } else {
      res.json({
        message: "ID de producto no existente",
        status: 200,
      });
    }
  };
  try {
    listarId();
  } catch (error) {
    res.json({
      message: "Error",
      status: 404,
    });
  }
});

router.post("/guardar", (req, res) => {
  try {
    const guardar = async () => {
      await firebase.query.add(req.body);
    };
    res.json({
      message: "Success",
      status: 200,
    });
    guardar();
  } catch (error) {
    res.json({
      message: "ERROR",
      status: 404,
    });
  }
});

router.delete("/borrar/:id", (req, res) => {
  const borrar = async () => {
    const querySnapshot = await firebase.query.get();
    let docs = querySnapshot.docs;
    const response = docs.map((doc) => ({
      _id: doc.id,
    }));
    const data = response.find((x) => x._id == req.params.id);
    if (data) {
      const doc = firebase.query.doc(req.params.id);
      const item = await doc.delete();
      res.json({
        message: "Success",
        status: 200,
      });
    } else {
      res.json({
        message: "ID de producto no existente",
        status: 200,
      });
    }
  };
  try {
    borrar();
  } catch (error) {
    res.json({
      message: "ERROR",
      status: 404,
    });
  }
});

router.put("/actualizar/:id", function (req, res) {
  const actualizar = async () => {
    const querySnapshot = await firebase.query.get();
    let docs = querySnapshot.docs;
    const response = docs.map((doc) => ({
      _id: doc.id,
    }));
    const data = response.find((x) => x._id == req.params.id);
    if (data) {
      const doc = firebase.query.doc(req.params.id);
      const item = await doc.update(req.body);
      res.json({
        message: "Success",
        status: 200,
      });
    } else {
      res.json({
        message: "ID de producto no existente",
        status: 200,
      });
    }
  };

  try {
    actualizar();
  } catch (error) {
    res.json({
      message: "ERROR",
      status: 404,
    });
  }
});

module.exports = router;
