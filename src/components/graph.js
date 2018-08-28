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
      if (this.state.graphData.hasOwnProperty(key)) {
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
      seconds: prevState.seconds + 1,
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
    return  (
      <div>
      <VictoryChart 
        width={250} 
        height={250} 
        scale={{ x: "time" }}
        domain={{ x: [0, 120], y: [0, 50000] }}
        domainPadding={20}
        >
            
            {Object.values(this.state.graphData).map(streamer => (
              <VictoryLine 
                data={streamer.viewList.map((point) => ( console.log({ x: this.state.seconds, y: point })) )}
              />
            ))}
               


          </VictoryChart>
         

      </div>
    );
  }
}



 

