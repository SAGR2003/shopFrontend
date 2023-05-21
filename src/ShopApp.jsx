import { useEffect, useState } from "react"
import { ProductTable } from "./components/ProductTable";
import {getProducts} from "./requests/getProducts";
import {getProductByCode} from "./requests/getProductByCode";
import CreateProductModal from "./components/CreateProductModal";
import EditProductModal from "./components/EditProductModal";


export const ShopApp = () => {
    const [products, setProducts] = useState([]);
    const [searchProductByCode, setSearchProductByCode] = useState("");
    const [stateModal, setStateModal] = useState(false);
    const [stateEditModal, setStateEditModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [editingCode, setEditingCode] = useState("");
    const [editingName, setEditingName] = useState("");

    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [unitValue, setUnitValue] = useState("");
    const [stock, setStock] = useState("");

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        const data = await getProducts();
        setProducts(data);
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
            <form onSubmit={listProductByCode}>
                <div>
                    <div className="wrapper">
                        <div className="mail_box">
                            <input className="enter_email_text" type="text" name="searchProductByCode" id="searchProductByCode" placeholder="Código del producto..." value={searchProductByCode} onChange={(event) =>  {setSearchProductByCode(event.target.value)}} />
                            <button className="subscribe_bt_1" type="submit"><p>Buscar</p></button>
                        </div>
                        <div className="create_box">
                        <button className="subscribe_bt_2" onClick={() => setStateModal(true)}><p>Crear producto</p></button>
                        </div>
                    </div>
                </div>
                <br></br>
            </form>
            <div className="limiter">
                <div className="container-table100">
                    <div className="wrap-table100">
                        <div className="table100">
                            <ProductTable productsList={products} handleEdit={handleEditProduct}/>
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
    )
}