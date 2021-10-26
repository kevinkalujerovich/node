const { options } = require("./options/mariaDB");
const knex = require("knex")(options);

knex.schema
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
    console.log("tabla creada!");
  })
  .catch((e) => {
    console.log("Error en create de tabla:", e);
  });
