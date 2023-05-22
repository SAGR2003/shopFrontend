import React from "react";
import {useEffect, useState} from "react"
import {getProducts} from "../../requests/products/getProducts";
import Header from "../Header";
import {SaleProducts} from "./SaleProducts";
import {ClimbingBoxLoader} from "react-spinners";
import AddToCartModal from "./AddToCartModal";
import {Cart} from "./Cart";

export const MakeSale = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [stateModalCart, setStateModalCart] = useState(false);
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [stock, setStock] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        loadAllProducts();
    }, []);

    const loadAllProducts = async () => {
        setIsLoading(true);

        try {
            const data = await getProducts();
            setProducts(data);
        } catch (error) {
            console.error("Error al cargar los productos:", error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleCartItem = (product) => {
        setCode(product.code);
        setName(product.name);
        setStock(product.stock);
        setStateModalCart(true);
    }

    const addToCart = (product) => {
        const newProduct = {...product, quantity: quantity};
        setSelectedProducts((prevProducts) => [...prevProducts, newProduct]);
    };


    return (
        <>
            <Header/>
            <div className="limiter">
                <div className="container-table100">
                    <div className="wrap-table100">
                        <div className="table100">
                            {isLoading ? (
                                <div className='loading'>
                                    <ClimbingBoxLoader color="#1A5840" size={50}/>
                                </div>
                            ) : (
                                <SaleProducts
                                    productsList={products}
                                    setStateModalCart={setStateModalCart}
                                    handleCartItem={handleCartItem} cart={cart}/>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <AddToCartModal
                stateModalCart={stateModalCart}
                setStateModalCart={setStateModalCart}
                handleAddToCart={addToCart}
                code={code}
                name={name}
                stock={stock}
            />

            <Cart cartItems={selectedProducts}/>
        </>
    );
}