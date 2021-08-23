"use strict";
exports.__esModule = true;
exports.suma = void 0;
var suma = /** @class */ (function () {
    function suma(numero, numeroDos) {
        this.numero = numero;
        this.numeroDos = numeroDos;
    }
    suma.prototype.resultado = function () {
        return this.numero + this.numeroDos;
    };
    return suma;
}());
exports.suma = suma;
