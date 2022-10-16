const nodemailer = require('nodemailer');


const sendEmail = (email,next) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: 'franz.jacobson40@ethereal.email',
            pass: 'dpBVHgfhbgHWpqswDD'
        }
    });

    const mailOptions = {
        from: 'Remitente',
        to: email,
        subject: 'Bienvenido a Disney-API',
        text: 'Su cuenta ha sido creada satisfactoriamente',
        html: `<b>Su cuenta ha sido creada satisfactoriamente</b>`
    }

     transporter.sendMail(mailOptions)
     .catch(err => next(err))

}

module.exports = sendEmail