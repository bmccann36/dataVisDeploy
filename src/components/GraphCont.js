import React from 'react'
import Graph from './Graph'
import grid from '../grid'

export default class GraphCont extends React.Component {


  render() {
    const dummy = this.state
    let topFive
    // console.log(this.props, 'state in graph container')
    const up = this.props.up
    const over = this.props.over
    if (up && grid[up] && grid[up][over]) topFive = grid[up][over]

    return (
      <div className="graphCont" >
        <Graph topFive={topFive} />
      </div>
    )
  }
}
