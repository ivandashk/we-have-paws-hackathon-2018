import React, { Component } from 'react';

class Cart extends Component {
    render() {
        return (
            <div>
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