'use strict';

var colors = require('colors');
var fs = require('fs');
const loggingLevel = process.env.LOGGING_LEVEL || 0;
console.log('Current logging level is ' + loggingLevel);

function writeToFile(message, file)
{
	message = message + '\r\n';
	var filepath = './logs/' + file; 
	fs.appendFile(filepath, message, function(err) {
	    if(err) {
	        console.log(err);
	    }
	}); 	
}

function log(errorMessage, logType, source){
	if (!logType){
		logType = 'U'; //Assign unknown. This will always be logged
	}

	if (!source){
		source = 'Unknown source'; //Default value
	}

	//Prepare message
	var printMessage = '';
	var genericMessage = errorMessage + ' [@ ' + source;

	//Always logged
	if (logType == "E")
	{
		printMessage = genericMessage + ' - ERROR]';
		console.log(printMessage.red);	
		writeToFile(printMessage, 'errors.log');
		return;
	}

	if (loggingLevel <= 2)
	{
		//Level 1 and 2: Log W, I, E
		if (logType == "W")
		{
			printMessage = genericMessage + ' - WARNING]';
			console.log(printMessage.yellow);
			writeToFile(printMessage, 'warnings.log');
			return;
		}
		else {
			if (logType == "I")
			{
				printMessage = genericMessage + ' - INFO]';
				console.log(printMessage.blue);	
				writeToFile(printMessage, 'information.log');
				return;
			}	
		}
	}
	if (loggingLevel <= 1)
	{
		//Logs U, D, W, I, E
		if (logType == "D")
		{
			printMessage = genericMessage + ' - DEBUG]';
			console.log(printMessage.green);	
			writeToFile(printMessage, 'debug.log');
			return;
		}	
		else{
			if (logType == "U")
			{
				printMessage = genericMessage + ' - UNKNOWN TYPE]';
				console.log(printMessage.magenta);	
				writeToFile(printMessage, 'unknown.log');
			}	
		}
	}
};

module.exports = {
	log:log
}