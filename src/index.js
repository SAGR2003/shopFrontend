import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {ShopApp} from './ShopApp';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faPenToSquare)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ShopApp/>
    </React.StrictMode>
);