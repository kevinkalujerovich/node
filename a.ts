 class Calculo{
    numero:number;
    numeroDos:number;
  operacion: string;
    constructor(numero:number,numeroDos:number,operacion:string) {
      this.operacion =operacion;
      this.numero=numero;
      this.numeroDos=numeroDos;
    }
    cuenta() {
      if(this.operacion==="+"){
        return this.numero + this.numeroDos;
      }else if( this.operacion==="-"){
        return this.numero - this.numeroDos;
      }else{
        return "error"
      }
      }
  } 
  
  const miPromesa = new Promise ((resolve, reject)=>{
    setTimeout(()=>resolve("El resultado de la operacion es"),
    10000)
});

const operacion=(num:number,numDos:number,calculo:string)=>{
const a=new Calculo(num,numDos,calculo);
    console.log(a.cuenta());
}
const operaciones=(f:(c:number,d:number,calculo:string)=>any,num:number,numberDos:number,calculo:string)=>{
f(num,numberDos,calculo);

}
 const  asyncCall = async()=>{
  console.log('iniciando...');
  console.log("Estamos procesando la operacion");
  console.log('esperando...')
 await miPromesa.then(x=>console.log(x))
operaciones(operacion,1,20,"-");
  console.log('finalizado');
}
asyncCall()
