import { Chat } from './../model/chat';
import type { Mensaje } from './../model/chat';
var dateFormat = require("dateformat");

const chat = new Chat();

export const getMensajes = async() : Promise<Mensaje[]> => {
    const mensajes: Mensaje[] =  await chat.getMensajes();
    return mensajes;
}

export const addMensaje = async(email: string, mensaje: string) : Promise<Mensaje> => { 
    if (!email || !mensaje) throw new Error("Falta parametros");
    const fecha = dateFormat(new Date(), "dd-mm-yyyy hh:MM:ss");

    return await chat.addMensaje(email,fecha.toString(),mensaje);
}