const fs = require("fs");
const handlebars = require("handlebars");
const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, payload, template) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "carey.macgyver69@ethereal.email",
        pass: "pujWDYUeKvBeKawGeK",
      },
    });

    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    const compiledTemplate = handlebars.compile(String(source));

    const message = {
      from: '"noreply" <noreply@src.abuad.edu.ng>',
      to: email,
      subject: subject,
      html: compiledTemplate(payload),
    };
    transporter.sendMail(message, function (err, info) {
      if (err) {
        console.log(err);
        return new Error(err);
      } else {
        console.log(info);
        console.log("Message sent: %s", info.message);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        return true;
      }
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = sendEmail;
