import React from "react";
import "./Navbar.css"

class Navbar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-dark m-0 col-12">
                <div className="col-6">
                    <a className="nav-link dropdown-toggle text-white float-left" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Linear Regression Visualizer
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a className="dropdown-item" href="#">Linear Regression Visualizer</a>
                        <a className="dropdown-item" href="#">More coming soon...</a>
                    </div>
                </div>
                <div className="col-6">
                    <button className="btn btn-outline-success my-2 my-sm-0 float-right" onClick={this.props.getBestFit}>Get Best Fit</button>
                </div>
            </nav>
        )
    }
}

export default Navbar;