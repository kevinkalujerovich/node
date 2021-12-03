const calculo = (parametro) => {
  const numeros = [];
  for (let i = 0; i < parametro; i++) {
    numeros.push(Math.floor(Math.random() * (parametro - 0 + 1) + 0));
  }

  const arr = [...new Set(numeros)];
  const obj = [];
  for (let i = 0; i < arr.length; i++) {
    let sum = 0;
    for (let x = 0; x < numeros.length; x++) {
      if (arr[i] === numeros[x]) {
        sum++;
      }
    }
    obj.push({ numero: arr[i], numeros: sum });
  }
  console.log(obj);
  return obj;
};

process.on("message", (mensaje) => {
  process.send(calculo(mensaje));
});
