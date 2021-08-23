export class resta{
    numero:number;
    numeroDos:number;
    constructor(numero:number,numeroDos:number) {
      this.numero=numero;
      this.numeroDos=numeroDos;
    }
    resultado() {
        return this.numero - this.numeroDos;
  } 
}