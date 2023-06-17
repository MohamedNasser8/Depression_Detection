import React from 'react';
import ReactApexChart from "react-apexcharts";
import * as ReactDOM from 'react-dom';
export default class ApexChart extends React.Component {
    constructor(props) {
      super(props);

      this.state = {

        series: [{
          name: 'Series 1',
          data: [80, 50, 30, 40, 100, 20],
        }],
        options: {
          chart: {
            height: 10,
            type: 'radar',
          },
          title: {
            text: 'Basic Radar Chart'
          },
          xaxis: {
            categories: ['Diminished ability to think or concentrate', 'Feeling low',
            'Psychomotor agitation or retardation', 'sleep disorder',
            'Suicidality', 'weight disorder']
          }
        },


      };
    }



    render() {
      return (


  <div id="chart">
<ReactApexChart options={this.state.options} series={this.state.series} type="radar" height={750} />
</div>


      );
    }
  }