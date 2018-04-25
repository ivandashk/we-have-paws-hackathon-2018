import React, { Component } from 'react';
import './Viewer.css';
import HTTPPromises from './utils/HTTPPromises';
import * as viewerLoader from './utils/ViewerLoader';

class Viewer extends Component { 
    constructor(props) { 
        super(props); 
        this.observer = props.observer;
        this.state = {
            viewer: null
        };
    }

    componentDidMount() {
        var self = this;
        self.observer.subscribe("VIEWER_LOADED",(data)=>{
            self.setState({
                viewer: data
            });
        });

        // TODO
        // Реакция на НавБар
        // Реакция на наведение
        // Реакция на нажатие

        HTTPPromises.getAuthToken().then(function(response){
            viewerLoader.load(response, self.observer);
        });
    }

    render() {
        return (
            <div className="wrapper">
                <div id="viewer-div"></div>
            </div>
        );
    }
}

export default Viewer;