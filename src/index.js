import ReactDOM from 'react-dom';
import React, { Component } from 'react';

import NavigationBar from './Components/NavigationBar';
import Cart from './Components/Cart'
import Summary from './Components/Summary';
import SelectInput from './Components/SelectInput';
import Viewer from './Components/Viewer';

import ReactObserver from 'react-event-observer';
import * as dataTools from './data/dataTools'

class App extends Component {
    constructor(props) {
        super(props);
        this.observer = ReactObserver();

        this.onItemHovered = this.onItemHovered.bind(this);
        this.onItemSelected = this.onItemSelected.bind(this);

        this.state = {
            hoveredSeat: {
                sector: 1,
                row: 1,
                seat: 1
            }
        }

    }

    onItemHovered(item) {
        let forgeID = item.dbId;

        let res = dataTools.GetCoordinatesByForgeId(forgeID);
        if (!res) return;

        this.setState({
            hoveredSeat: {
                sector: res[0],
                row: res[1],
                seat: res[2]
            }
        })
    }

    onItemSelected(item) {
        {/* TODO: Добавить обработчик событий */}
    }

    render() {
        return (
            <div>
                <NavigationBar />
                <Viewer onItemHovered={this.onItemHovered} onItemSelected={this.onItemSelected} observer={this.observer} />
                <Cart observer={this.observer} />
                <Summary 
                    sector={this.state.hoveredSeat.sector} 
                    row={this.state.hoveredSeat.row} 
                    seat={this.state.hoveredSeat.seat} 
                    price="500" 
                />
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);