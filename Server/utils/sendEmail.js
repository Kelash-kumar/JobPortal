const nodemailer = require("nodemailer");

const sendEmail = async ({ email, subject, message }) => {
  const transportMail = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptaions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: subject,
    text: message,
  };

  await transportMail.sendMail(mailOptaions);
};

module.exports = sendEmail;
