var doc;
var url = window.location.href;
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

// Get auth token
$.ajax({
    url: AUTH_URL,
    method: "POST",
    crossOrigin: true,      
    data:{ 
        client_id: CLIENT_ID, 
        client_secret: CLIENT_SECRET,
        grant_type:"client_credentials",
        scope:"viewables:read"              
    }
})      
.done(function(response) {      
    var token = response.access_token;
    var options = {
        env: 'AutodeskProduction',
        accessToken: response.access_token
    };

    Autodesk.Viewing.Initializer(options, function onInitialized(){
        Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
    });          
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
	addToolbar(viewer);
}

function onDocumentLoadFailure(viewerErrorCode) {
    console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
}

function onLoadModelSuccess(model) {
    console.log('onLoadModelSuccess()!');
    console.log('Validate model loaded: ' + (viewer.model === model));
    console.log(model);
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

//////////////////////////////////////////////////////////////////////
//                          CUSTOM FUNCTIONS
//////////////////////////////////////////////////////////////////////

function addToolbar(viewer) {
    var subToolbar = new Autodesk.Viewing.UI.ControlGroup('custom-toolbar');
    addGetSelectionBtn(subToolbar, viewer);
    viewer.getToolbar(false).addControl(subToolbar);
}

function addGetSelectionBtn(subToolbar, viewer) {
    var btn = new Autodesk.Viewing.UI.Button('custom-button');
    btn.addClass('custom-button');
    btn.setIcon("adsk-icon-box"); 
    btn.setToolTip('Get selection id');
    btn.onClick = function(e) {
        alert(viewer.getSelection());
    };

    subToolbar.addControl(btn);
}

// Example function
function paintAllElementsRed (viewer) {
    var instanceTree = viewer.model.getData().instanceTree;
    if (instanceTree === undefined) {
        console.log("ERROR: Unable to paint elements. Not all elements have been loaded yet");
        return;
    }

    var rootId = instanceTree.getRootId();
    if (!rootId) {
        console.log("ERROR: There are no elements to paint in this model");
        return;
    }

    var alldbIds = [];
    var queue = [];
    queue.push(rootId);
    while (queue.length > 0) {
        var node = queue.shift();
        alldbIds.push(node);
        instanceTree.enumNodeChildren(node, function(childrenIds) {
            queue.push(childrenIds);
        });
    }

    alldbIds.forEach(function(element, index, array){
        viewer.setThemingColor(element, new THREE.Vector4(1, 0, 0, 1));
    })
}
