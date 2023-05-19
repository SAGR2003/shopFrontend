import { useEffect, useState } from "react"
import { ProductTable } from "./components/ProductTable";
import {getProducts} from "./requests/getProducts";

export const ShopApp = () => {
    const [products, setProducts] = useState([]);

    const loadProducts = async () => {
        const data = await getProducts();
        setProducts(data);
    }

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <>
            <ProductTable productsList={products}/>
        </>
    )
}