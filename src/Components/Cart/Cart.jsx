import React, { Component } from 'react';
import './Cart.css';
import CartItem from '../CartItem';

var TICKETS = [
    {
        sector: 6,
        row: 9,
        place: 15,
        forgeId: 0
    }, {
        sector: 1,
        row: 15,
        place: 2,
        forgeId: 1
    }, {
        sector: 19,
        row: 1,
        place: 7,
        forgeId: 2
    }, {
        sector: 25,
        row: 28,
        place: 10,
        forgeId: 3
    }
];

class Cart extends Component {
    constructor(props) { 
        super(props); 
        this.observer = props.observer;
        this.state = {
            tickets: TICKETS
        };
    }

    render() {
        var self = this;
        return (
            <div className='cart-container'>
                <div className='cart-header'>Корзина</div>
                <ul>
                {
                    this.state.tickets.map(function(el) {
                         return <CartItem
                            key={el.forgeId.toString()}
                            sector={el.sector}
                            row={el.row}
                            place={el.place}
                            forgeId={el.forgeId}
                            observer={self.observer}
                         />;
                    })
                 }
                </ul>
            </div>
        );
    }
}

export default Cart;