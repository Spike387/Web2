const helper = require("../helper.js");
const express = require("express");
const nodemailer = require("nodemailer");
var serviceRouter = express.Router();


serviceRouter.post("/mail", function(request, response) {
    var errorMsgs=[];
    console.log(request.body);
    if (helper.isUndefined(request.body.name)) 
    errorMsgs.push("name fehlt");
    if (helper.isUndefined(request.body.nachricht)) 
    errorMsgs.push("nachname fehlt");
    if (helper.isUndefined(request.body.email)) {
    errorMsgs.push("email fehlt");
    } else if (!helper.isEmail(request.body.email)) {
    errorMsgs.push("email hat ein falsches Format");
    }
    try {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'jorosi159@gmail.com',
              pass: 'JoRoSiOnline2019'
            }
          });
        
        var mailOptions = {
            from: request.body.email,
            to: 'reuschjo@hs-albsig.de',
            subject: 'Neue Nachricht von ' + request.body.name,
            text: 'Die Anfrage ist von: ' + request.body.email + '\nDie Anfrage enthält folgende Nachricht: ' + request.body.nachricht
          };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          }); 
          helper.log("Es wurde eine Mail gesendet!");
          response.status(200).json(helper.jsonMsgOK({ "Gesendet": true}));
    } catch (ex) {
          helper.log("Die Mail konnte nicht gesendet werden!");
          response.status(400).json(helper.jsonMsgError(ex.message));
    }
    
});

module.exports = serviceRouter;