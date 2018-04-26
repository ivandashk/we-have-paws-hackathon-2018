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
            let target = new THREE.Vector3(0, 0, -30);
            let up = new THREE.Vector3(0, 0, 1);

            navTool.setView(position, target);
            navTool.setWorldUpVector(up, true);


        });

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
