import React from 'react';
import { VictoryChart, VictoryScatter, VictoryTheme, VictoryLine } from 'victory';

class Graph extends React.Component {
    constructor(props) {
        super(props)
        this.handleData = this.handleData.bind(this);
        this.handleMaxInputs = this.handleMaxInputs.bind(this);
    }

    handleData(props) {
        this.props.removePoint(props.datum.x, props.datum.y)
    }

    handleMaxInputs(e) {
        let change = {}
        change[e.target.name] = e.target.value
        this.props.setMaxInput(change)
    }

    render() {
        return (
            <div className="col-md-8 graph-section">
                <div className="row px-3 my-0 py-0">
                    <div className="col-4">
                        <label for="x-max-input" className="float-left text-white">x max</label>
                        <input name="xmax" onChange={this.handleMaxInputs} id="x-max-input" type="number" className="form-control bg-dark text-white max-input" placeholder={this.props.xmax} />
                    </div>
                    <div className="col-4">
                        <label for="y-max-input" className="float-left text-white">y max</label>
                        <input name="ymax" onChange={this.handleMaxInputs} id="y-max-input" type="number" className="form-control bg-dark text-white max-input" placeholder={this.props.ymax} />
                    </div>
                    <div className="col-4">
                        <label for="num-points-input" className="float-left text-white"># random points</label>
                        <input name="numPoints" onChange={this.handleMaxInputs} id="num-points-input" type="number" className="form-control bg-dark text-white max-input" placeholder={this.props.numPoints} />
                    </div>
                    <p className="px-3 py-1 text-white">Tip: click on points to remove them from the dataset.</p>
                </div>
                <VictoryChart
            width={500}
            height={500}
            theme={VictoryTheme.material}
            domain={{ x: [0, this.props.xmax], y: [0, this.props.ymax] }}
            domainPadding={{x: [0, 0], y: [0, 0]}}
            // padding={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
                    <VictoryScatter
                        style={{ data: { fill: "#61dafb" } }}
                        size={4}
                        events={[{
                            target: "data",
                            eventHandlers: {
                            onClick: () => {
                                return [
                                {
                                    target: "data",
                                    mutation: this.handleData
                                }
                                ];
                            }
                            }
                        }]}
                        data={this.props.active}
                    />
                    <VictoryLine
                        style={{
                            data: { stroke : "#c43a31" }
                        }}
                        data={this.props.lineData} />
                </VictoryChart>
            </div>
        )
    }
}

export default Graph;