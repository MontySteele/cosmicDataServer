var dataSet = new Array;
var dataSetCopy;
var dataName;
var timeStamp;
var timeStampHold;
var startDate;
var dataArray;
var dateArray;
var countsArray = new Array;
var countsArrayMuon = new Array;
var countsArrayNeutron = new Array;
var spanArray = new Array;
var spanArrayRatio = new Array;
var spanArrayMuon = new Array;
var spanArrayNeutron = new Array;
//var span = document.getElementById("span").value;
var span = 1;
//document.getElementById("spanValue").innerHTML=span;
var buffer = document.getElementById("buffer").value;
document.getElementById("bufferValue").innerHTML=buffer;
var sma = simple_moving_averager(buffer*60/span);
var smaArrayRatio = new Array;
var smaArrayMuon = new Array;
var smaArrayNeutron = new Array;
var smaArray = new Array;
var timeArray = new Array;
// var logName = 'logAll.dat';
var logName = '~msteele9/allFormat.dat';
var logPotName = '~msteele9/allFormatPot.dat';
var logFourPaddleName = '~msteele9/allFormat4Paddle.dat';
var link = "http://"+location.hostname+"/"+logName;
var potLink = "http://"+location.hostname+"/"+logPotName;
var FourPaddleLink = "http://"+location.hostname+"/"+logFourPaddleName;
var i, tabcontent, tablinks;
var meanCounts;
var meanMuonCounts;
var meanNeutronCounts;

window.onload = function(){
   
    document.getElementById("iconRow").appendChild(createButton("fa-github", "https://github.com/MontySteele/cosmicDataServer"));
};

function openPot(evt, cityName) {

 document.getElementById("iconRow").appendChild(createButton("fa-file-text-o", potLink));

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
	tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
	tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";

    read(potLink);

    setTimeout(function(){
	
	    drawChartPot();
	
	}, 100); 
}

function openLS(evt, cityName) {

 document.getElementById("iconRow").appendChild(createButton("fa-file-text-o", link));
    
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
	tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
	tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
    
    read(link);

    setTimeout(function(){
	
	    drawChartTotal();
	    drawChartTotalMonthly();
	    drawChartTotalDaily();
	    drawMuNeuRatio();

	    drawChartMuon();
	    drawChartNeutron();
	
	}, 100); 


}

function openFour(evt, cityName) {

 document.getElementById("iconRow").appendChild(createButton("fa-file-text-o", FourPaddleLink));
    
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
	tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
	tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
    read(FourPaddleLink);

    setTimeout(function(){
	
	    drawChartFourPaddle();
	
	}, 100); 
    
}

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
    smaArrayMuon = [];
    smaArrayNeutron = [];
    var x;
    var y;
    var z;
    for (var i = 0; i < spanArray.length-1;i++){
	if(i<buffer){
	    x = 0;
	    y = 0;
	    z = 0;
	    for(var j = 0;j<i;j++){
		x = x + spanArray[i-j];
		y = y + spanArrayMuon[i-j];
		z = z + spanArrayNeutron[i-j];
	    }
	    smaArray[i] = (x/i);
	    smaArrayMuon[i] = (y/i);
	    smaArrayNeutron[i] = (z/i);
	}else{
	    x = 0;
	    y = 0;
	    z = 0;
	    for(var j = 0;j<buffer;j++){
		x = x + spanArray[i-j];
		y = y + spanArrayMuon[i-j];
		z = z + spanArrayNeutron[i-j];
	    }
	    smaArray[i] = (x/buffer);
	    smaArrayMuon[i] = (y/buffer);
	    smaArrayNeutron[i] = (z/buffer);
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
    // span = document.getElementById("span").value;
    // document.getElementById("spanValue").innerHTML=span;
    formatData(span);
    sma = simple_moving_averager(buffer);

    location.reload(true);

	/*
	  setTimeout(function(){
	
	  drawChartTotal();
	  drawChartMuon();
	  drawChartNeutron();
	  drawChartPot();
	  drawChartFourPaddle();
	
	  }, 1000); 
	*/
    
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
    //formatData adds the data to the plot. If I want to get % first, need to do it here.

    getMeanCounts();

    formatData(span);
    sma = simple_moving_averager(buffer);

    //pre.textContent=this.response.split("\r\n");
    // document.body.appendChild(pre)
}

function getMeanCounts()
{
    //This function needs to be called -after- the graph is selected, but before it is produced. Read function?
    //Read in the file, sum up the mean, replace meanCounts with it.

    var counts = 0;
    var muonCounts = 0;
    var neutronCounts = 0;
    var i;
    var c = 0;

    var countHold;
    var muonHold; 
    var neutronHold;
    /*
      for(i=0;i<(dataSet.length)-1;i++){	

	
      //New timestamp
      dataName = dataSet[i].split("\n");
      dateArray= dataName[0].split(" ");


      // sums up 'span' minutes of data
      count = count + Number(dateArray[0]);
      muonCount = muonCount + Number(dateArray[1]);
      neutronCount = neutronCount + Number(dateArray[2]);

	 
      }
    
      meanCounts = count / i;
      meanMuonCounts = muonCount / i;
      meanNeutronCounts = neutronCount / i;

      //    console.log(meanCounts);
      */
    //console.log("Looking for mean!");

    for(i=0;i<(dataSet.length)-1;i++){
	
	// console.log(meanCounts);
	
	dataName = dataSet[i].split("\n");
	dateArray= dataName[0].split(" ");

	counts = counts + (Number(dateArray[0]) - counts)/(i+1);
	muonCounts = muonCounts + (Number(dateArray[1]) - muonCounts)/(i+1);
	neutronCounts = neutronCounts + (Number(dateArray[2]) - neutronCounts)/(i+1);

    }

    meanCounts = counts;
    meanMuonCounts = muonCounts;
    meanNeutronCounts = neutronCounts;


}

function formatData(x) {
    //Andrew Test
    spanArray = [];
    spanArrayMuon = [];
    spanArrayNeutron = [];
    timeArray = [];
    var total = 0;
    var percentChange;
    var muonTotal = 0;
    var percentChangeMuon;
    var neutronTotal = 0;
    var percentChangeNeutron;
    var i;
    var c = 0;
    // console.log(dataSet.length);
    for(i=0;i<(dataSet.length)-1;i++){	
	if(c==x){
	    //New timestamp
	    dataName = dataSet[i].split("\n");
	    dateArray= dataName[0].split(" ");
	    timeStampHold = new Date(dateArray[9],dateArray[4]-1,dateArray[5],dateArray[6],dateArray[7]+5,dateArray[8]);
	    timeArray.push(timeStampHold);

	    //add a value equal to total
	    //x of these become the final result

	    percentChange = (100)*(total/(x*meanCounts) - 1);
	    percentChangeMuon = (100)*(muonTotal/(x*meanMuonCounts) - 1);
	    percentChangeNeutron = (100)*(neutronTotal/(x*meanNeutronCounts) - 1);

	    countsArray.push(total);
    countsArrayMuon.push(muonTotal);
    countsArrayNeutron.push(neutronTotal);

	    spanArray.push(percentChange);
	    spanArrayMuon.push(percentChangeMuon);
	    spanArrayNeutron.push(percentChangeNeutron);

	    if (c == x && i % 1000 == 0) { 
		console.log(total/x);
		console.log(meanCounts);
		console.log(percentChange*x);
		console.log(percentChangeMuon*x);
		console.log(percentChangeNeutron*x);
	    }
	    
	    //reset c and total
	    total = 0;
	    muonTotal = 0;
	    neutronTotal = 0;
	    c = 0;
	}else{
	    // sums up 'span' minutes of data
	    total = total + Number(dateArray[0]);
	    muonTotal = muonTotal + Number(dateArray[1]);
	    neutronTotal = neutronTotal + Number(dateArray[2]);

	    c++;
	}
    }
   
}
read(link);


google.charts.load('current', {'packages':['corechart']});
/*
google.charts.setOnLoadCallback(drawChartTotal);
google.charts.setOnLoadCallback(drawMuNeuRatio);
google.charts.setOnLoadCallback(drawChartTotalDaily);
google.charts.setOnLoadCallback(drawChartTotalMonthly);
google.charts.setOnLoadCallback(drawChartMuon);
google.charts.setOnLoadCallback(drawChartNeutron);
google.charts.setOnLoadCallback(drawChartPot);
google.charts.setOnLoadCallback(drawChartFourPaddle);
*/
//Draws the chart for all of our data at once

window.onresize=function(){
    location.reload();
}

