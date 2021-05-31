const  nodemailer = require("nodemailer");

class serviceGmail {
  constructor() {
    this.user = process.env.EMAIL_GMAIL;
    this.pass = process.env.PASS_GMAIL;
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.user,
        pass: this.pass,
      },
    });
  }

  sendMail(subject, message, attachments) {
    const emailOptions = {
      from: "Servidor Node",
      to: this.user,
      subject: subject,
      html: message,
      attachments: [
        {
          filename: 'profile.jpeg',
          path: attachments
        }
      ]
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

module.exports.serviceGmail = serviceGmail;


