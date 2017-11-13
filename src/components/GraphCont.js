import React from 'react'
import Graph from './Graph'
import grid from '../grid'
import Chart2 from './chart2'
import Victory from './victory'


export default class GraphCont extends React.Component {


  render() {
    const dummy = this.state
    let topFive
    // console.log(this.props, 'state in graph container')
    const up = this.props.up
    const over = this.props.over
    if (up && grid[up] && grid[up][over]) topFive = grid[up][over]
    // console.log(topFive)
    return (
      <div className="graphCont" >
        {topFive && <Chart2 topFive= {topFive} />
        }
        {/* <Victory /> */}
        {/* <Graph topFive={topFive} /> */}
      </div>
   )
  }
}
