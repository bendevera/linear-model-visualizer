import React from 'react';
import './App.css';
import Graph from '../Graph/Graph';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';

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
      }
    }
    this.getBestFit = this.getBestFit.bind(this);
    this.setActive = this.setActive.bind(this);
  }

  sum(array) {
    return array.reduce((a, b) => a+b, 0)
  }

  mean(array, ln) {
    return this.sum(array) / ln
  }

  standardDeviation(array, mean, ln) {
    let std = array.map((item) => {
      return Math.pow(item - mean, 2)
    })
    std = this.sum(std)
    return Math.pow(std/(ln-1), .5)
  }

  getBestFit() {
    let ln = this.state.active.length
    if (ln < 2) {
      alert("Can't get best fit of less than two points.")
      return 
    }

    // x calculations
    let x = this.state.active.map((item) => { 
      return item.x 
    })
    // calculates mean of x 
    let mx =  this.mean(x, ln)

    // calculates std of x
    let sx = this.standardDeviation(x, mx, ln)

    // y calculations
    let y = this.state.active.map((item) => {
      return item.y
    })
    // calculates mean of y
    let my = this.mean(y, ln)
    // calculates std of y
    let sy = this.standardDeviation(y, my, ln)

    // r calculations
    let num_r = x.map((item, index) => {
      return item * y[index]
    }).reduce((a, b) => a+b, 0)
    let den_r = x.map((item) => {
      return Math.pow(item, 2)
    }).reduce((a,b) => a+b, 0)
    den_r = den_r + y.map((item) => {
      return Math.pow(item, 2)
    }).reduce((a, b) => a+b, 0)
    let r = num_r / den_r
    
    let b = r * (sy/sx)
    let A = my - (b*mx)
    console.log(b)
    console.log(A)
    let lineData = this.getLineData(b, A)
    console.log(lineData)
    let results = {
      A: A,
      b: b,
      mx: mx,
      my: my,
      sx: sx,
      sy: sy, 
      r: r
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

  setActive(points) {
    this.setState({
      active: points
    })
    console.log(this.state.active)
  }

  render() {
    return (
      <div className="App">
        <Navbar getBestFit={this.getBestFit} />
        <div className="row">
          <Graph passActive={this.setActive} lineData={this.state.lineData} />
          <Sidebar results={this.state.results} />
        </div>
      </div>
    );
  }
}

export default App;
