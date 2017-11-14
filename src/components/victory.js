import React from 'react'
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryPolarAxis,
  VictoryLabel,
  VictoryStack
} from 'victory'
import CompassCenter from './compassCenter'
import CenterLabel from './centerLabel.1'

const  _ =require('lodash')

const directions = {
  0: "E", 45: "NE", 90: "N", 135: "NW",
  180: "W", 225: "SW", 270: "S", 315: "SE"
};

const orange = { base: "gold", highlight: "darkOrange" };

const brian = { base: "purple", highlight: "pink"}

const red = { base: "tomato", highlight: "orangeRed" };

const innerRadius = 30;


export default class Victory extends React.Component {
  constructor(props) {
    super(props);
    this.state = { wind: this.getWindData() };
  }

  componentDidMount() {
    // this.setStateInterval = window.setInterval(() => {
      this.setState({ wind: this.getWindData() });
    // }, 4000);
    console.log(this.state)
    // wind: Array(8)}
    // {windSpeed: 21, windGust: 28, windBearing: 0}, {windSpeed: 21, windGust: 27, windBearing: 45}, {windSpeed: 4, windGust: 8, windBearing: 90}.....
    // windbearing correspon to the keys in directions
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
          <VictoryBar  // inner bar
            style={{ data: {
              fill: (d, a) => a ? orange.highlight : orange.base, // fill: (d, a) => a ? brian.highlight : brian.base
              width: 40
            } }}
            data={this.state.wind} // array with windSpeed, windGust, windBearing, wind bearing is in increment degrees
            x="windBearing"
            y="windSpeed"
            labels
            labelComponent={<CenterLabel color={orange}/>}
          />
          <VictoryBar // the outer bar
            style={{ data: {  // a means active, active is boolean
              fill: (d, a) => a ? brian.highlight : brian.base, // fill: (d, a) => a ? red.highlight : red.base,
              width: 40
            } }}
            data={this.state.wind}
            x="windBearing"
            y={(d) => d.windGust - d.windSpeed}  // calculates  labels
            labels
            labelComponent={<CenterLabel color={red}/>}
          />
        </VictoryStack>
      <CompassCenter />
      </VictoryChart>
    );
  }
 }
