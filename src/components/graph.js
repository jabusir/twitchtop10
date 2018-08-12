import React from 'react';
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries
} from 'react-vis';

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
      y: views,
      x: data.length
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
  }

  render(){
    const { graphData } = this.state;

    console.log('Object.entries(graphData):', Object.entries(graphData));

    return  (
      <XYPlot
        width={300}
        height={300}
        colorType="linear"
        colorDomain={[0, 9]}
        colorRange={['yellow', 'orange']}
        >
        <HorizontalGridLines />
        <VerticalGridLines />
        <XAxis />
        <YAxis />
        { Object.entries(graphData).map(entry => {
          const displayName = entry[0];
          const data = entry[1];
          console.log('displayName:', displayName, 'data:', data);
          return (
            <LineSeries key={displayName} data={data} />
          );
        }) }
    </XYPlot>
);}
}
