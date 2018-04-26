import React, { Component } from 'react';
import './CartItem.css';

class CartItem extends Component {
    constructor(props) {
        super(props);
        this.observer = props.observer;
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) { 
        this.observer.publish('CARTITEM_SELECTED', this.props.forgeId); 
    }

    render() {
        return (
            <li className='cart-item'>
                <div className="info"> Сектор {this.props.sector}, Ряд {this.props.row}, Место {this.props.place}</div>
                <div><button onClick={this.handleClick} className='btn btn-light btn-block'> Предпросмотр </button></div>
            </li>

        );
    }
}

export default CartItem;
