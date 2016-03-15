'use strict';
var Logger = require('./../controllers/errorController');
var mail = require('nodemailer');

var emailfrom = '"Medbook" <pao.rodriguez@gmail.com>';

// create reusable transporter object using the default SMTP transport
var transporter = mail.createTransport('smtps://pao.rodriguez@gmail.com:$29P40R0dM4@smtp.gmail.com');

// send mail with defined transport object
//transporter.sendMail(mailOptions

function SendEmail(to, subject, htmlText){
	// setup e-mail data with unicode symbols
	console.log('Sending email');
	var mailOptions = {
	    from: emailfrom,
	    to: to, 
	    subject: subject, 
	    //text: text
	    html: htmlText
	};	

	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        return console.log(error);
	    }
	    console.log('Message sent: ' + info.response);
	    Logger.log('Message sent to : ' + mailOptions.to + ' ' + info.response);
	});

	//);
}


module.exports = {
	SendEmail:SendEmail
}
