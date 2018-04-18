import React, { Component } from 'react';

class Summary extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li>Сектор: {this.props.sector}</li>
                    <li>Ряд: {this.props.row}</li>
                    <li>Место: {this.props.seat}</li>
                    <li>Цена: {this.props.price}</li>
                </ul>
            </div>
        );
    }
}

export default Summary;