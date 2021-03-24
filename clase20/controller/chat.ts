import { ChatModel } from './../model/chat';

export const getMensajes = async() => {
    return  await ChatModel.find().lean();
}

export const addMensaje = async(email: string, mensaje: string) => { 
    if (!email || !mensaje) throw new Error("Falta parametros");

    return await new ChatModel({email,mensaje}).save();
}