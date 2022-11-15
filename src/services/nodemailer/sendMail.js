import nodemailer from "nodemailer";

export const sendMail = async () => {
  try {
    const testAccount = await nodemailer.createTestAccount();

    const authUser = {
      user: "keshawn10@ethereal.email",
      pass: "d2YCXnG4F4QPbJZQ5h",
    };

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: authUser,
    });

    const info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: "camilo.b.q@hotmail.com, baz@example.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
  } catch (error) {
    console.log("error", error);
  }
};
