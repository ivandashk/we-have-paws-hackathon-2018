import React from 'react';
import ReactDOM from 'react-dom';
import style from './styles/style.css';

import HTTPPromises from './utils/HTTPPromises';
import * as observer from './utils/Observer';
import App from './Components/App'
import * as documentLoader from './Loaders/DocumentLoader';
import * as viewableLoader from './Loaders/ViewableLoader';
import * as viewer from './Viewer';

var createDOM = () => {
    ReactDOM.render(
        <App />,
        document.getElementById('root')
    );
}

var startLoadingApp = () => {
    HTTPPromises.getAuthToken().then(function(response){
        documentLoader.load(response);
    });
}

var assignEventHandlers = () => {
    observer.listen(observer.DOCUMENT_LOADED_EVENT, function(viewerApp) {
        viewableLoader.load(viewerApp); 
    })
    
    observer.listen(observer.VIEWABLE_LOADED_EVENT, function(resultingViewer) {
        viewer.set(resultingViewer);
    })
}

createDOM();
startLoadingApp();
assignEventHandlers();