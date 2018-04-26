import React, { Component } from 'react';
import './Viewer.css';
import HTTPPromises from './utils/HTTPPromises';
import * as viewerLoader from './utils/ViewerLoader';

class Viewer extends Component {
    constructor(props) {
        super(props);
        this.observer = props.observer;
        this.state = {
            viewer: null,
            isLoading: true,
            seatPicked: false
        };
    }

    componentDidMount() {
        var self = this;
        self.observer.subscribe("VIEWER_LOADED", (data)=>{
            self.setState({
                viewer: data
            });
        });

        self.observer.subscribe("VIEWER_TEXTURES_LOADED", (data) => {
            self.setState({
                isLoading: false
            });
        });

        self.observer.subscribe("CARTITEM_SELECTED", (data)=>{ 
            self.setState({
                seatPicked: true
            })
            viewer.fitToView([data]); 
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
                <div className={this.state.seatPicked ? 'hidden' : 'box'}>
                    <div className={this.state.isLoading ? 'hidden' : 'content'}>
                        <span className="glyphicon glyphicon-arrow-up" aria-hidden="true"></span>
                        <h6>Выберете место для предпросмотра</h6>
                    </div>
                    <div className={this.state.isLoading ? 'content' : 'align-middle hidden'}>
                        <div className="loader"></div>
                        <h6>Загрузка..</h6>
                    </div>
                </div>

                <div id="viewer-div">
                </div>
            </div>
        );
    }
}

export default Viewer;
