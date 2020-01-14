import React from 'react';
import './App.css';
import Graph from '../Graph/Graph';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import {get_r, mean, standardDeviation, roundToThree, randomData} from '../../util';


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
      ymax: 5
    }
    this.getBestFit = this.getBestFit.bind(this);
    this.removePoint = this.removePoint.bind(this);
    this.addPoint = this.addPoint.bind(this);
    this.setRandomData = this.setRandomData.bind(this);
  }

  getBestFit() {
    let ln = this.state.active.length
    if (ln < 2) {
      alert("Can't get best fit of less than two points.")
      return 
    }

    // array of all x values
    let x = this.state.active.map((item) => { 
      return item.x 
    })
    // calculates mean of x 
    let mx =  mean(x, ln)
    // calculates std of x
    let sx = standardDeviation(x, mx, ln)
    // array of all y values
    let y = this.state.active.map((item) => {
      return item.y
    })
    // calculates mean of y
    let my = mean(y, ln)
    // calculates std of y
    let sy = standardDeviation(y, my, ln)
    // r calculations
    let r = get_r(x, y)
    
    let b = r * (sy/sx)
    let A = my - (b*mx)
    let lineData = this.getLineData(b, A)
    let results = {
      A: roundToThree(A),
      b: roundToThree(b),
      mx: roundToThree(mx),
      my: roundToThree(my),
      sx: roundToThree(sx),
      sy: roundToThree(sy), 
      r: roundToThree(r)
    }
    this.setState({
      lineData: lineData,
      results: results
    })
  }

  getLineData(b, A) {
    let data = []
    for (let i=0; i<6; i++) {
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
    console.log("removed point, new active:")
    console.log(this.state.active)
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
    let newActive = randomData(5, 10);
    console.log(newActive)
    this.setState({
      active: newActive,
      lineData: []
    })
  }

  render() {
    return (
      <div className="App">

        <Navbar getBestFit={this.getBestFit} />

        <div className="row">

          <Graph 
            removePoint={this.removePoint} 
            active={this.state.active} 
            lineData={this.state.lineData} 
            xmax={this.state.xmax}
            ymax={this.state.ymax}/>

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
