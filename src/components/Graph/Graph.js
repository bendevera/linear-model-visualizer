import React from 'react';
import { VictoryChart, VictoryScatter, VictoryTheme, VictoryLine } from 'victory';

class Graph extends React.Component {
    constructor(props) {
        super(props)
        this.handleData = this.handleData.bind(this);
    }

    handleData(props) {
        let new_active = this.props.active;
        for (let i=0; i<new_active.length; i++) {
            if (new_active[i].x === props.datum.x & new_active[i].y === props.datum.y) {
                new_active.splice(i, 1)
                break
            }
        }
        this.props.passActive(new_active)
        // return fill === "black" ? { style: { fill: cyan900 } } : { style: { fill: "black" } }
        return null
    }

    render() {
        return (
            <div className="col-md-8 graph-section m-0">
                <VictoryChart
            width={500}
            height={500}
            theme={VictoryTheme.material}
            domain={{ x: [0, this.props.xmax], y: [0, this.props.ymax] }}
            >
                    <VictoryScatter
                        style={{ data: { fill: "#61dafb" } }}
                        size={7}
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