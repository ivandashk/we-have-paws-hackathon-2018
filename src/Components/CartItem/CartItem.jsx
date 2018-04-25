import React, { Component } from 'react';
import './CartItem.css';

class CartItem extends Component {
    constructor(props) { 
        super(props); 
        this.observer = props.observer;
    }

    render() {
        return (
            <li className='cart-item'>
                <button>Сектор: {this.props.sector}, Ряд: {this.props.row}, Место: {this.props.place}</button>
            </li>
        );
    }
}

export default CartItem;