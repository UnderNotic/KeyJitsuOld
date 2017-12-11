import React from 'react';
import ReactDOM from 'react-dom';
import Main from 'containers/Main';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from 'react-redux';
import configureStore from './configureStore';

ReactDOM.render( 
    <Provider store={configureStore()}>
        < Main/> 
    </Provider>
    ,document.getElementById('root'));
registerServiceWorker();