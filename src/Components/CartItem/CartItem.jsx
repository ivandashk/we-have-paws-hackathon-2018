import React, { Component } from 'react';
import './CartItem.css';

class CartItem extends Component {
    constructor(props) { 
        super(props); 
        this.observer = props.observer;
    }

    handleClick(e) { 
        this.observer.publish('CARTITEM_SELECTED', this.props.forgeId); 
        }

    render() {
        return (
            <li className='cart-item'>
                <button onClick={this.handleClick}>Сектор: {this.props.sector}, Ряд: {this.props.row}, Место: {this.props.place}</button>
            </li>
        );
    }
}

export default CartItem;