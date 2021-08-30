import fs from "fs";
class Archivo {
  constructor(title, price, thumbnail, txt) {
    (this.title = title), (this.price = price);
    this.thumbnail = thumbnail;
    this.txt = txt;
  }
  async leer() {
    try {
      const contenido = await fs.promises.readFile(
        `./archivos/${this.txt}`,
        "utf-8"
      );
      console.log(JSON.parse(contenido).map((x) => x.title));
      console.log("Archivo leido!");
    } catch (err) {
      console.log(err);
    }
  }
  borrar() {
    fs.unlink(`./archivos/${this.txt}`, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Se elimino el archivo");
      }
    });
  }
  guardar() {
    const obj = {
      title: this.title,
      price: this.price,
      thumbnail: this.thumbnail,
    };
    try {
      const data = fs.readFileSync(`./archivos/${this.txt}`, "utf-8");
      const dataObj = JSON.parse(data);
      obj.id = dataObj.length + 1;
      dataObj.push(obj);
      fs.writeFile(
        `./archivos/${this.txt}`,
        JSON.stringify(dataObj, null, "\t"),
        (error) => {
          if (error) {
            throw new Error(
              `Hubo un error en la escritura del archivo: ${error}`
            );
          } else {
            console.log("Archivo grabado!");
          }
        }
      );
    } catch {
      throw new Error("No se pudo leer el archivo");
    }
  }
}

const prueba = new Archivo(
  "titulo del producto",
  1,
  "http//www...",
  "productos.txt"
);
prueba.leer();
