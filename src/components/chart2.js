import React from 'react'
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryPolarAxis,
  VictoryLabel,
  VictoryStack
} from 'victory'
import CenterLabel from './centerLabel'
import CompassCenter from './compassCenter'
const _ = require('lodash')

const princess = { base: "purple", highlight: "pink" }
const orange = { base: "gold", highlight: "darkOrange" };
const aqua = {base: "green", highlight: "lightBlue"}
const red = { base: "tomato", highlight: "orangeRed" };
const innerRadius = 30;



export default function Chart2(props) {
  const crimes = props.topFive
  const data = props.data

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
        <VictoryBar  // INNER VAL inner bar
          style={{
            data: {
              fill:( (d, a) => {
                if(d.aboveAvg && !a) return "grey"
                if(d.aboveAvg && a) return "lightGrey"
                if(!d.aboveAvg && !a) return "blue"
                if(!d.aboveAvg && a) return "lightBlue"
              }),
              width: 40
            }
          }}
          data={data}
          x="crimeName"
          y= "lowVal"
          labels
          labelComponent={<CenterLabel color={orange}/>}
        />
        <VictoryBar // OUTER VAL bar displays larger
          style={{
            data: {  // a means active, active is boolean
            // YELLOW IS ACTUAL PURPLE IS AVERAGE
              fill:( (d, a) =>{
                if(d.aboveAvg && !a) return "blue"
                if(d.aboveAvg && a) return "lightBlue"
                if(!d.aboveAvg && !a) return "grey"
                if(!d.aboveAvg && a) return "lightGrey"
              }),
              width: 40
            }
          }}
          data={data}
          x="crimeName"
          y="highVal" // if data is greater we will display data
          labels
          labelComponent={<CenterLabel color={orange}/>}
        />
      </VictoryStack>
      <CompassCenter />
    </VictoryChart>
  );

}
