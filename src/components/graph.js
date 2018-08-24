import React from 'react';
 



export default class Graph extends React.Component {
  state = {
    graphData: {}
  }

  componentWillReceiveProps(nextProps){
    const { data } = nextProps;
    const nextState = {};
    for (let key of Object.keys(data)) {
      nextState[key] = {
        ...this.state.graphData[key],
        viewList: [...this.state.graphData[key].viewList, data[key].views]
      }
    }
    this.setState(() => ({graphData: nextState}));
  }

  componentDidMount(){
    const initialState = {}; 
    const { data } = this.props;
    for (let key of Object.keys(data)) {
      const temp = {
        displayName: data[key].displayName,
        viewList: [data[key].views],
      }
      initialState[key] = temp;
    }
    this.setState(() => ({graphData: initialState}));
  }


  render(){
    console.log(this.state.graphData);
    return  (
      <div></div>
    );
  }
}



 

