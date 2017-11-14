
import React from 'react'
import { VictoryLabel } from 'victory'




const innerRadius = 30;


export default class CenterLabel extends React.Component {
  render() {
    const { datum, active, color } = this.props;

    const aboveAvg = datum.aboveAvg
    let inside = datum.y0 == 0
    let val = datum._y1
    let message
    if(val == datum.lowVal && aboveAvg) message = 'average'
    if(val != datum.lowVal && aboveAvg) message = 'actual'
    if(val == datum.lowVal && !aboveAvg) message = 'actual'
    if(val != datum.lowVal && !aboveAvg) message = 'average'

    let text = [val, message]
    const baseStyle = { fill: "grey", textAnchor: "middle" };
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

