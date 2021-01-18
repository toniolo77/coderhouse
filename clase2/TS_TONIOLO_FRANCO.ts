 const operacion = async (param1: number, param2: number, op: string) => {
     let result;
     switch (op) {
         case 'suma': 
            const { Suma }   = await import('./operaciones/suma');
            const suma_module= new Suma();
            result = suma_module.resultado(param1,param2);
            break;
        case 'resta': 
            const { Resta }   = await import('./operaciones/resta');
            const resta_module= new Resta();
            result = resta_module.resultado(param1,param2);
            break;
        default: throw  new Error("Operacion incorrecta");
    }
    return result;
}

const operaciones = () => {
    operacion(1,3,"suma")
    .then(r =>{
        console.log("Resultado suma 1 + 3 = ",r);
    })
    .catch(err => {
        console.log("Operacion incorrecta");
    })
    
    
    operacion(5,2,"resta")
    .then(r =>{
        console.log("Resultado resta 5 - 2 = ",r);
    })
    .catch(err => {
        console.log("Operacion incorrecta");
    })

}

operaciones();


