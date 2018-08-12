import React from 'react';
import produce from 'immer';
import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries,
  DiscreteColorLegend
} from 'react-vis';
import Highlight from './Highlight';

export default class Graph extends React.Component {
  state = {
    series: [],
    lastDrawLocation: null
  }

  componentDidUpdate(propsPrev, statePrev) {
    const { data } = this.props;
    const { data:dataPrev } = propsPrev;

    if (data !== dataPrev) {
      this.setDataToState();
    }

    const { lastDrawLocation } = this.state;
    const { lastDrawLocation:lastDrawLocationPrev } = statePrev;
    if (lastDrawLocation !== lastDrawLocationPrev) {
      console.log('lastDrawLocation:', lastDrawLocation);
    }

  }
  componentDidMount() {
    this.setDataToState();
  }

  render() {
    const { series, lastDrawLocation } = this.state;
    return (
      <div className="example-with-click-me">
        <div className="legend">
          <DiscreteColorLegend
            onItemClick={this.handleItemClick}
            width={300}
            height={200}
            items={series} />
        </div>

        <div className="chart no-select">
          <FlexibleWidthXYPlot
            animation
            xDomain={lastDrawLocation && [lastDrawLocation.left, lastDrawLocation.right]}
            yDomain={lastDrawLocation && [lastDrawLocation.top, lastDrawLocation.bottom]}
            height={600}>

            <HorizontalGridLines />

            <YAxis />
            <XAxis />

            {series.map(entry => (
              <LineSeries
                key={entry.title}
                data={entry.data}
              />
            ))}

            <Highlight onBrushEnd={(area) => {
              this.setState({
                lastDrawLocation: area
              });
            }} />

          </FlexibleWidthXYPlot>
        </div>

        <button className="showcase-button" onClick={() => {
          this.setState({ lastDrawLocation: null });
        }}>
          Reset Zoom
        </button>
      </div>
    );
  }

  setDataToState() {
    const { data } = this.props;

    this.setState(
      produce(state => {
        const { series } = state;

        for (const { displayName, views } of Object.values(data)) {

          let seriesEntry = series.find(entry => entry.title === displayName);

          if (!seriesEntry) {
            seriesEntry = {
              title: displayName,
              disabled: false,
              data: [{ x: 0, y: views }]
            };
            series.push(seriesEntry);
          } else {
            seriesEntry.data.push({
              x: seriesEntry.data.length,
              y: views
            });
          }

          series.sort((seriesEntryA, seriesEntryB) => {
            return average(seriesEntryA.data.map(d => d.y)) - average(seriesEntryB.data.map(d => d.y));
          })

        }
      })
    );
  }

  handleItemClick = (seriesEntry, index) => {
    console.log('index:', index, 'seriesEntry:', seriesEntry, 'seriesEntry.data.map(d => d.x):', seriesEntry.data.map(d => d.x));
    this.setState({
      lastDrawLocation: {
        left: 0,
        right: 0,
        top: Math.max(...seriesEntry.data.map(d => d.y)) + 200,
        bottom: Math.min(...seriesEntry.data.map(d => d.y)) - 200
      }
    })
  }
}

function sum(arr) {
  return arr.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue;
  }, 0);
}
function average(arr) {
  return sum(arr) / arr.length;
}
