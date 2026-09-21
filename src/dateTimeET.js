const dateFormattedET = function(){
	let timeNow = new Date();
	let dateNow = timeNow.getDate();
	let monthNow = timeNow.getMonth();
	let yearNow = timeNow.getFullYear();
	const monthNamesET = ['jaanuar', 'veebruar', 'märts', 'aprill', 'mai', 'juuni', 'juuli', 'august', 'september', 'oktoober', 'november', 'detsember'];
	return timeNow.getDate() + '. ' + monthNamesET[timeNow.getMonth()] + ' ' + timeNow.getFullYear();
}

addLeadZero = function(numValue){
	if(numValue < 10){
		//numValue = '0' + numValue;
		numValue = numValue.padStart(2, '0');
	}
	return numValue;
}

const timeFormattedET = function(){
	let timeNow = new Date();
	let hourNow = timeNow.getHours();
	let minuteNow = timeNow.getMinutes();
	let secondNow = timeNow.getSeconds();
	let timeFormatted = hourNow + ":" + minuteNow + ":" + secondNow;
	return timeFormatted
}

//ekspordin kõik vajaliku
module.exports = {fullDate: dateFormattedET, fullTime: timeFormattedET}