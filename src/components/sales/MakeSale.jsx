import React from "react";
import {useEffect, useState} from "react"
import {getProducts} from "../../requests/products/getProducts";
import Header from "../Header";
import {SaleProducts} from "./SaleProducts";
import {ClimbingBoxLoader} from "react-spinners";
import AddToCartModal from "./AddToCartModal";
import CartModal from "./CartModal";
import {getProductByCode} from "../../requests/products/getProductByCode";

export const MakeSale = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [stateModalCart, setStateModalCart] = useState(false);
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [stock, setStock] = useState("");
    const [searchProductByCode, setSearchProductByCode] = useState("");
    const [stateModal, setStateModal] = useState(false);

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
        const existingProduct = selectedProducts.find((item) => item.code === product.code);

        if (existingProduct) {
            const updatedQuantity = parseInt(existingProduct.quantity) + parseInt(product.quantity);
            const updatedProduct = {
                ...existingProduct,
                quantity: Math.min(updatedQuantity, product.stock),
            };

            setSelectedProducts((prevProducts) =>
                prevProducts.map((item) => (item.code === product.code ? updatedProduct : item))
            );
        } else {
            setSelectedProducts((prevProducts) => [...prevProducts, product]);
        }
    };

    const handleQuantityChange = (code, quantity) => {
        setSelectedProducts((prevProducts) =>
            prevProducts.map((item) => (item.code === code ? {...item, quantity} : item))
        );
    };

    const handleRemoveItem = (code) => {
        setSelectedProducts((prevProducts) => prevProducts.filter((item) => item.code !== code));
    };

    const listProductByCode = async (event) => {
        event.preventDefault();
        console.log('Search product by code:', searchProductByCode);
        const product = await getProductByCode(searchProductByCode);
        if (product) {
            setProducts([product]);
        } else {
            loadAllProducts();
        }
    };

    return (
        <>
            <Header/>
            <form onSubmit={listProductByCode}>

                <div>
                    <div className="wrapper">
                        <div className='carrito'>Agrega items a tu carrito de compras</div>
                        <div className="mail_box">
                            <input className="enter_email_text" type="text" name="searchProductByCode"
                                   id="searchProductByCode" placeholder="Código del producto..."
                                   value={searchProductByCode} onChange={(event) => {
                                setSearchProductByCode(event.target.value)
                            }}/>
                            <button className="subscribe_bt_1" type="submit"><p>Buscar</p></button>
                        </div>
                        <div className="create_box">
                            <button onClick={()=> setStateModal(true)} className="subscribe_bt_2"><p>Ver Carrito</p>
                            </button>
                        </div>
                    </div>
                </div>
                <br></br>
            </form>
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
                                    handleCartItem={handleCartItem}
                                    cart={selectedProducts}/>
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
            <CartModal
                stateModal={stateModal}
                setStateModal={setStateModal}
                cartItems={selectedProducts}
                handleQuantityChange={handleQuantityChange}
                handleRemoveItem={handleRemoveItem}
            />
        </>
    );
}