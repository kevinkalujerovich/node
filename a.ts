import {suma} from "./suma";
import {resta} from "./resta";


const operacion=(num:number,numDos:number,calculo:string)=>{
  return new Promise ((resolve, reject)=>{
      if(calculo==="+"){
        resolve(console.log(new suma(num,numDos).resultado()));
         }else if(calculo==="-"){
          resolve(console.log(new resta(num,numDos).resultado()));
         }
 
  });
}

const operaciones=(f:(c:number,d:number,calculo:string)=>any,num:number,numberDos:number,calculo:string)=>{
f(num,numberDos,calculo);

}

  console.log('iniciando...');
  console.log("Estamos procesando la operacion");
  operaciones(operacion,20,20,"+")
  console.log('finalizado');


