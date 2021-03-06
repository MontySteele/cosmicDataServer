var dataSet = new Array;
var dataSetCopy;
var dataName;
var timeStamp;
var timeStampHold;
var startDate;
var dataArray;
var dateArray;
var spanArray = new Array;
var span = document.getElementById("span").value;
document.getElementById("spanValue").innerHTML=span;
var buffer = document.getElementById("buffer").value;
document.getElementById("bufferValue").innerHTML=buffer;
var sma = simple_moving_averager(buffer*60/span);
var smaArray = new Array;
var timeArray = new Array;
// var logName = 'logAll.dat';
var logName = 'allFormat.dat';
var link = "http://"+location.hostname+"/"+logName;

window.onload = function(){
    document.getElementById("iconRow").appendChild(createButton("fa-file-text-o", link));
    document.getElementById("iconRow").appendChild(createButton("fa-github", "https://github.com/ahruschka/detectorWebInterface"));
};

function createButton(icon, link){

    var a = document.createElement("a");
    var li = document.createElement("li");

    a.className += (" icon");
    a.className += (" ");
    a.className += (icon);
    a.setAttribute("href",link);

    li.appendChild(a);

    return li;

}

function simple_moving_averager(period){
    smaArray = [];
    var x;
    for (var i = 0; i < spanArray.length-1;i++){
	if(i<buffer){
	    x = 0;
	    for(var j = 0;j<i;j++){
		x = x + spanArray[i-j];
	    }
	    smaArray[i] = (x/i);
	}else{
	    x = 0;
	    for(var j = 0;j<buffer;j++){
		x = x + spanArray[i-j];
	    }
	    smaArray[i] = (x/buffer);
	}
    }
}
function read(textFile){
    var xhr=new XMLHttpRequest;
    xhr.open('GET',textFile);
    xhr.onload=show;
    xhr.send();
}
function spanBufferChanged(){
    buffer = document.getElementById("buffer").value;
    document.getElementById("bufferValue").innerHTML=buffer;
    span = document.getElementById("span").value;
    document.getElementById("spanValue").innerHTML=span;
    formatData(span);
    sma = simple_moving_averager(buffer*60/span);
    drawChart();
}
function show(){
    //var pre=document.createElement('pre');
    dataSet=this.response.split("\n");
    // dataSetCopy=this.response.split("\n");
    dataName = dataSet[0].split("\n");
    dateArray= dataName[0].split(" ");

    startDate =new Date(dateArray[9],dateArray[4]-1,dateArray[5],dateArray[6],dateArray[7],dateArray[8]);

    timeStamp = new Date(dateArray[9],dateArray[4]-1,dateArray[5],dateArray[6],dateArray[7],dateArray[8]);
    
    //Removes counts before first hour
    if((59-startDate.getMinutes()) != 0){
	var extras = 59-startDate.getMinutes();
	for (var i = 0; i < extras; i++) {
	    timeStamp.setTime(timeStamp.getTime()+60000);
	}
    }
    formatData(span);
    sma = simple_moving_averager(buffer*60/span);

    //pre.textContent=this.response.split("\r\n");
    // document.body.appendChild(pre)
}
function formatData(x) {
    //Andrew Test
    spanArray = [];
    timeArray = [];
    var total = 0;
    var i;
    var c = 0;
    for(i=0;i<(dataSet.length)-1;i++){	
	if(c==x){
	    //New timestamp
	    dataName = dataSet[i].split("\n");
	    dateArray= dataName[0].split(" ");
	    timeStampHold = new Date(dateArray[9],dateArray[4]-1,dateArray[5],dateArray[6],dateArray[7],dateArray[8]);
	    timeArray.push(timeStampHold);

	    //add a value equal to total
	    spanArray.push(total/x);
	    //reset c and total
	    total = 0;
	    c = 0;
	}else{
	    // sums up 'span' minutes of data
	    total = total + Number(dateArray[0]);
	    c++;
	}
    }
}

read(link);
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var data = new google.visualization.DataTable();
    var timeAdvance = new Date();
    timeAdvance.setTime(timeStamp.getTime());
    data.addColumn('date', 'Time');
    data.addColumn('number', 'Counts');
    data.addColumn('number','Rolling Average')

    for (i = 0; i < spanArray.length-1; i++) {
	timeAdvance.setTime(timeAdvance.getTime()+(span*60000));
	data.addRow([
	    // new Date(timeAdvance.getTime()),
	    (timeArray[i]),
	    (spanArray[i]*span),
	    (smaArray[i]*span)
	]);
    }

    var options = {
	// chart:{
	//   title: 'Double Paddle Detector',
	//   subtitle: 'Start Time: ' + startDate.toString(),
	// },
	title: 'Liquid scintillator test stand (all counts)',
	titleTextStyle:{
	    //      color: '#839496',
	    fontName: '"Avant Garde",Avantgarde,"Century Gothic",CenturyGothic,AppleGothic,sans-serif',
	    fontSize: '30',
	    bold: false
	},
	vAxis: {
	    title: 'Counts',
	    titleTextStyle: {
		fontSize: 16,
		//        color: '#93a1a1'
	    },
	    //      gridlines: {
	    //        color: '073642'
	    //      },
	    viewWindowMode:'explicit',
	    viewWindow:{
		max: 'auto',
		min: 'auto'
	    }//,
	    //      textStyle:{
	    //        color: '#93a1a1'
	    //      }
	},
	hAxis: {
	    title: 'Time (UTC)',
	    titleTextStyle: {
		fontSize: 16 //,
		//        color: '#93a1a1'
	    } //,
	    //      gridlines: {
	    //        color: '073642'
	    //      },
	    //      textStyle:{
	    //        color: '#93a1a1'
	    //      }
	},
	explorer: {
	    axis: 'horizontal',
	    keepInBounds: true,
	    maxZoomOut: 1
	},
	series: {
	    0: {
		axis: 'Counts',
		//        color: '#eee8d5',
		pointSize: 3
	    },
	    1: {
		axis: 'Rolling Average',
		lineWidth: 3,
		//        color: '#6c71c4',
		// pointSize: 1,
		pointsVisible: 0
	    }
	},
	backgroundColor: 'transparent',
	// height:400,
	legend: {
	    position: 'none'
	}
    };

    var chart = new google.visualization.ScatterChart(document.getElementById('total_counts'));

    chart.draw(data, options);
}

window.onresize=function(){
    drawChart();
}
