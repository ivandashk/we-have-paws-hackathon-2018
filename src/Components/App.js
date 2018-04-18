import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
import Cart from './Cart'
import Summary from './Summary';
import DataMap from '../Data/Map.json';
import SelectInput from './SelectInput';

class App extends Component {
    render() {
        let data = DataMap;
        return (
            <div>
                <h1>{}</h1> NAV_H1
                <NavigationBar />

                <h1>Корзина</h1>
                <Cart />

                <h1>Информация</h1>
                <Summary sector="C1" row="1" seat="2" price="500" />

                <div id="viewer" />
            </div>
        );
    }
}

export default App;