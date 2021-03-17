import { options } from "./../DB/options";
//Connect to DB
const knex = require("knex")(options);

export interface Mensaje {
  id?: number;
  email: string;
  fecha?: string;
  mensaje: string;
}

export class Chat {
  constructor() {}

  getMensajes = async (): Promise<Mensaje[]> => {
    try {
      return knex.from("chat").select("email", "fecha", "mensaje");
    } catch (err) {
      console.log(err);
    }
  };

  getMensaje = async (id: number): Promise<Mensaje | undefined> => {
    try {
      const mensaje = await knex
        .from("chat")
        .select("email", "fecha", "mensaje")
        .where("id", "=", id)
        .limit(1);
      return mensaje.length ? mensaje[0] : undefined;
    } catch (err) {
      console.log(err);
    }
  };

  addMensaje = async (email: string, mensaje: string): Promise<Mensaje> => {
    try {
      const nuevoMensaje: Mensaje = { email, mensaje };
      const newId = await knex("chat").insert(nuevoMensaje);
      return this.getMensaje(newId);
    } catch (err) {
      console.log(err);
    }
  };
}
