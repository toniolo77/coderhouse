import { ChatModel } from "./../model/chat";
import { Request, Response } from "express";
import { normalize, schema } from "normalizr";

const normalizar = (mensajes) => {
  // Define a users schema
  const user = new schema.Entity("user",{},{idAttribute:'email'});

  const chatSchema= new schema.Entity("chat", {
    author: user,
  },{idAttribute:'_id'});

  return normalize(mensajes, [chatSchema]);
};

const getMensajes = async () => {
  return await ChatModel.find().lean();
};

export const mensajesVista = async (req, res: Response) => {
  const mensajes = await getMensajes();
  res.render("chat/mensajes", { mensajes: encodeURIComponent(JSON.stringify(normalizar(mensajes))) })
};

export const addMensaje = async (
  email: string,
  nombre: string,
  apellido: string,
  edad: number,
  alias: string,
  avatar: string,
  mensaje: string
) => {
  if (!email || !nombre || !apellido || !edad || !alias || !avatar || !mensaje)
    throw new Error("Falta parametros");

  const newMensaje = {
    author: {
      email,
      nombre,
      apellido,
      edad,
      alias,
      avatar,
    },
    mensaje,
  };

  return await new ChatModel(newMensaje).save();
};
