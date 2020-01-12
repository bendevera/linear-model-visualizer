import React from 'react';
import './Sidebar.css'


// TO DO:
// - add more detailed breakdown of formulas and use all result values
// - style better 
// - add ability to toggle between results and user input data

class Sidebar extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <div className="col-md-3 sidebar-section">
                <h3>Simple Linear Regression Results</h3>
                <p>MX: <span>{this.props.results.mx}</span></p>
                <p>MY: <span>{this.props.results.my}</span></p>
                <p>Std X: <span>{this.props.results.sx}</span></p>
                <p>Std Y: <span>{this.props.results.sy}</span></p>
                <p>r: <span>{this.props.results.r}</span></p>
                <p>A: <span>{this.props.results.A}</span></p>
                <p>b: <span>{this.props.results.b}</span></p>
                <p>
                    The line of best fit of <i>Simple Linear Regression</i> is calculated by finding the
                    y-intercept (A) and slope (b) to use in formula Y' = A + bX where Y' is the predicted 
                    Y value of the linear model at a given X value. 
                </p>
            </div>
        )
    }
}

export default Sidebar;