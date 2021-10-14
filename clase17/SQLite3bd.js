const { options2 } = require("./options/SQLite3");
const mensajesKnex = require("knex")(options2);
mensajesKnex.schema
  .createTable("mensajes", (table) => {
    table.string("usuario"), table.string("mensaje"), table.string("fecha");
    table.string("hora");
  })
  .then(() => {
    console.log("Tabla messages creada.");
    knex.destroy();
  })
  .catch((e) => {
    console.log("Error al crear tabla messages.", e);
    knex.destroy();
  });
