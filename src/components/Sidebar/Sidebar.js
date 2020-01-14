import React from 'react';
import './Sidebar.css'


// TO DO:
// - add more detailed breakdown of formulas and use all result values
// - style better 
// - add ability to toggle between results and user input data

class Sidebar extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            active: "0",
            xinput: null,
            yinput: null
        }
        this.setActive = this.setActive.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addPoint = this.addPoint.bind(this);
    }

    setActive(e) {
        console.log(e.target.getAttribute("data"))
        this.setState({
            active: e.target.getAttribute("data")
        })
    }

    handleChange(e) {
        let change = {};
        change[e.target.name] = parseFloat(e.target.value)
        this.setState(change);
    }

    addPoint() {
        if (this.state.xinput !== null & this.state.yinput !== null) {
            if (this.state.xinput < 0) {
                alert("x value can not be less than 0.")
            }
            if (this.state.yinput < 0) {
                alert("y value can not be less than 0.")
            }
            this.props.addData({
                x: this.state.xinput,
                y: this.state.yinput
            })
        } else {
            alert("x and/or y can not be null.")
        }
    }

    render() {
        if (this.state.active === "1") {
            let statsSection;
            let formulaSection;
            if (this.props.results.mx !== null) {
                statsSection = (<div className="sidebar-container">
                    <h6>Stats:</h6>
                    <p className="formula">MX: <span>{this.props.results.mx}</span></p>
                    <p className="formula">MY: <span>{this.props.results.my}</span></p>
                    <p className="formula">sX: <span>{this.props.results.sx}</span></p>
                    <p className="formula">sY: <span>{this.props.results.sy}</span></p>
                    <p className="formula">r: <span>{this.props.results.r}</span></p>
                </div>);
                formulaSection = (<div className="sidebar-container">
                <h6>Formulas:</h6>
                <p className="formula b-text">b = r sY/sX</p>
                <p className="formula b-text">b = {this.props.results.r} * ({this.props.results.sy}/{this.props.results.sx})</p>
                <p className="formula b-text">b: <span>{this.props.results.b}</span></p>
                <p className="formula A-text">A = MY - bMX</p>
                <p className="formula A-text">A = {this.props.results.my} - ({this.props.results.b}*{this.props.results.mx})</p>
                <p className="formula A-text">A: <span>{this.props.results.A}</span></p>
                <p className="formula final-text">Y' = A + bX</p>
                <p className="formula final-text">Y' = {this.props.results.A} + {this.props.results.b}X</p>
            </div>)
            } else {
                statsSection = (<div className="sidebar-container">
            </div>)
                formulaSection = (<div className="sidebar-container">
                <h6>Formulas:</h6>
                <p className="formula b-text">b = r sY/sX</p>
                <p className="formula A-text">A = MY - bMX</p>
                <p className="formula final-text">Y' = A + bX</p>
            </div>)
            }
            return (
                <div className="col-md-4 sidebar-section">
                    <div className="btn-group sidebar-btns" role="group">
                        <button className="btn btn-secondary" onClick={this.setActive} data={0}>Data</button>
                        <button className="btn btn-secondary active" data={1}>Results</button>
                    </div>
                    <h3>Simple Linear Regression Results</h3>
                    <p>
                        The line of best fit of <i>Simple Linear Regression</i> is calculated by finding the
                        y-intercept (<i>A</i>) and slope (<i>b</i>) to use in formula <i>Y' = A + bX</i> where <i>Y'</i> is the predicted 
                        <i>Y</i> value of the linear model at a given <i>X</i> value. 
                    </p>
                    {statsSection}
                    {formulaSection}
                </div>
            )
        } else {
            return (
                <div className="col-md-4 sidebar-section">
                    <div className="row my-2">
                        <div className="col">
                            <div className="btn-group sidebar-btns" role="group">
                                <button className="btn btn-secondary active" data={0}>Data</button>
                                <button className="btn btn-secondary" onClick={this.setActive} data={1}>Results</button>
                            </div>
                        </div>
                        <div className="col">
                            <button className="btn btn-outline-secondary prefill-button my-2" onClick={this.props.fillRandomData} type="button">Add Random Data</button>
                        </div>
                    </div>
                    <h3>Simple Linear Regression Data</h3>
                    <div className="row my-2">
                        <div className="col">
                            <div className="input-group">
                                <input type="number" name="xinput" onChange={this.handleChange} className="form-control bg-dark text-white" placeholder="x value" />
                            </div>
                            <div className="input-group">
                                <input type="number" name="yinput" onChange={this.handleChange} className="form-control bg-dark text-white" placeholder="y value" />
                                <div className="input-group-append">
                                    <button className="btn btn-outline-secondary" onClick={this.addPoint} type="button">Add Point</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <table className="table table-striped">
                        <thead className="thead-dark">
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">x</th>
                            <th scope="col">y</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.pointData.map((item, index) => {
                                return (
                                    <tr key={index} className="text-white">
                                        <th scope="row">{index}</th>
                                        <td>{item.x}</td>
                                        <td>{item.y}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )
        }
    }
}

export default Sidebar;