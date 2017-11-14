import React from 'react'
import Graph from './Graph'
import grid from '../grid'
import Chart2 from './chart2'
import Victory from './victory'


const averages = { 'PETIT LARCENY': 23, 'HARRASSMENT 2': 18, 'ASSAULT 3 & RELATED OFFENSES': 17, 'CRIMINAL MISCHIEF & RELATED OF': 14, 'GRAND LARCENY': 14, 'OFF. AGNST PUB ORD SENSBLTY &': 7, 'DANGEROUS DRUGS': 19, 'FELONY ASSAULT': 10, ROBBERY: 5, 'MISCELLANEOUS PENAL LAW': 6, BURGLARY: 4, 'DANGEROUS WEAPONS': 6 }



export default class GraphCont extends React.Component {


  render() {
    const dummy = this.state
    let topFive
    let data
    // console.log(this.props, 'state in graph container')
    const up = this.props.up
    const over = this.props.over
    if (up && grid[up] && grid[up][over]) topFive = grid[up][over]
    if (topFive) {
      topFive.forEach(record => {
        const average = averages[record.crime] || 0
        record.average = average
      })

       data = topFive.map(entry => {
        return {
          crimeName: entry.crime,
          lowVal: entry.value < entry.average ? entry.value : entry.average,
          highVal: entry.value > entry.average ? entry.value - entry.average : entry.average - entry.value,
          aboveAvg: entry.value > entry.average
        }
      })
    console.log(topFive)
    }
    return (
      <div className="graphCont" >
        {topFive && <Chart2
        topFive={topFive}
        data={data}
         />
        }
        {/* <Victory /> */}
        {/* <Graph topFive={topFive} /> */}
      </div>
    )
  }
}
