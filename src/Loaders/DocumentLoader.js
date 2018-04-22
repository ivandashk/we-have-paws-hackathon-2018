import * as observer from './../utils/Observer';

const urn = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bW9kZWwyMDE4LTA0LTA2LTE5LTI3LTEyLWQ0MWQ4Y2Q5OGYwMGIyMDRlOTgwMDk5OGVjZjg0MjdlL2xhX21hcm1pdGVfXzEuc2tw';
var viewerApp;

function load(token) {
    var options = {
        env: 'AutodeskProduction',
        accessToken: token.access_token
    };

    Autodesk.Viewing.Initializer(options, function onInitialized() {
        viewerApp = new Autodesk.Viewing.ViewingApplication('viewer-div');
        viewerApp.registerViewer(viewerApp.k3D, Autodesk.Viewing.Viewer3D);
        viewerApp.loadDocument(urn, onDocumentLoadSuccess, onDocumentLoadFailure);
    });
}

function onDocumentLoadSuccess(doc) {
    observer.trigger(observer.DOCUMENT_LOADED_EVENT, viewerApp);
}

function onDocumentLoadFailure(viewerErrorCode) {
    throw ('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
}

export {load}