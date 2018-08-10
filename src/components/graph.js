import React from 'react';

export default class Graph extends React.Component {
  state = {
    graphData: {}
  }
  componentWillReceiveProps(nextProps){
    const nextState = {...this.state.graphData};
    for (let i of nextProps.data){
      nextState[i.display_name].push(i.view_count);
    }
  }
  componentDidMount(){
    console.log(this.props.data);
    const nextState = {};
    for (let i of this.props.data){
      nextState[i.display_name] = [i.view_count]
    }
    this.setState(() =>  ({graphData: nextState }));
} 
  render(){
    console.log(this.state.graphData);
    return <div>hala</div>
  }
}