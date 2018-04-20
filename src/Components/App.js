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
                {/* <NavigationBar /> 
                TODO: починить*/}
                <Viewer />
                <Cart />
                <Summary sector="C1" row="1" seat="2" price="500" />
            </div>
        );
    }
}

export default App;