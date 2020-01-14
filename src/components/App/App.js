import React from 'react';
import './App.css';
import Graph from '../Graph/Graph';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import { getStats, randomData } from '../../util';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: [],
      lineData: [],
      results: {
        A: null,
        b: null,
        mx: null,
        my: null,
        sx: null,
        sy: null, 
        r: null
      },
      xmax: 5,
      ymax: 5,
      numPoints: 10
    }
    this.getBestFit = this.getBestFit.bind(this);
    this.removePoint = this.removePoint.bind(this);
    this.addPoint = this.addPoint.bind(this);
    this.setRandomData = this.setRandomData.bind(this);
    this.handleMaxInputs = this.handleMaxInputs.bind(this);
  }

  getBestFit() {
    let results = getStats(this.state.active)
    let lineData = this.getLineData(results.b, results.A)
    this.setState({
      lineData: lineData,
      results: results
    })
  }

  getLineData(b, A) {
    let data = []
    for (let i=0; i<=this.state.xmax; i++) {
      let curr = {x: i, y: A+(b*i)}
      data.push(curr)
    }
    return data
  }

  removePoint(x, y) {
    let newActive = this.state.active;
    for (let i=0; i<newActive.length; i++) {
        if (newActive[i].x === x & newActive[i].y === y) {
            newActive.splice(i, 1)
            break
        }
    }
    this.setState({
      active: newActive
    })
  }

  addPoint(point) {
    let newActive = this.state.active;
    newActive.push(point)
    this.setState({
      active: newActive
    })
  }

  setRandomData() {
    console.log("SETTING RANDOM DATA")
    let newActive = randomData(this.state.xmax, this.state.ymax, this.state.numPoints);
    this.setState({
      active: newActive,
      lineData: []
    })
  }

  handleMaxInputs(change) {
    this.setState(change);
  }

  render() {
    return (
      <div>

        <Navbar getBestFit={this.getBestFit} />

        <div className="row App">

          <Graph 
            removePoint={this.removePoint} 
            active={this.state.active} 
            lineData={this.state.lineData} 
            xmax={this.state.xmax}
            ymax={this.state.ymax}
            numPoints={this.state.numPoints}
            setMaxInput={this.handleMaxInputs}/>

          <Sidebar 
            results={this.state.results} 
            pointData={this.state.active} 
            addData={this.addPoint}
            fillRandomData={this.setRandomData} />
            
        </div>
      </div>
    );
  }
}

export default App;
