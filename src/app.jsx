import React, { Component } from 'react';
import HighCharts, { chart, Chart } from 'highcharts/highstock';
import HighChartsReact from 'highcharts-react-official';
import './app.css';
import Navbar from './components/navbar';

 const chartOptions = {
    xAxis: {
      tickInterval: 7 * 24 * 3600 * 1000, // one week
      tickWidth: 0,
      gridLineWidth: 1,
      labels: {
          align: 'left',
          x: 3,
          y: -3
      }
  },
    title: {
      text: 'Data from ioCrops'
  },
  subtitle: {
    text: 'Source: ioCrops, Inc.'
  },
  tooltip: {
    valueDecimals: 1,
    valueSuffix: '%'
  },
    series : [{name : 'tempdata', data :[1, 2, 3, 4, 5] }]
  };


class App extends Component {

  

 componentDidMount(){

    fetch('./resources/data.json') .then(res => res.json())
    .then((data) => {
      console.log(data);
      for (var name in data.dataset[0]){
        var tempList = {};
        tempList["name"] = name;
        chartOptions.series.push(tempList);
      } // name 
      console.log(chartOptions.series)
      for(var i = 0; i < data.dataset.length ; i ++){
        for ( var j = 0; j < chartOptions.series.length ; j++){
          var key = chartOptions.series[j][0];
          chartOptions.series[j][1].push(data.dataset[i][key]);
        }
      }   
      

    })
    
    .catch(err => {
      console.log("Error Reading data " + err);
    });
  }

  render() {
    return (
      <>
        <Navbar/>
        <HighChartsReact highcharts={HighCharts} options={chartOptions} className="data-chart">
        </HighChartsReact>

      </>
    );
  }
}

export default App;