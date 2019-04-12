function drawChartTotal() {
    var dataTotal = new google.visualization.DataTable();

    var timeAdvance = new Date();
    timeAdvance.setTime(timeStamp.getTime());
    dataTotal.addColumn('date', 'Time');
    dataTotal.addColumn('number','Moving Average');

    for (i = 0; i < spanArray.length-1; i++) {
	timeAdvance.setTime(timeAdvance.getTime()+(span*60000));
	dataTotal.addRow(
			 [ timeArray[i],
			   smaArray[i]	]);
    }

    //  dataDump('putput.txt', timeArray[], smaAray[]);
//    dataDump(mkStorage);
  
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
		//	max: 15,
		//	min: -10
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
		axis: 'Moving Average',
		lineWidth: 1,
		color: '#0099C6',
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
    
    /*
      google.visualization.events.addListener(chart, 'ready', function () {
      var imgUri = chart.getImageURI();
	  
      // window.open(imgUri);

      total_counts.innerHTML = '<img src="' + imgUri + '">';
      var tc =  total_counts.innerHTML;
      // console.log(tc);

      });
    */
}

function drawChartTotalDaily() {
    var dataTotalDaily = new google.visualization.DataTable();

    var timeAdvance = new Date();
    
    timeAdvance.setTime(timeStamp.getTime());
    dataTotalDaily.addColumn('date', 'Time');
    dataTotalDaily.addColumn('number','Moving Average');

    for (i = spanArray.length-1-12; i < spanArray.length-1; i++) {
	timeAdvance.setTime(timeAdvance.getTime()+(span*60000));
	dataTotalDaily.addRow(
			      [ timeArray[i],
				smaArray[i]	]);
    }
  
    var optionsTotal = {
	// chart:{
	//   title: 'Double Paddle Detector',
	
	// },
	title: 'Liquid scintillator test stand (all counts), 24 hours',
	//	subtitle: 'Start Time: ' + startDate.toString(),
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
		//	max: auto,
		//	min: auto
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
		axis: 'Moving Average',
		lineWidth: 1,
		color: '#0099C6',
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

    var chartDay = new google.visualization.ScatterChart(document.getElementById('total_counts_daily'));
    chartDay.draw(dataTotalDaily, optionsTotal);
    /*
      google.visualization.events.addListener(chart, 'ready', function () {
      var imgUri = chart.getImageURI();
	  
      // window.open(imgUri);

      total_counts.innerHTML = '<img src="' + imgUri + '">';
      var tc =  total_counts.innerHTML;
      // console.log(tc);

      });
    */
}

function drawChartTotalMonthly() {
    var dataTotalMonthly = new google.visualization.DataTable();

    var timeAdvance = new Date();
    timeAdvance.setTime(timeStamp.getTime());
    
    dataTotalMonthly.addColumn('date', 'Time');
    dataTotalMonthly.addColumn('number','Moving Average');

    for (i = spanArray.length-1-(15*24); i < spanArray.length-1; i++) {
	timeAdvance.setTime(timeAdvance.getTime()+(span*60000));
	dataTotalMonthly.addRow(
				[ timeArray[i],
				  smaArray[i]	]);
    }

    timeAdvance.setTime(timeStamp.getTime());
 
  
    var optionsTotal = {
	// chart:{
	//   title: 'Double Paddle Detector',
	//   subtitle: 'Start Time: ' + startDate.toString(),
	// },
	title: 'Liquid scintillator test stand (all counts), 30 days',
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
		//	max: 15,
		//	min: -10
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
		axis: 'Moving Average',
		lineWidth: 1,
		color: '#0099C6',
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

    var chartMonth = new google.visualization.ScatterChart(document.getElementById('total_counts_monthly'));
    chartMonth.draw(dataTotalMonthly, optionsTotal);
    
    /*
      google.visualization.events.addListener(chart, 'ready', function () {
      var imgUri = chart.getImageURI();
	  
      // window.open(imgUri);

      total_counts.innerHTML = '<img src="' + imgUri + '">';
      var tc =  total_counts.innerHTML;
      // console.log(tc);

      });
    */
}

// Draws muon data
function drawChartMuon() {
    var dataMuon = new google.visualization.DataTable();
    var timeAdvance = new Date();
    timeAdvance.setTime(timeStamp.getTime());
    dataMuon.addColumn('date', 'Time');
    dataMuon.addColumn('number','Rolling Average')

	for (i = 0; i < spanArrayMuon.length-1; i++) {
	    timeAdvance.setTime(timeAdvance.getTime()+(span*60000));
	    dataMuon.addRow([
			     // new Date(timeAdvance.getTime()),
			     (timeArray[i]),
			     (smaArrayMuon[i])
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
		//	max: 15,
		//	min: -15
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
		axis: 'Rolling Average',
		lineWidth: 1,
		color: '#3366CC',
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
    dataNeutron.addColumn('number','Rolling Average')

	for (i = 0; i < spanArrayNeutron.length-1; i++) {
	    timeAdvance.setTime(timeAdvance.getTime()+(span*60000));
	    dataNeutron.addRow([
				// new Date(timeAdvance.getTime()),
				(timeArray[i]),
				(smaArrayNeutron[i])
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
	    title: '% Variation in Neutrons',
	    titleTextStyle: {
		fontSize: 16,
		//        color: '#93a1a1'
	    },
	    //      gridlines: {
	    //        color: '073642'
	    //      },
	    viewWindowMode:'explicit',
	    viewWindow:{
		//	max: 30,
		//	min: -30
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
		axis: 'Rolling Average',
		lineWidth: 1,
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

function drawMuNeuRatio() {
    var dataTotal = new google.visualization.DataTable();

    var timeAdvance = new Date();
    timeAdvance.setTime(timeStamp.getTime());
    dataTotal.addColumn('date', 'Time');
    dataTotal.addColumn('number', 'Counts');

    for (i = 0; i < spanArray.length-1; i++) {
	timeAdvance.setTime(timeAdvance.getTime()+(span*60000));
	dataTotal.addRow(
			 [ timeArray[i],
			   countsArrayMuon[i] / countsArrayNeutron[i]	]);
    }

    var optionsTotal = {
	// chart:{
	//   title: 'Double Paddle Detector',
	//   subtitle: 'Start Time: ' + startDate.toString(),
	// },
	title: 'Ratio of Muon counts to Neutron counts',
	titleTextStyle:{
	    //      color: '#839496',
	    fontName: '"Avant Garde",Avantgarde,"Century Gothic",CenturyGothic,AppleGothic,sans-serif',
	    fontSize: '30',
	    bold: false
	},
	vAxis: {
	    title: 'Ratio',
	    titleTextStyle: {
		fontSize: 16,
		//        color: '#93a1a1'
	    },
	    //      gridlines: {
	    //        color: '073642'
	    //      },
	    viewWindowMode:'explicit',
	    viewWindow:{
		//	max: 15,
		//	min: -10
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
		pointSize: 1
	    },
	   
	},
	backgroundColor: 'transparent',
	// height:400,
	legend: {
	    position: 'none'
	}
    };

    var chart = new google.visualization.ScatterChart(document.getElementById('muNeu_ratio'));
    chart.draw(dataTotal, optionsTotal);

    // var chartMonth = new google.visualization.ScatterChart(document.getElementById('total_counts_monthly'));
    //chartMonth.draw(dataTotalMonthly, optionsTotal);
    
    /*
      google.visualization.events.addListener(chart, 'ready', function () {
      var imgUri = chart.getImageURI();
	  
      // window.open(imgUri);

      total_counts.innerHTML = '<img src="' + imgUri + '">';
      var tc =  total_counts.innerHTML;
      // console.log(tc);

      });
    */
}
