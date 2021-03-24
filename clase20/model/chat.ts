
import mongoose from 'mongoose';
const  {Schema }  = mongoose;

const chatSchema = new Schema({
  email: { type: String, required: true},
  fecha: { type: Date, required: true, default: Date.now, get: (value: Date) => { return new Date()}},
  mensaje: { type: String, required: true},
  
});

export interface Mensaje {
  email: string;
  fecha?: string;
  mensaje: string;
}


export const ChatModel = mongoose.model('Chat',chatSchema);

