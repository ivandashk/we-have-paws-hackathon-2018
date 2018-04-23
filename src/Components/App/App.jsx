import React, { Component } from 'react';
import NavigationBar from './../NavigationBar';
import Cart from './../Cart'
import Summary from './../Summary';
import DataMap from '../../Data/Map.json';
import SelectInput from './../SelectInput';
import Viewer from './../Viewer';
import './App.css';
import ReactObserver from 'react-event-observer';

class App extends Component {
    constructor(props){
        super(props);
        this.observer = ReactObserver();
    }

    render() {
        return (
            <div>
                <NavigationBar />
                <Viewer observer={this.observer} />
                <Cart />
                <Summary sector="C1" row="1" seat="2" price="500" />
            </div>
        );
    }
}

export default App;