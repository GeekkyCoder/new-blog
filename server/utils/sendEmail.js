const nodemailer = require("nodemailer");
const nodemailerConfig = require("./nodeMailerConfig");

const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport(nodemailerConfig);

  return transporter.sendMail({
    from: '"Lumber One Blog" <readerblogs123@gmail.com>',
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;
