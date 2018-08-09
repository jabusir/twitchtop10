import React from 'react';
import ReactDOM from 'react-dom';
import { range, random } from 'lodash';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryStack, VictoryArea } from 'victory';



export default class Graph extends React.Component {
    constructor(props) {
      super(props);
      this.state = { data: this.getData() };
    }
  
    componentDidMount() {
      this.setStateInterval = window.setInterval(() => {
        this.setState({ data: this.getData() });
      }, 4000);
    }
  
    getData() {
      return range(7).map(() => {
        return [
          { x: 1, y: random(1, 5) },
          { x: 2, y: random(1, 10) },
          { x: 3, y: random(2, 10) },
          { x: 4, y: random(2, 10) },
          { x: 5, y: random(2, 15) }
        ];
      });
    }
  
    render() {
      return (
        <VictoryChart
          theme={VictoryTheme.material}
          animate={{ duration: 1000 }}
        >
          <VictoryStack
            colorScale={"blue"}
          >
            {this.state.data.map((data, i) => {
              return (
                <VictoryArea
                  key={i}
                  data={data}
                  interpolation={"basis"}
                />
              );
            })}
          </VictoryStack>
        </VictoryChart>
      );
    }
  }
  
