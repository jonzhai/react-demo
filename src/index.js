import React from 'react';
import ReactDOM from 'react-dom';
import 'lib-flexible';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import reducers from './redux/reducers';

// import './index.css';
import App from './components/App.jsx';
import registerServiceWorker from './registerServiceWorker';
import initReactFastclick from 'react-fastclick';
initReactFastclick();

export const store = createStore(reducers);


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('root'));
registerServiceWorker();
