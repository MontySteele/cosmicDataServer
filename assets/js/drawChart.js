// draw pot data
function drawChartPot() {
    var dataTotal = new google.visualization.DataTable();
    var timeAdvance = new Date();
    timeAdvance.setTime(timeStamp.getTime());
    dataTotal.addColumn('date', 'Time');
    dataTotal.addColumn('number', 'Counts');
    dataTotal.addColumn('number','Moving Average');

    for (i = 0; i < spanArray.length-1; i++) {
	timeAdvance.setTime(timeAdvance.getTime()+(span*60000));
	dataTotal.addRow(
	    [ timeArray[i],
	      spanArray[i],
	      smaArray[i]	]);
    }

    var optionsTotal = {
	// chart:{
	//   title: 'Double Paddle Detector',
	//   subtitle: 'Start Time: ' + startDate.toString(),
	// },
	title: 'Pot Detector (all counts)',
	titleTextStyle:{
	    //      color: '#839496',
	    fontName: '"Avant Garde",Avantgarde,"Century Gothic",CenturyGothic,AppleGothic,sans-serif',
	    fontSize: '30',
	    bold: false
	},
	vAxis: {
	    title: '% Variation in Counts',
	    titleTextStyle: {
		fontSize: 16,
		//        color: '#93a1a1'
	    },
	    //      gridlines: {
	    //        color: '073642'
	    //      },
	    viewWindowMode:'explicit',
	    viewWindow:{
		max: 15,
		min: -15
	    }//
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
		pointSize: 0
	    },
	    1: {
		axis: 'Moving Average',
		lineWidth: 1,
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

    var chart = new google.visualization.ScatterChart(document.getElementById('pot_counts'));

    chart.draw(dataTotal, optionsTotal);
}

function drawChartFourPaddle() {
    var dataTotal = new google.visualization.DataTable();
    var timeAdvance = new Date();
    timeAdvance.setTime(timeStamp.getTime());
    dataTotal.addColumn('date', 'Time');
    dataTotal.addColumn('number', 'Counts');
    dataTotal.addColumn('number','Moving Average');

    for (i = 0; i < spanArray.length-1; i++) {
	timeAdvance.setTime(timeAdvance.getTime()+(span*60000));
	dataTotal.addRow(
	    [ timeArray[i],
	      spanArray[i],
	      smaArray[i]	]);
    }

    var optionsTotal = {
	// chart:{
	//   title: 'Double Paddle Detector',
	//   subtitle: 'Start Time: ' + startDate.toString(),
	// },
	title: '4-Paddle Detector (muons)',
	titleTextStyle:{
	    //      color: '#839496',
	    fontName: '"Avant Garde",Avantgarde,"Century Gothic",CenturyGothic,AppleGothic,sans-serif',
	    fontSize: '30',
	    bold: false
	},
	vAxis: {
	    title: '% Variation in Muons',
	    titleTextStyle: {
		fontSize: 16,
		//        color: '#93a1a1'
	    },
	    //      gridlines: {
	    //        color: '073642'
	    //      },
	    viewWindowMode:'explicit',
	    viewWindow:{
		max: 5,
		min: -5
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
		pointSize: 0
	    },
	    1: {
		axis: 'Moving Average',
		lineWidth: 1,
		        color: '#6c71c4',
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

    var chart = new google.visualization.ScatterChart(document.getElementById('fourPad_counts'));

    chart.draw(dataTotal, optionsTotal);
}
