"use strict";
exports.__esModule = true;
var suma_1 = require("./suma");
var resta_1 = require("./resta");
var operacion = function (num, numDos, calculo) {
    return new Promise(function (resolve, reject) {
        if (calculo === "+") {
            resolve(new suma_1.suma(num, numDos).resultado());
        }
        else if (calculo === "-") {
            resolve(new resta_1.resta(num, numDos).resultado());
        }
        else {
            reject("error no es suma o resta");
        }
    });
};
var operaciones = function (f, num, numberDos, calculo) {
    f(num, numberDos, calculo).then(function (resultado) { return console.log(resultado); })["catch"](function (error) { return console.log(error); });
};
console.log('iniciando...');
console.log("Estamos procesando la operacion");
operaciones(operacion, 20, 20, "-");
console.log('finalizado');
