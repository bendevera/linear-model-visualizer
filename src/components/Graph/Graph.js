import React from 'react';
import { VictoryChart, VictoryScatter, VictoryTheme, VictoryLine } from 'victory';

class Graph extends React.Component {
    constructor(props) {
        super(props)
        let data = []
        for (let i=0; i < 6; i++) {
            for (let j=0; j < 6; j++) {
                let curr = {x: i, y: j}
                data.push(curr)
            }
        }
        this.state = {
            data: data,
            active: []
        }
        this.handleData = this.handleData.bind(this);
    }

    handleData(props) {
        const cyan900 = "#61dafb";
        const fill = props.style && props.style.fill;
        let new_active = this.state.active;
        if (fill === "black") {
            let curr = {x: props.datum.x, y: props.datum.y}
            new_active.push(curr)
        } else {
            for (let i=0; i<new_active.length; i++) {
                if (new_active[i].x === props.datum.x & new_active[i].y === props.datum.y) {
                    new_active.splice(i, 1)
                    break
                }
            }
        }
        this.props.passActive(new_active)
        return fill === "black" ? { style: { fill: cyan900 } } : { style: { fill: "black" } }
    }

    render() {
        const cyan900 = "#61dafb";
        return (
            <div className="col-md-9">
                <VictoryChart
            width={500}
            height={500}
            theme={VictoryTheme.material}
            domain={{ x: [0, 5], y: [0, 5] }}
            >
                    <VictoryScatter
                        style={{ data: { fill: "black" } }}
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
                        data={this.state.data}
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