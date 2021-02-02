import fs from "fs";

export interface Visita {
  visitas: {
    items: number;
    item: number;
  };
}

export enum TipoVisita {
  ITEMS = "items",
  ITEM = "item",
}

const VISITASTORAGE = "visitas.txt";

const VISITAINICIAL: Visita = {
  visitas: {
    items: 0,
    item: 0,
  },
};

export class VisitaModel {
  constructor() {}

  private init = async () => {
    console.log("ENTRO INIT ");

    const initVisita = VISITAINICIAL;

    await fs.promises.writeFile(VISITASTORAGE, JSON.stringify(initVisita));
  };

  getVisitas = async (): Promise<Visita> => {
    try {
      if (!fs.existsSync(VISITASTORAGE)) await this.init();

      const lectura = await fs.promises.readFile(VISITASTORAGE, "utf-8");
      const visitas = JSON.parse(lectura);

      return visitas;
    } catch (err) {
      console.log(err);
      return VISITAINICIAL;
    }
  };

  addVisita = async (index: TipoVisita) => {
    try {
      const visitas: Visita = await this.getVisitas();
      const nuevaVisita = { ...visitas };
      nuevaVisita.visitas[index]++;
      await fs.promises.writeFile(VISITASTORAGE, JSON.stringify(nuevaVisita));
    } catch (err) {
      console.log(err);
    }
  };
}
