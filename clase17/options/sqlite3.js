const options2 = {
  client: "sqlite3",
  connection: {
    filename: "./db/mydb.sqlite",
  },
  useNullAsDefault: true,
};

console.log("Conectando a la base de datos...");

module.exports = {
  options2,
};
