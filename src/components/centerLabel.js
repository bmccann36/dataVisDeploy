
import React from 'react'
import { VictoryLabel } from 'victory'

const red = { base: "tomato", highlight: "orangeRed" }; const orange = { base: "gold", highlight: "darkOrange" };


const innerRadius = 30;


export default class CenterLabel extends React.Component {
  render() { // pass props down to center label
    // passing datum into this component so it can be looked up in directions
    // gets a datum prop from it's parent compoenent ****
    const { datum, active, color } = this.props;
    console.log(this.props)
    const aboveAvg = datum.aboveAvg
    let inside = datum.y0 == 0
    let val = datum._y1
    let message
    if(val == datum.lowVal && aboveAvg) message = 'average'
    if(val != datum.lowVal && aboveAvg) message = 'actual'
    if(val == datum.lowVal && !aboveAvg) message = 'actual'
    if(val != datum.lowVal && !aboveAvg) message = 'average'

    let text = [val, message]
    const baseStyle = { fill: color.highlight, textAnchor: "middle" };
    const style = [
      { ...baseStyle, fontSize: 18, fontWeight: "bold" },
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


// if(datum._y1 == datum.average) avgVact = 'average'
// else avgVact = 'actual'
// if(!inside && datum._y1> datum.average) avgVact = 'average'
