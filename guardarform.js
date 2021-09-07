module.exports = class Guardar {
  constructor(title, price, id) {
    (this.title = title), (this.price = parseInt(price)), (this.id = id);
  }
};
