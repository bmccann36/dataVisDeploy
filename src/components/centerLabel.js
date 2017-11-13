
import React from 'react'
import {VictoryLabel} from 'victory'

const red = { base: "tomato", highlight: "orangeRed" };const orange = { base: "gold", highlight: "darkOrange" };


const innerRadius = 30;


export default class CenterLabel extends React.Component {
  render() { // pass props down to center label
    // passing datum into this component so it can be looked up in directions
    // gets a datum prop from it's parent compoenent ****
    const {datum, active, color} = this.props;
    if(this.props.active) console.log(this.props)
    // console.log('datum._x',datum._x)
    // 0 , 45, 90, 135, etc...
    const text = datum.value
    // datum.average
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
