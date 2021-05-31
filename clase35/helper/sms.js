const acountId = "ACcbb65950bfdc345269781f4f6f563eb8";
const authToken = "cd3d298a3a7f2d91548779657eb97693";

const client = require("twilio")(acountId, authToken);

const sendSms = (nombre, mensaje) => {
  client.messages
    .create({
      body: `user:${nombre}, mensaje:${mensaje}`,
      from: "+16369238406",
      to: process.env.PHONE,
    })
    .then((message) => console.log("envio sms"))
    .catch((err) => console.log(err));
};

module.exports.sendSms = sendSms;
