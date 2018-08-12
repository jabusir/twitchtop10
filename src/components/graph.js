import React from 'react';
import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries
} from 'react-vis';

export default class Graph extends React.Component {
  state = {
    graphData: {}
  }
  componentWillReceiveProps(nextProps){
    const nextState = {...this.state.graphData};
    for (let i of Object.values(nextProps.data)){
      nextState[i.displayName].push(i.views);
    }
  }
  componentDidMount(){
    const nextState = {};
    for (let i of Object.values(this.props.data)) {
      nextState[i.displayName] = [i.views];
    }
    this.setState(() =>  ({ graphData: nextState }));
} 
  render(){
    console.log(this.state.graphData);
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
        {this.state.graphData.map(props => <LineSeries {...props}/>)}
    </XYPlot>
);}
}