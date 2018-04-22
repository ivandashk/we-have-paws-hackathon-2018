var viewer;
var currentViewable;

function set(newViewer) {
    viewer = newViewer;
}

function getSelection() {
    return viewer.getSelection();
}

function getToolbar() {
    return viewer.getToolbar(false);
}

function select(elementIds, selectionMode) {
    return viewer.select(elementIds, selectionMode);
}

function fitToView(elementIds) {
    return viewer.fitToView(elementIds);
}

function addEventListener(event, callback) {
    return viewer.addEventListener(event, callback);
}

function getInstanceTree() {
    return viewer.model.getData().instanceTree;
}

function setGhosting(value) {
    return viewer.setGhosting(value);
}

function hideElement(element) {
    return viewer.hide(element);
}

function paintElement(element, color) {
    return viewer.setThemingColor(element, 
        new THREE.Vector4(color.r, color.g, color.b, color.intensity));
}

function getProperties(element, onPropertiesGotSuccess, onPropertiesGotFail) {
    return viewer.getProperties(element, onPropertiesGotSuccess, onPropertiesGotFail);
}

export {
    addEventListener,
    fitToView,
    getInstanceTree,
    getProperties,
    getSelection,
    hideElement,
    getToolbar,
    paintElement,
    select,
    set,
    setGhosting
};