'use strict';
function log(errorMessage, errorLevel, source){
	var printMessage = "";
	if (errorLevel == "E")
	{
		printMessage = "ERROR";
	}
	if (errorLevel == "W")
	{
		printMessage = "WARNING";
	}
	if (errorLevel == "D")
	{
		printMessage = "DEBUG message";
	}
	
	printMessage += " generated at " + source + ": " + errorMessage;
	console.log(printMessage);	
};

module.exports = {
	log:log
}