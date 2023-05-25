import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {library} from '@fortawesome/fontawesome-svg-core'
import {fab} from '@fortawesome/free-brands-svg-icons'
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import {ShopApp} from "./ShopApp";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Product} from "./components/products/Product";
import Sale from "./components/sales/Sale";
import {MakeSale} from "./components/sales/MakeSale";

library.add(fab, faPenToSquare)

const router = createBrowserRouter([
    {
        path: "/",
        element: <ShopApp/>,
        errorElement: <h1>404</h1>,
    },
    {
        path: "/products",
        element: <Product/>,
        errorElement: <h1>404</h1>,
    },
    {
        path: "/sales",
        element: <Sale/>,
        errorElement: <h1>404</h1>,
    },
    {
        path: "/make-sale",
        element: <MakeSale/>,
        errorElement: <h1>404</h1>,
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);