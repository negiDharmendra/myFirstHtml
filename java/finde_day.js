
var getNumberOfDays = function(date1,date2){
	var numberOfDayes = new Date(date1) - new Date(date2);
	return numberOfDayes/(1000*60*60*24);
};
var getNearestDay = function(month,day,year){
	var specialDates = ['4,4','6,6','8,8','10,10','12,12'];
	var numberOfDays = specialDates.map(function(specialDate){
		return getNumberOfDays(month+','+day+','+year,specialDate+','+year);});
	var nearestDay = numberOfDays.reduce(function(previousDay,nextDay){
		return Math.abs(previousDay)>Math.abs(nextDay)?nextDay:previousDay;});
	return nearestDay;
};

var getDesiredDay = function(count){
	var dayes = {'0':'Monday','1':'Tusday','2':'Wednesday','3':'Thrusday',
	'4':'Friday','5':'Saturday','6':'Sunday'};
	return dayes[count];
};

var getDayIndex = function(year){
	var firstTwoDigit = +year.toString().slice(0,2);
	var secondTwoDigit = +year.toString().slice(2);
	var result = 2*(4-(firstTwoDigit%4))+secondTwoDigit+Math.floor(secondTwoDigit/4);
	return result%7;
};


var round=function(value,day_index){
	while(value--)
		(day_index==6)?day_index=0:day_index++;	
	return day_index;
}

var roundback=function(value,day_index){
	while(value--)
		(day_index==0)?day_index=6:day_index--;	
	return day_index;
}

var main=function(){
		var date= +document.getElementById('date').value;
		var month= +document.getElementById('month').value;
		var year= +document.getElementById('year').value;
	if(date<1||month<1||year<1){
		alert('provide correct date')
	}
	else if(date&&month&&year){
		var index=getDayIndex(year);
		var value=getNearestDay(month,date,year);
		if(Math.abs(value)==value)
			var ans=round(value,index);	
		else
			var ans=roundback(Math.abs(value),index);				
		 document.getElementById('result').innerHTML = getDesiredDay(ans);
	}
	else{
		alert('provide correct date')
	}
}