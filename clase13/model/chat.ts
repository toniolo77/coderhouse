import fs from "fs";

export interface Mensaje {
  email: string;
  fecha: string;
  mensaje: string;
}


const CHATSTORAGE = "chat.txt";

export class Chat {
  constructor() {}

  private  createFile  = async () => {
    await fs.promises.writeFile(CHATSTORAGE, "[]");
  }


  getMensajes = async (): Promise<Mensaje[]> => {
    try {
      if (!fs.existsSync(CHATSTORAGE)) {
        await this.createFile();
        return [];
      }

      const lectura = await fs.promises.readFile(CHATSTORAGE, "utf-8");
      const mensajes = JSON.parse(lectura);

      return mensajes;
    } catch (err) {
      
    }
  };

  addMensaje = async (email: string, fecha: string, mensaje: string) : Promise<Mensaje> => {
    try {
      const mensajes: Mensaje[] = await this.getMensajes();
      const nuevoMensaje:Mensaje  =  {email, fecha, mensaje};
      mensajes.push(nuevoMensaje);
      await fs.promises.writeFile(CHATSTORAGE, JSON.stringify(mensajes));

      return nuevoMensaje;
    } catch (err) {
      console.log(err);
    }
  };
}
