const array = [];
for (let i = 0; i < 25; i++) {
  array.push(Math.random());
}
function* iterarValores(arreglo) {
  for (const e of arreglo) {
    yield e;
  }
}

let generador = iterarValores(array);

const apiOne = new Promise((resolve, reject) => {
  let variable = Math.random();
  const obj = { api: "ok", numero: variable };
  setTimeout(
    () =>
      variable < 0.5
        ? resolve(obj)
        : reject({ error: "404 : Not Found", numero: variable }),
    3000
  );
});
const apiTwo = new Promise((resolve, reject) => {
  let variable = Math.random();
  const obj = { api: "ok", numero: variable };
  setTimeout(
    () =>
      variable < 0.5
        ? resolve(obj)
        : reject({ error: "404 : Not Found", numero: variable }),
    2000
  );
});
const apiThree = new Promise((resolve, reject) => {
  let variable = Math.random();
  const obj = { api: "ok", numero: variable };
  setTimeout(
    () =>
      variable < 0.5
        ? resolve(obj)
        : reject({ error: "404 : Not Found", numero: variable }),
    5000
  );
});
const apiFour = new Promise((resolve, reject) => {
  let variable = Math.random();
  const obj = { api: "ok", numero: variable };
  setTimeout(
    () =>
      variable < 0.5
        ? resolve(obj)
        : reject({ error: "404 : Not Found", numero: variable }),
    1000
  );
});
const apiFive = new Promise((resolve, reject) => {
  let variable = Math.random();
  const obj = { api: "ok", numero: variable };
  setTimeout(
    () =>
      variable < 0.5
        ? resolve(obj)
        : reject({ error: "404 : Not Found", numero: variable }),
    4000
  );
});
console.log("iniciando accesos");
const api = [apiOne, apiTwo, apiThree, apiFour, apiFive];
for (const llamada of api) {
  llamada.then((x) => console.log(x)).catch((x) => console.log(x));
}
for (const valor of array) {
  console.log(valor);
}
