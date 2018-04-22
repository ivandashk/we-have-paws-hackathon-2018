import React, { Component } from 'react';
import NavigationBar from './NavigationBar';
import Cart from './Cart'
import Summary from './Summary';
import DataMap from '../Data/Map.json';
import SelectInput from './SelectInput';
import Viewer from './ViewerDiv';

class App extends Component {
    render() {
        let data = DataMap;
        return (
            <div>
                <h1>Навигация</h1>
                <NavigationBar />

                <h1>Корзина</h1>
                <Cart />
                <Summary sector="C1" row="1" seat="2" price="500" />

                <Viewer />
            </div>
        );
    }
}

export default App;