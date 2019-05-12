// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const configMessage = require('./configMessage');

// const app = express();
// app.use(bodyParser.json());
// // Automatically allow cross-origin requests
// app.use(cors({ origin: true }));


// 'use strict';
// const functions  = require('firebase-functions');
// const nodemailer = require('nodemailer');
// const cors = require('cors')({origin: true});
// import { https } from 'firebase-functions';
// app.post('/form', (req, res) => {
//     configMessage(req.body);
//  res.status(200).send();
// })

// app.listen(3000, () => {
//     console.log('Servidor corriendo')
// });
// let url = "smtps://germanwibaux%40gmail.com:" + encodeURIComponent('Octubre2018') + "@smtp.gmail.com:465";
// var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'germanwibaux@gmail.com', // Cambialo por tu email
//         pass: 'Octubre2018' // Cambialo por tu password
//     }
// });
// let transporter = nodemailer.createTransport(url);
// const mailOptions = {
//     from: `”${formulario.nombre} 👻” <${formulario.email}>`,
//     to: 'germanwibaux@gmail.com', // Cambia esta parte por el destinatario
//     subject: formulario.asunto,
//     html: `
//     <strong>Nombre:</strong> ${formulario.nombre} <br/>
//     <strong>E-mail:</strong> ${formulario.email} <br/>
//     <strong>Mensaje:</strong> ${formulario.mensaje}
//     `
// };
// transporter.sendMail(mailOptions, function (err, info) {
//     if (err)
//         console.log(err)
//     else
//         console.log(info);
// });
// exports.enviarEmail = functions.https.onRequest((req, res) => {
//     cors(req, res, () => {
//         let remetente = '"Adson Rocha" <email@gmail.com>';

//         let assunto = req.body['assunto'];
//         let destinatarios = req.body['destinatarios']; // lista de e-mails destinatarios separados por ,
//         let corpo = req.body['corpo'];
//         let corpoHtml = req.body['corpoHtml'];

//         let email = {
//             from: remetente,
//             to: destinatarios,
//             subject: assunto,
//             text: corpo,
//             html: corpoHtml
//         };

//         transporter.sendMail(email, (error, info) => {
//             if (error) {
//                 return console.log(error);
//             }
//             console.log('Mensagem %s enviada: %s', info.messageId, info.response);
//         });
//     });
// });
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
admin.initializeApp();

/**
* Here we're using Gmail to send 
*/
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'germanwibaux@gmail.com',
        pass: 'Octubre2018'
    }
});

exports.sendMail = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
        // getting dest email by query string
        const email = 'germanwibaux@gmail.com';

        const mailOptions = {
            from: req.query.email, // Something like: Jane Doe <janedoe@gmail.com>
            to: email,
            subject: 'llaal', //req.query.asunto, // email subject  I\'M A PICKLE!!!
            html: 
                `<p style="font-size: 16px;">`+'Consulta: '+ req.query.consultat + `</p>`
                // `<p style="font-size: 16px;">`+'Telefono: '+ req.query.telefono + `</p>`
                // `<p style="font-size: 16px;">`+'Enviado por: '+ req.query.email + `</p>
                `<p style="font-size: 16px;">`+ 'Mensaje: ' + req.query.mensaje + `</p>
                <br />` // email content in HTML
        };
  
        // returning result
        return transporter.sendMail(mailOptions, (erro, info) => {
            if(erro){
                return res.send(erro.toString());
            }
            return res.send(JSON.stringify("Hello from Firebase!"));
        });
    });
});    




