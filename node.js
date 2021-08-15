function leerTexto(string, cb, segundos = 1000) {
  const palabra = string.split(" ");
  let i = 0;
  let idInterval = setInterval(() => {
    console.log(palabra[i++]);
    if (i === palabra.length) {
      clearInterval(idInterval);
      end(palabra);
      cb();
    }
  }, segundos);
}
const end = (string) => {
  console.log(
    `se termino el proceso,la cantidad de palabras es ${string.length}`
  );
};

leerTexto("hola mundo", () => {
  leerTexto(
    "hello world",
    () => {
      leerTexto("node js", () => {}, 1000);
    },
    1000
  );
});
