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

    return await chat.addMensaje(email,mensaje);
}