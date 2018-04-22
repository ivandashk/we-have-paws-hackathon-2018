import React, { Component } from 'react';
// import './Viewer.css';

export default class Viewer extends Component {
    constructor(props) {
        super(props);

        let documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bW9kZWwyMDE4LTA0LTA2LTE5LTI3LTEyLWQ0MWQ4Y2Q5OGYwMGIyMDRlOTgwMDk5OGVjZjg0MjdlL2xhX21hcm1pdGVfXzEuc2tw';

        var self = this;

        this.state = {
            viewer: undefined
        }

        $.ajax({
            url: "https://lementtest2.lement.pro:443/authentication/v1/authenticate",
            method: "POST",
            crossOrigin: true,      
            data: `client_id=7CMZFMmL22BaEhZSp0Uel052iL5aussd` + 
                `&client_secret=RnRA7ThEt0DGPAsK` + 
                `&grant_type=client_credentials` + 
                `&scope=viewables:read%20data:read`
        }).done(function(response){
            let token = response;

            var options = {
                env: 'AutodeskProduction',
                accessToken: token.access_token
            };

            Autodesk.Viewing.Initializer(options, function onInitialized(){
                Autodesk.Viewing.Document.load(documentId, self.onDocumentLoadSuccess, self.onDocumentLoadFailure);
            });
        })

        this.onDocumentLoadSuccess = this.onDocumentLoadSuccess.bind(this);
        this.onLoadModelSuccess = this.onLoadModelSuccess.bind(this);

    }

    onDocumentLoadSuccess(doc) {
        var viewables = Autodesk.Viewing.Document.getSubItemsWithProperties(doc.getRootItem(), {'type':'geometry'}, true);
        if (viewables.length === 0) {
            console.error('Document contains no viewables.');
            return;
        }
    
        var viewerDiv = document.getElementById('viewer-div');

        this.setState({
            viewer: new Autodesk.Viewing.Private.GuiViewer3D(viewerDiv)
        });

        var errorCode = this.state.viewer.start();
    
        if (errorCode) {
            console.error('viewer.start() error - errorCode:' + errorCode);
            return;
        }
    
        this.loadModel(doc, viewables);
        //addToolbar(viewer);
    }

    onDocumentLoadFailure(viewerErrorCode) {
        console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
    }
    
    onLoadModelSuccess(model) {
        console.log('onLoadModelSuccess()!');
        console.log('Validate model loaded: ' + (this.state.viewer.model === model));
        console.log(model);

        this.state.viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, this.onItemSelected);

        //setDefaultCamera();
    }
    
    onLoadModelError(viewerErrorCode) {
        console.error('onLoadModelError() - errorCode:' + viewerErrorCode);
    }
    
    loadModel(doc, viewables) {
        let initialViewable = viewables[0];
        let svfUrl = doc.getViewablePath(initialViewable);
        let modelOptions = {
            sharedPropertyDbPath: doc.getPropertyDbPath()
        };
        this.state.viewer.loadModel(svfUrl, modelOptions, this.onLoadModelSuccess, this.onLoadModelError);
    }

    onItemSelected(item) {
        console.log(item)
    }

    render() {
        return (
            <div id="viewer-div">
            
            </div>
        );
    }
}