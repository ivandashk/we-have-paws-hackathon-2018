import React, { Component } from 'react';
import './Viewer.css';
import HTTPPromises from './utils/HTTPPromises';
import * as viewerLoader from './utils/ViewerLoader';
import cloneFunction from 'clone-function';

class Viewer extends Component {
    constructor(props) {
        super(props);
        this.observer = props.observer;
        this.setStaticControls = this.setStaticControls.bind(this);
        this.sitOnPlace = this.sitOnPlace.bind(this);
        this.subscribeToObserverEvents = this.subscribeToObserverEvents.bind(this);
        this.onMouseUpHandler = this.onMouseUpHandler.bind(this);
        this.updateDynamicControls = this.updateDynamicControls.bind(this);
        this.state = {
            viewer: null,
            mouseButtonDownHandler: null,
            isLoading: true,
            seatPicked: false
        };
    }

    componentDidMount() {
        var self = this;
        this.subscribeToObserverEvents();

        HTTPPromises.getAuthToken().then(function(response){
            viewerLoader.load(response, self.observer);
        });
    }

    subscribeToObserverEvents(){
        var self = this;
        self.observer.subscribe("VIEWER_LOADED", (data)=>{
            self.setState({
                viewer: data,
                mouseButtonDownHandler: cloneFunction(data.toolController.handleButtonDown)
            });
            this.setStaticControls();
            this.updateDynamicControls();
        });

        self.observer.subscribe("VIEWER_TEXTURES_LOADED", (data) => {
            self.setState({
                isLoading: false
            });
        });

        self.observer.subscribe("CARTITEM_SELECTED", (data)=>{ 
            this.sitOnPlace(data);
        });
    }

    sitOnPlace(data) {
        var self = this;
        if (self.state.isLoading == true) return;

        self.setState({
            seatPicked: true
        })

        let item = self.state.viewer.impl.model.getData().fragments.fragId2dbId.indexOf(parseInt(data));

        if (item == -1) return;

        let fragbBox = new THREE.Box3();
        let nodebBox = new THREE.Box3();

        [item].forEach(function(fragId) {
            self.state.viewer.model.getFragmentList().getWorldBounds(fragId, fragbBox);
            nodebBox.union(fragbBox);
        });

        let bBox = nodebBox;

        let camera = self.state.viewer.getCamera();
        let navTool = new Autodesk.Viewing.Navigation(camera);

        let position = bBox.max;

        let pivPointPosition = JSON.parse(JSON.stringify(position));
        pivPointPosition.z -= 0.1
        navTool.setPivotPoint(pivPointPosition);
        navTool.setPivotSetFlag(true);
        self.state.viewer.setUsePivotAlways(true);
        navTool.setVerticalFov(70, true);

        let target = new THREE.Vector3(0, 0, -30);
        let up = new THREE.Vector3(0, 0, 1);

        navTool.setView(position, target);
        navTool.setWorldUpVector(up, true);
    }

    onMouseUpHandler(){
        this.updateDynamicControls();
    }

    setStaticControls() {
        this.state.viewer.toolController.handleWheelInput = function(){};
        this.state.viewer.toolController.handleSingleClick = function(){};
        this.state.viewer.toolController.handleDoubleClick = function(){};
    }

    updateDynamicControls(){
        var self = this;
        this.state.viewer.toolController.handleButtonDown = function(e){
            if (e.button === 0){
                self.state.viewer.toolController.handleButtonDown = self.state.mouseButtonDownHandler;
                self.state.viewer.toolController.mousedown(e);
            }
        };
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

                <div id="viewer-div" onMouseUp={this.onMouseUpHandler}>
                </div>
            </div>
        );
    }
}

export default Viewer;
