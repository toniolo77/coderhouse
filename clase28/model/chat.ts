
import mongoose from 'mongoose';
const  {Schema }  = mongoose;

const chatSchema = new Schema({
  author: {
    email: { type: String, required: true},
    nombre: { type: String, required: true},
    apellido: { type: String, required: true},
    edad: { type: Number, required: true},
    alias: { type: String, required: true},
    avatar: { type: String, required: true},
  },
  fecha: { type: Date, required: true, default: Date.now, get: (value: Date) => { return new Date()}},
  mensaje: { type: String, required: true},
  
});


export const ChatModel = mongoose.model('Chat',chatSchema);

