function drawChartTotal() {
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
	      spanArray[i]*span,
	      smaArray[i]*span	]);
    }

    var optionsTotal = {
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
		axis: 'Moving Average',
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

    chart.draw(dataTotal, optionsTotal);
}

// Draws muon data
function drawChartMuon() {
    var dataMuon = new google.visualization.DataTable();
    var timeAdvance = new Date();
    timeAdvance.setTime(timeStamp.getTime());
    dataMuon.addColumn('date', 'Time');
    dataMuon.addColumn('number', 'Counts');
    dataMuon.addColumn('number','Rolling Average')

    for (i = 0; i < spanArrayMuon.length-1; i++) {
	timeAdvance.setTime(timeAdvance.getTime()+(span*60000));
	dataMuon.addRow([
	    // new Date(timeAdvance.getTime()),
	    (timeArray[i]),
	    (spanArrayMuon[i]*span),
	    (smaArrayMuon[i]*span)
	]);
    }

    var optionsMuon = {
	// chart:{
	//   title: 'Double Paddle Detector',
	//   subtitle: 'Start Time: ' + startDate.toString(),
	// },
	title: 'Liquid scintillator test stand (muon counts)',
	titleTextStyle:{
	    //      color: '#839496',
	    fontName: '"Avant Garde",Avantgarde,"Century Gothic",CenturyGothic,AppleGothic,sans-serif',
	    fontSize: '30',
	    bold: false
	},
	vAxis: {
	    title: 'Muons',
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

    var chart = new google.visualization.ScatterChart(document.getElementById('muon_counts'));

    chart.draw(dataMuon, optionsMuon);
}

// end muon

// Draws neutron data
function drawChartNeutron() {
    var dataNeutron = new google.visualization.DataTable();
    var timeAdvance = new Date();
    timeAdvance.setTime(timeStamp.getTime());
    dataNeutron.addColumn('date', 'Time');
    dataNeutron.addColumn('number', 'Counts');
    dataNeutron.addColumn('number','Rolling Average')

    for (i = 0; i < spanArrayNeutron.length-1; i++) {
	timeAdvance.setTime(timeAdvance.getTime()+(span*60000));
	dataNeutron.addRow([
	    // new Date(timeAdvance.getTime()),
	    (timeArray[i]),
	    (spanArrayNeutron[i]*span),
	    (smaArrayNeutron[i]*span)
	]);
    }

    var optionsNeutron = {
	// chart:{
	//   title: 'Double Paddle Detector',
	//   subtitle: 'Start Time: ' + startDate.toString(),
	// },
	title: 'Liquid scintillator test stand (neutron counts)',
	titleTextStyle:{
	    //      color: '#839496',
	    fontName: '"Avant Garde",Avantgarde,"Century Gothic",CenturyGothic,AppleGothic,sans-serif',
	    fontSize: '30',
	    bold: false
	},
	vAxis: {
	    title: 'Neutrons',
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
		//       color: '#93a1a1'
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
	//	height:600,
	//	width:1000,
	legend: {
	    position: 'none'
	}
    };

    var chart = new google.visualization.ScatterChart(document.getElementById('neutron_counts'));

    chart.draw(dataNeutron, optionsNeutron);
    //  console.log(smaArrayNeutron[4].toString());

}

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
	      spanArray[i]*span,
	      smaArray[i]*span	]);
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
		axis: 'Moving Average',
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
	      spanArray[i]*span,
	      smaArray[i]*span	]);
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
		axis: 'Moving Average',
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

    var chart = new google.visualization.ScatterChart(document.getElementById('fourPad_counts'));

    chart.draw(dataTotal, optionsTotal);
}
