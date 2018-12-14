var dataSetPot = new Array;
var dataSetCopyPot;
var dataNamePot;
var timeStampPot;
var timeStampHoldPot;
var startDatePot;
var dataArrayPot;
var dateArrayPot;
var spanArrayPot = new Array;
var bufferPot = document.getElementById("buffer").value;
document.getElementById("bufferValue").innerHTML=buffer;
var smaPot = simple_moving_averager(buffer*60/span);
var smaArrayPot = new Array;
var timeArrayPot = new Array;
var logPotName = 'allFormatPot.dat';
var potLink = "http://"+location.hostname+"/"+logPotName;


function simple_moving_averager_pot(period){
    smaArrayPot = [];
    var x;
    for (var i = 0; i < spanArrayPot.length-1;i++){
	if(i<bufferPot){
	    x = 0;
	    for(var j = 0;j<i;j++){
		x = x + spanArrayPot[i-j];
	    }
	    smaArrayPot[i] = (x/i);
	}else{
	    x = 0;
	    for(var j = 0;j<bufferPot;j++){
		x = x + spanArrayPot[i-j];
	    }
	    smaArrayPot[i] = (x/bufferPot);
	}
    }
}
function readPot(textFile){
    var xhrp=new XMLHttpRequest;
    xhrp.open('GET',textFile);
    xhrp.onload=show;
    xhrp.send();
}

function showPot(){
    //var pre=document.createElement('pre');
    dataSetPot=this.response.split("\n");
    // dataSetCopy=this.response.split("\n");
    dataNamePot = dataSetPot[0].split("\n");
    dateArrayPot= dataNamePot[0].split(" ");

    startDatePot =new Date(dateArrayPot[9],dateArrayPot[4]-1,dateArrayPot[5],dateArrayPot[6],dateArrayPot[7],dateArrayPot[8]);

    timeStampPot = new Date(dateArrayPot[9],dateArrayPot[4]-1,dateArrayPot[5],dateArrayPot[6],dateArrayPot[7],dateArrayPot[8]);
    
    //Removes counts before first hour
    if((59-startDate.getMinutes()) != 0){
	var extras = 59-startDate.getMinutes();
	for (var i = 0; i < extras; i++) {
	    timeStampPot.setTime(timeStampPot.getTime()+60000);
	}
    }
    formatData_pot(span);
    smaPot = simple_moving_averager_pot(bufferPot*60/span);

    //pre.textContent=this.response.split("\r\n");
    // document.body.appendChild(pre)
}
function formatData_pot(x) {
    //Andrew Test
    spanArrayPot = [];
    timeArrayPot = [];
    var total = 0;
    var i;
    var c = 0;
    for(i=0;i<(dataSetPot.length)-1;i++){	
	if(c==x){
	    //New timestamp
	    dataNamePot = dataSetPot[i].split("\n");
	    dateArrayPot= dataNamePot[0].split(" ");
	    timeStampHoldPot = new Date(dateArrayPot[9],dateArrayPot[4]-1,dateArrayPot[5],dateArrayPot[6],dateArrayPot[7],dateArrayPot[8]);
	    timeArrayPot.push(timeStampHoldPot);

	    //add a value equal to total
	    spanArrayPot.push(total/x);
	    //reset c and total
	    total = 0;
	    c = 0;
	}else{
	    // sums up 'span' minutes of data
	    total = total + Number(dateArrayPot[0]);

	    c++;
	}
    }
}

readPot(potLink);
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChartPot);

//Draws the chart for all of our data at once

window.onresize=function(){
    drawChartTotal();
    drawChartMuon();
    drawChartNeutron();
    drawChartPot();

}


