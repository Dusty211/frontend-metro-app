import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/rootReducer';
import thunk from 'redux-thunk';

const store = createStore(  //Redux store
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk) //Use Thunk
  )
)


ReactDOM.render(
  <Provider store={store}>
    <div id="main-header">
    Simple AF Metro
    </div>
    <div id="sub-header">
    It's simple ...and free ;) - Serving DC-MD-VA - "Wow, this is really simple!" -Some Guy
    </div>
    <App />
    <div id="footer">
    &copy; 2019 Simple AF Metro
    </div>
  </Provider>,
  document.getElementById('root'));

serviceWorker.unregister();
