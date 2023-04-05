import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import Routers from './routes';
import store from './store';

const container = document.getElementById('app');
const root = ReactDOMClient.createRoot(container);

root.render(
    <Provider store={store}>

        <BrowserRouter>
            <Routers/>
        </BrowserRouter>

    </Provider>
);
