
import React from 'react'
import {VictoryLabel} from 'victory'

const red = { base: "tomato", highlight: "orangeRed" };const orange = { base: "gold", highlight: "darkOrange" };


const innerRadius = 30;

const directions = {
  0: "E", 45: "NE", 90: "N", 135: "NW",
  180: "W", 225: "SW", 270: "S", 315: "SE"
};

export default class CenterLabel extends React.Component {
  render() {
    const {datum, active, color} = this.props;
    const text = [ `${directions[datum._x]}`, `${Math.round(datum._y1)} mph` ];
    const baseStyle = { fill: color.highlight, textAnchor: "middle" };
    const style = [
      { ...baseStyle, fontSize: 18, fontWeight: "bold"},
      { ...baseStyle, fontSize: 12 }
    ];

    return active ?
      (
        <VictoryLabel
          text={text} style={style} x={175} y={175} renderInPortal
        />
      ) : null;
  }
}
