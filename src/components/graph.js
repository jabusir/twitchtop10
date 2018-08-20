import React from 'react';
 

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

  }

  render(){
    console.log('this.props.data: ', this.props.data);
    console.log('object.keys: ', Object.keys(this.props.data));
    return  (
      <div></div>
    );
  }
}



 

