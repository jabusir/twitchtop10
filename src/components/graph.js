import React from 'react';

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
    this.setState(() =>  ({graphData: nextState }));
} 
  render(){
    console.log(this.state.graphData);
    return <div>hala</div>
  }
}