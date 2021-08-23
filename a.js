"use strict";
exports.__esModule = true;
var suma_1 = require("./suma");
var resta_1 = require("./resta");
var operacion = function (num, numDos, calculo) {
    return new Promise(function (resolve, reject) {
        if (calculo === "+") {
            resolve(console.log(new suma_1.suma(num, numDos).resultado()));
        }
        else if (calculo === "-") {
            resolve(console.log(new resta_1.resta(num, numDos).resultado()));
        }
    });
};
var operaciones = function (f, num, numberDos, calculo) {
    f(num, numberDos, calculo);
};
console.log('iniciando...');
console.log("Estamos procesando la operacion");
operaciones(operacion, 20, 20, "+");
console.log('finalizado');
