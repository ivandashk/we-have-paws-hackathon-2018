var doc;
var viewer;
var lmvDoc;
var viewables;
var indexViewable;
var viewerStatePersist;
var HOST  = "https://lementtest2.lement.pro:443"; 
var AUTH_URL = HOST + '/authentication/v1/authenticate';                
var CLIENT_ID = '7CMZFMmL22BaEhZSp0Uel052iL5aussd';
var CLIENT_SECRET = 'RnRA7ThEt0DGPAsK';
var documentId = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6bW9kZWwyMDE4LTA0LTA2LTE5LTI3LTEyLWQ0MWQ4Y2Q5OGYwMGIyMDRlOTgwMDk5OGVjZjg0MjdlL2xhX21hcm1pdGVfXzEuc2tw';
var token;
var modelTree;

$.ajax({
    url: AUTH_URL,
    method: "POST",
    crossOrigin: true,      
    data: `client_id=${CLIENT_ID}` + 
        `&client_secret=${CLIENT_SECRET}` + 
        `&grant_type=client_credentials` + 
         `&scope=viewables:read%20data:read`
})      

.done(function(response) {      
    token = response;
    var options = {
        env: 'AutodeskProduction',
        accessToken: token.access_token
    };

    Autodesk.Viewing.Initializer(options, function onInitialized(){
        Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
    });
    
    getInstanseTree();
});

function onDocumentLoadSuccess(doc) {
    viewables = Autodesk.Viewing.Document.getSubItemsWithProperties(doc.getRootItem(), {'type':'geometry'}, true);
    if (viewables.length === 0) {
        console.error('Document contains no viewables.');
        return;
    }

    var viewerDiv = document.getElementById('viewer');
    viewer = new Autodesk.Viewing.Private.GuiViewer3D(viewerDiv);
    var errorCode = viewer.start();

    if (errorCode) {
        console.error('viewer.start() error - errorCode:' + errorCode);
        return;
    }
    

    indexViewable = 0;
    lmvDoc = doc;

    loadModel();
    //addToolbar(viewer);
    
    viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, onItemSelected);
}


function onDocumentLoadFailure(viewerErrorCode) {
    console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
}

function onLoadModelSuccess(model) {
    console.log('onLoadModelSuccess()!');
    console.log('Validate model loaded: ' + (viewer.model === model));
    console.log(model);

    setDefaultCamera();
}

function onLoadModelError(viewerErrorCode) {
    console.error('onLoadModelError() - errorCode:' + viewerErrorCode);
}

function loadModel() {
    var initialViewable = viewables[indexViewable];
    var svfUrl = lmvDoc.getViewablePath(initialViewable);
    var modelOptions = {
        sharedPropertyDbPath: lmvDoc.getPropertyDbPath()
    };
    viewer.loadModel(svfUrl, modelOptions, onLoadModelSuccess, onLoadModelError);
}

