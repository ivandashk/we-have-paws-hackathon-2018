import React, { Component } from 'react';
import './Cart.css';

class Cart extends Component {
    constructor(props) { 
        super(props); 
        this.observer = props.observer;
    }

    render() {
        return (
            <div className='cart-container'>
                <div className='cart-header'>Корзина</div>
                <ul>
                    <li>
                        <span>A1, Ряд 6, Место 9, 1500 р.</span>
                        <button>Удалить</button>
                    </li>
                    <li>
                        <span>A1, Ряд 6, Место 10, 1500 р.</span>
                        <button>Удалить</button>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Cart;