
import React from 'react'

const red = { base: "tomato", highlight: "orangeRed" };const orange = { base: "gold", highlight: "darkOrange" };


const innerRadius = 30;

export default class CompassCenter extends React.Component {

    render() {
      const { origin } = this.props;
      const circleStyle = {
        stroke: "white", strokeWidth: 2, fill: "lightGreen"
      };
      return (
        <g>
          <circle
            cx={origin.x} cy={origin.y} r={innerRadius} style={circleStyle}
          />
        </g>
      );
    }
  }
