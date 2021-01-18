import { Argumentos } from '../interfaces/Argumentos'

export class Suma {
  private args: Argumentos[];

  constructor() {
    this.args = [];
  }

 resultado = (param1: number, param2: number): number => {
    this.args.push({ primer_operador: param1, segundo_operador: param2 });
    return  param1 + param2;
  };

}
