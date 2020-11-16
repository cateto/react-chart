import React, { Component } from 'react';
import HighCharts, { chart, Chart } from 'highcharts/highstock';
import HighChartsReact from 'highcharts-react-official';
import './app.css';
import Navbar from './components/navbar';


class App extends Component {

  state = {
    chartOptions : {
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
      series : [{
        data: [1, 2, 3]
      }]
    }
    };

 componentDidMount(){

    fetch('https://s3.us-west-2.amazonaws.com/secure.notion-static.com/ada77c5d-fd46-402f-a014-0a0bd8052104/data.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20201115%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20201115T111716Z&X-Amz-Expires=86400&X-Amz-Signature=f4e49d17008b4ec4c89daffc40fcb2db025e7db2a36e9638c3810411ed526c51&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22data.json%22')
    .then(res => res.json())
    .then((json) => {
      console.log(json);
      this.setState({series : [{data : json}]})
    })
    
    .catch(err => {
      console.log("Error Reading data " + err);
    });
  }

  render() {
    return (
      <>
        <Navbar/>
        <HighChartsReact highcharts={HighCharts} options={this.state.chartOptions} className="data-chart">
        </HighChartsReact>

      </>
    );
  }
}

export default App;