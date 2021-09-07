module.exports = class Guardar {
  constructor(title, price, thumbnail, id) {
    (this.title = title),
      (this.price = parseInt(price)),
      (this.thumbnail = thumbnail),
      (this.id = id);
  }
};
