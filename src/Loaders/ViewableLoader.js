import HTTPPromises from './../utils/HTTPPromises';
import * as observer from './../utils/Observer';

const initialViewableIndex = 0;

var loadingData;
var viewerApp;

function load(viewerAppParam) {
    viewerApp = viewerAppParam;
    loadingData = viewerApp.bubble.search({'type':'geometry'});
    if (loadingData.length === 0) {
        throw 'Document contains no viewables';
    }
    viewerApp.selectItem(loadingData[initialViewableIndex].data, onViewableLoadSuccess, onViewableLoadFail);
}

function onViewableLoadSuccess(viewer, viewable) {
    observer.trigger(observer.VIEWABLE_LOADED_EVENT, viewer);
}

function onViewableLoadFail(errorCode) {
    throw ('onItemLoadFail() - errorCode:' + errorCode);
}

export {load}