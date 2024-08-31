import nodemailer from "nodemailer";

const tarnsporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  }, 
});

const sendMail = async (receiverEmail, subject, body) => {
  console.log("start email");
  await tarnsporter.sendMail(
    {
      from: process.env.EMAIL,
      to: receiverEmail,
      subject: subject,
      html: body,
    },
    function (error, info) {
      if (error) {
        console.log("Error: ", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
  console.log("done email");
};

export default sendMail;
