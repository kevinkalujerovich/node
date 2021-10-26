const { options2 } = require("./options/sqlite3");
const productosKnex = require("knex")(options2);
productosKnex.schema
  .createTable("productos", (table) => {
    table.increments("_id"),
      table.string("title"),
      table.string("description"),
      table.integer("codigo"),
      table.string("thumbnail"),
      table.integer("price"),
      table.integer("stock"),
      table.integer("timestamp");
  })
  .then(() => {
    console.log("Tabla messages creada.");
  })
  .catch((e) => {
    console.log("Error al crear tabla messages.", e);
  });
