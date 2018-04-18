import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
import Cart from './Cart'
import Summary from './Summary';
import DataMap from '../Data/Map.json';
import SelectInput from './SelectInput';
import Viewer from './Viewer';

class App extends Component {
    render() {
        let data = DataMap;
        return (
            <div>
                <NavigationBar />

                <Viewer />

                <h1>Корзина</h1>
                <Cart />

                <h1>Информация</h1>
                <Summary sector="C1" row="1" seat="2" price="500" />
            </div>
        );
    }
}

export default App;