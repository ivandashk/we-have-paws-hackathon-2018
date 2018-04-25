const urn = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bW9kZWwyMDE4LTA0LTA2LTE5LTI3LTEyLWQ0MWQ4Y2Q5OGYwMGIyMDRlOTgwMDk5OGVjZjg0MjdlL2xhX21hcm1pdGVfXzEuc2tw';
const initialViewableIndex = 0;

var viewerApp;
var viewerObserver

function load(token, observer) {
    viewerObserver = observer;
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
    let loadingData = viewerApp.bubble.search({'type':'geometry'});
    if (loadingData.length === 0) {
        throw 'Document contains no viewables';
    }
    viewerApp.selectItem(loadingData[initialViewableIndex].data, onViewableLoadSuccess, onViewableLoadFail);
}

function onDocumentLoadFailure(viewerErrorCode) {
    throw ('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
}

function onViewableLoadSuccess(viewer, viewable) {
    viewerObserver.publish('VIEWER_LOADED', viewer);
}

function onViewableLoadFail(errorCode) {
    throw ('onItemLoadFail() - errorCode:' + errorCode);
}

export {load}