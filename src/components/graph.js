import React from 'react';
import {VictoryChart, VictoryLine} from 'victory';
 

export default class Graph extends React.Component {
  state = {
    graphData: {},
    seconds: 0,
  }

  componentWillReceiveProps(nextProps){
    const { data } = nextProps;
    const nextState = {};
    for (let key of Object.keys(data)) {
      if (data.hasOwnProperty(key)) {
        nextState[key] = {
          ...this.state.graphData[key],
          viewList: [...this.state.graphData[key].viewList, data[key].views]
        }
      } else {
        nextState[key] = {
          displayName: data[key].displayName,
          viewList: [ data[key].views ]
        }
      }
    }
    this.setState((prevState) => ({
      graphData: nextState,
      seconds: prevState.seconds++
    }));
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
      <div>
      <VictoryChart width={600} height={470} scale={{ x: "time" }}
        >
            
            {Object.values(this.state.graphData).map(streamer => (
              <VictoryLine 
                data={streamer.viewList.map((point) => ({x: this.state.seconds, y: point}) )}
              />
            ))}
               


          </VictoryChart>
         

      </div>
    );
  }
}



 

