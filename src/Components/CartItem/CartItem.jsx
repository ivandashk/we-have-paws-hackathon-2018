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
            <li align="center" align="center" className='cart-item'>
                <div> Сектор: {this.props.sector}, Ряд: {this.props.row}, Место: {this.props.place}</div>
                <div><button align="center" class='btn btn-block'> Предпросмотр </button></div>
            </li>

        );
    }
}

export default CartItem;
