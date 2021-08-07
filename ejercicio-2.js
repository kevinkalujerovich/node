class Usuario {
  constructor(nombre, apellido) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.mascotas = [];
    this.books = [];
  }
  getFullName() {
    console.log(`${this.nombre} ${this.apellido}`);
  }
  addMascota(mascota) {
    this.mascotas.push(mascota);
  }
  getMascotas() {
    console.log(this.mascotas.length);
  }
  addBook(nombre, autor) {
    this.books.push({ nombre: nombre, autor: autor });
  }
  getBooks() {
    console.log(this.books.map((x) => x.nombre));
  }
}

const jose = new Usuario("jose", "perez");

jose.getFullName();
jose.addMascota("gato");
jose.addMascota("perro");
jose.getMascotas();
jose.addBook("El señor de los anillos", "Frodo");
jose.addBook("El alquimista", "Paulo Cohelo");
jose.getBooks();
