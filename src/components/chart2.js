import React from 'react'
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryPolarAxis,
  VictoryLabel,
  VictoryStack
} from 'victory'

const _ = require('lodash')

const brian = { base: "purple", highlight: "pink"}
const orange = { base: "gold", highlight: "darkOrange" };
const red = { base: "tomato", highlight: "orangeRed" };
const innerRadius = 30;




export default function Chart2(props) {
  // console.log(props)
  const crimes = props.topFive

    const byType = {
      0: crimes[0], 72: crimes[1], 144: crimes[2], 216: crimes[3],
      288: crimes[4], 360: crimes[5]
    };
    // console.log(crimeCategories)
console.log(crimes)
// crimes.push({})
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
          labelPlacement="perpendicular"
          tickValues={crimes.map((entry) => entry.crime)}
        />
        <VictoryStack>
          <VictoryBar  // inner bar
            style={{ data: {
              fill: (d, a) => a ? orange.highlight : orange.base, // fill: (d, a) => a ? brian.highlight : brian.base
              width: 40
            } }}
            data={crimes} // array with windSpeed, windGust, windBearing, wind bearing is in increment degrees
            x="crime"
            y="value"
          />
          <VictoryBar // the outer bar
            style={{ data: {  // a means active, active is boolean
              fill: (d, a) => a ? brian.highlight : brian.base, // fill: (d, a) => a ? red.highlight : red.base,
              width: 40
            } }}
            data={crimes}
            x="crime"
            y={(d) => d+10}  // calculates data.windGust - data.windSpeed
          />
          </VictoryStack>

      </VictoryChart>
    );

}
