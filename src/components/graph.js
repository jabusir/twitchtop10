import React from 'react';
import SmoothieComponent from 'react-smoothie';
 

function cloneGraphDataImmutably(graphData) {
  const graphDataNext = {};
  for (let i of Object.entries(graphData)) {
    const displayName = i[0];
    const data = i[1];
    graphDataNext[displayName] = [...data];
  }
  return graphDataNext;
}

function addDataToGraphData(data, graphData) {
  for (let i of Object.values(data)) {
    const displayName = i.displayName;
    const views = i.views;

    if (graphData.hasOwnProperty(displayName) === false) {
      graphData[displayName] = [];
    }

    const data = graphData[displayName];
    graphData[displayName].push({
      views: views,
    });
  }
}

export default class Graph extends React.Component {
  state = {
    graphData: {}
  }
  componentWillReceiveProps(nextProps){
    const { graphData } = this.state;

    const graphDataNext = cloneGraphDataImmutably(graphData);
    addDataToGraphData(nextProps.data, graphDataNext);


    this.setState(() => ({
      graphData: graphDataNext
    }));
  }
  componentDidMount(){
      const graphDataNext = {};
      addDataToGraphData(this.props.data, graphDataNext);

      this.setState(() => ({
        graphData: graphDataNext
      }));

    const first = this.refs.chart.addTimeSeries({},{ strokeStyle: 'rgba(0, 255, 0, 1)', fillStyle: 'rgba(0, 255, 0, 0.2)', lineWidth: 4 });
    const second = this.refs.chart.addTimeSeries({},{ strokeStyle: 'rgba(255, 0, 0, 1)', fillStyle: 'rgba(255, 0, 0, 0.2)', lineWidth: 4 });
    const third = this.refs.chart.addTimeSeries({},{ strokeStyle: 'rgba(255, 0, 0, 1)', fillStyle: 'rgba(255, 0, 0, 0.2)', lineWidth: 4 });
    const fourth = this.refs.chart.addTimeSeries({},{ strokeStyle: 'rgba(255, 0, 0, 1)', fillStyle: 'rgba(255, 0, 0, 0.2)', lineWidth: 4 });
    const fifth = this.refs.chart.addTimeSeries({},{ strokeStyle: 'rgba(255, 0, 0, 1)', fillStyle: 'rgba(255, 0, 0, 0.2)', lineWidth: 4 });
    const sixth = this.refs.chart.addTimeSeries({},{ strokeStyle: 'rgba(255, 0, 0, 1)', fillStyle: 'rgba(255, 0, 0, 0.2)', lineWidth: 4 });
    const seventh = this.refs.chart.addTimeSeries({},{ strokeStyle: 'rgba(255, 0, 0, 1)', fillStyle: 'rgba(255, 0, 0, 0.2)', lineWidth: 4 });
    const eigth = this.refs.chart.addTimeSeries({},{ strokeStyle: 'rgba(255, 0, 0, 1)', fillStyle: 'rgba(255, 0, 0, 0.2)', lineWidth: 4 });
    const ninth = this.refs.chart.addTimeSeries({},{ strokeStyle: 'rgba(255, 0, 0, 1)', fillStyle: 'rgba(255, 0, 0, 0.2)', lineWidth: 4 });
    const tenth = this.refs.chart.addTimeSeries({},{ strokeStyle: 'rgba(255, 0, 0, 1)', fillStyle: 'rgba(255, 0, 0, 0.2)', lineWidth: 4 });
   
      this.dataGenerator = setInterval(() => {
        const time = new Date().getTime();
        first.append(time, this.props.data[Object.keys(this.props.data)[0]].views);
        second.append(time, this.props.data[Object.keys(this.props.data)[1]].views);
        third.append(time, this.props.data[Object.keys(this.props.data)[2]].views);
        fourth.append(time, this.props.data[Object.keys(this.props.data)[3]].views);
        fifth.append(time, this.props.data[Object.keys(this.props.data)[4]].views);
        sixth.append(time, this.props.data[Object.keys(this.props.data)[5]].views);
        seventh.append(time, this.props.data[Object.keys(this.props.data)[6]].views);
        eigth.append(time, this.props.data[Object.keys(this.props.data)[7]].views);
        ninth.append(time, this.props.data[Object.keys(this.props.data)[8]].views);
        tenth.append(time, this.props.data[Object.keys(this.props.data)[9]].views);
        
      }, 500);
  }

  render(){
    console.log('line: ', this.props.data[Object.keys(this.props.data)[0]]);
    return  (
      <SmoothieComponent ref="chart" width="1000" height="1000" />
    );
  }
}



 

