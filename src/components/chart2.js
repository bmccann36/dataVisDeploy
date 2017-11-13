import React from 'react'
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryPolarAxis,
  VictoryLabel,
  VictoryStack
} from 'victory'
/*
  global _, window, React, ReactDOM, App, mountNode, VictoryTheme,
  VictoryChart, VictoryBar, VictoryLabel, VictoryPolarAxis, VictoryStack
*/

const  _ =require('lodash')

const directions = {
  0: "E", 45: "NE", 90: "N", 135: "NW",
  180: "W", 225: "SW", 270: "S", 315: "SE"
};

const orange = { base: "gold", highlight: "darkOrange" };
const red = { base: "tomato", highlight: "orangeRed" };
const innerRadius = 30;

export default class Chart2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { wind: this.getWindData() };
  }

  componentDidMount() {
    this.setStateInterval = window.setInterval(() => {
      this.setState({ wind: this.getWindData() });
    }, 4000);
  }

  getWindData() {
    return _.keys(directions).map((d) => {
      const speed = Math.floor(_.random() * 17) + 4;
      return {
        windSpeed: speed,
        windGust: speed + _.random(2, 10),
        windBearing: +d
      };
    });
  }

  render() {
    return (
      <VictoryChart
        polar
        animate={{ duration: 500, onLoad: { duration: 500 } }}
        theme={VictoryTheme.material}
        innerRadius={innerRadius}
        domainPadding={{ y: 10 }}
        events={[{
          childName: "all",
          target: "data",
          eventHandlers: {
            onMouseOver: () => {
              return [
                { target: "labels", mutation: () => ({ active: true }) },
                { target: "data", mutation: () => ({ active: true }) }
              ];
            },
            onMouseOut: () => {
              return [
                { target: "labels", mutation: () => ({ active: false }) },
                { target: "data", mutation: () => ({ active: false }) }
              ];
            }
          }
        }]}
      >
        <VictoryPolarAxis
          dependentAxis
          labelPlacement="vertical"
          style={{ axis: { stroke: "none" } }}
          tickFormat={() => ""}
        />
        <VictoryPolarAxis
          labelPlacement="parallel"
          tickValues={_.keys(directions).map((k) => +k)}
          tickFormat={_.values(directions)}
        />
        <VictoryStack>
          <VictoryBar
            style={{ data: {
              fill: (d, a) => a ? orange.highlight : orange.base,
              width: 40
            } }}
            data={this.state.wind}
            x="windBearing"
            y="windSpeed"

          />
          <VictoryBar
            style={{ data: {
              fill: (d, a) => a ? red.highlight : red.base,
              width: 40
            } }}
            data={this.state.wind}
            x="windBearing"
            y={(d) => d.windGust - d.windSpeed}

          />
        </VictoryStack>
        {/* <CompassCenter/> */}
      </VictoryChart>
    );
  }
 }
