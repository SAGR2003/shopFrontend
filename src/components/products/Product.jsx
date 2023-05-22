import React from "react";
import {useEffect, useState} from "react"
import {ProductTable} from "./ProductTable";
import {getProducts} from "../../requests/products/getProducts";
import {getProductByCode} from "../../requests/products/getProductByCode";
import CreateProductModal from "./CreateProductModal";
import EditProductModal from "./EditProductModal";
import Header from "../Header";
import {ClimbingBoxLoader} from "react-spinners";

export const Product = () => {
    const [products, setProducts] = useState([]);
    const [searchProductByCode, setSearchProductByCode] = useState("");
    const [stateModal, setStateModal] = useState(false);
    const [stateEditModal, setStateEditModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [editingCode, setEditingCode] = useState("");
    const [editingName, setEditingName] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [unitValue, setUnitValue] = useState("");
    const [stock, setStock] = useState("");

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
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

    const listProductByCode = async (event) => {
        event.preventDefault();
        console.log('Search product by code:', searchProductByCode);
        const product = await getProductByCode(searchProductByCode);
        if (product) {
            setProducts([product]);
        } else {
            loadProducts();
        }
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setEditingCode(product.code);
        setEditingName(product.name);
        setStateEditModal(true);
    };

    return (
        <>
            <Header/>
            <form onSubmit={listProductByCode}>
                <div>
                    <div className="wrapper">
                        <div className="mail_box">
                            <input className="enter_email_text" type="text" name="searchProductByCode"
                                   id="searchProductByCode" placeholder="Código del producto..."
                                   value={searchProductByCode} onChange={(event) => {
                                setSearchProductByCode(event.target.value)
                            }}/>
                            <button className="subscribe_bt_1" type="submit"><p>Buscar</p></button>
                        </div>
                        <div className="create_box">
                            <button className="subscribe_bt_2" onClick={() => setStateModal(true)}><p>Crear producto</p>
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
                                <ProductTable productsList={products} handleEdit={handleEditProduct}/>)}
                        </div>
                    </div>
                </div>
            </div>

            <CreateProductModal
                stateModal={stateModal}
                setStateModal={setStateModal}
                code={code}
                name={name}
                unitValue={unitValue}
                stock={stock}
                setCode={setCode}
                setName={setName}
                setUnitValue={setUnitValue}
                setStock={setStock}
                loadProducts={loadProducts}
            />

            <EditProductModal
                stateModal={stateEditModal}
                setStateModal={setStateEditModal}
                editingProduct={editingProduct}
                code={editingCode}
                name={editingName}
                stock={stock}
                setStock={setStock}
                loadProducts={loadProducts}
            />
        </>
    );
}