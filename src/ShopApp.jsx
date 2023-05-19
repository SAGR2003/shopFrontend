import { useEffect, useState } from "react"
import { ProductTable } from "./components/ProductTable";
import {getProducts} from "./requests/getProducts";
import {getProductByCode} from "./requests/getProductByCode";
export const ShopApp = () => {
    const [products, setProducts] = useState([]);
    const [searchProductByCode, setSearchProductByCode] = useState("");

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
        if (searchProductByCode.length === 1) {
            const product = await getProductByCode(searchProductByCode);
            if (product) {
                setProducts([product]);
            } else {
                setProducts([]);
            }
        } else {
            loadProducts();
        }
    };

    return (
        <>
            <form onSubmit={listProductByCode}>
                <div>
                    <label htmlFor="search" className="labelSearchByCode">Search by code: </label>
                    <input type="text" name="searchProductByCode" id="searchProductByCode" placeholder="product code" value={searchProductByCode} onChange={(event) =>  {setSearchProductByCode(event.target.value)}} />
                    <button type="submit">Go!!!</button>
                </div>
                <br></br>
            </form>
            <ProductTable productsList={products}/>
        </>
    )
}