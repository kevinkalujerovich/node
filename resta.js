"use strict";
exports.__esModule = true;
exports.resta = void 0;
var resta = /** @class */ (function () {
    function resta(numero, numeroDos) {
        this.numero = numero;
        this.numeroDos = numeroDos;
    }
    resta.prototype.resultado = function () {
        return this.numero - this.numeroDos;
    };
    return resta;
}());
exports.resta = resta;
