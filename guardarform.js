module.exports = class Guardar {
  constructor(title, price, thumbnail, file, id) {
    (this.title = title),
      (this.price = parseInt(price)),
      (this.thumbnail = thumbnail),
      (this.id = id);
    this.file = file;
  }
};
