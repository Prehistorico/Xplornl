const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

module.exports = async (to, subject, html) => {
    try {
        await transporter.sendMail({
            from: `"Tu App" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html
        });

        console.log("------------Email enviado desde nodemailer");

    } catch (error) {
        console.error("------------Error enviando email:", error);
        throw error;
    }
};