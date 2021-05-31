const  nodemailer = require("nodemailer");

class Mail {
  constructor() {
    this.user = "leo.huel@ethereal.email";
    this.pass = "zNqyeCZncVRej96Sam";
    this.transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: this.user,
        pass: this.pass,
      },
    });
  }

  sendMail(subject, message) {
    const emailOptions = {
      from: "Servidor Node",
      to: this.user,
      subject: subject,
      html: message,
    };
    this.transporter.sendMail(emailOptions, (err, info) => {
      if (err) {
        console.log("error ", err);
        return err;
      }
      console.log("info", info);
    });
  }
}

module.exports.Mail = Mail;


