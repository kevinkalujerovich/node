const faker = require("faker");

faker.locale = "es";

const producto = () => ({
  nombre: faker.name.findName(),
  precio: faker.datatype.number({
    min: 10,
    max: 50,
  }),
  foto: faker.image.image(),
});

module.exports = {
  producto,
};
