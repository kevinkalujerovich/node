function Usuario(nombre, apellido) {
  this.nombre = nombre;
  this.apellido = apellido;
  this.mascotas = [];
  this.books = [];
}

Usuario.prototype.getFullName = function () {
  console.log(`${this.nombre} ${this.apellido}`);
};
Usuario.prototype.addMascota = function (mascota) {
  this.mascotas.push(mascota);
};
Usuario.prototype.getMascotas = function () {
  console.log(this.mascotas.length);
};
Usuario.prototype.addBook = function (nombre, autor) {
  this.books.push({ nombre: nombre, autor: autor });
};
Usuario.prototype.getBooks = function () {
  console.log(this.books.map((x) => x.nombre));
};

const jose = new Usuario("jose", "perez");

jose.getFullName();
jose.addMascota("gato");
jose.addMascota("perro");
jose.getMascotas();
jose.addBook("El señor de los anillos", "Frodo");
jose.addBook("El alquimista", "Paulo Cohelo");
jose.getBooks();
