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
                <div> Сектор {this.props.sector}, Ряд {this.props.row}, Место {this.props.place}</div>
                <div>
                    <button onClick={this.handleClick} className='btn btn-success'>
                        <i className="fas fa-eye"></i>
                        <span>Посмотреть</span>
                    </button>
                    <button className='btn'>
                    -
                    </button>
                </div>
            </li>

        );
    }
}

export default CartItem;
