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

const brian = { base: "purple", highlight: "pink" }
const orange = { base: "gold", highlight: "darkOrange" };
const red = { base: "tomato", highlight: "orangeRed" };
const innerRadius = 30;



export default function Chart2(props) {
  // console.log(props)
  const crimes = props.topFive
  console.log(crimes)


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
          style={{
            data: {
              fill:( (d, a) => {
                return d.value < d.average ? orange.base : brian.base
              }),
              width: 40
            }
          }}
          data={crimes}
          x="crime"
          y={(d)=> d.value < d.average ? d.value : d.average }
        />
        <VictoryBar //outer bar displays larger
          style={{
            data: {  // a means active, active is boolean
            // YELLOW IS ACTUAL PURPLE IS AVERAGE
              fill: (d, a) => d.value > d.average ? orange.base : brian.base, // fill: (d, a) => a ? red.highlight : red.base,
              width: 40
            }
          }}
          data={crimes}
          x="crime"
          y={(d)=> d.value > d.average ? d.value : d.average }
        />
      </VictoryStack>

    </VictoryChart>
  );

}
