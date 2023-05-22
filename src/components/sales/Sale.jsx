import React, {useEffect, useState} from "react";
import Header from "../Header";
import {SaleTable} from "./SaleTable";
import {getAllSales} from "../../requests/sales/getAllSales";
import {getSalesByDocument} from "../../requests/sales/getSalesByDocument";

const Sale = () => {
    const [sales, setSales] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchSaleByDocument, setSearchSaleByDocument] = useState("");

    useEffect(() => {
        loadSales();
    }, []);

    const loadSales = async () => {
        setIsLoading(true);

        try {
            const data = await getAllSales();
            setSales(data);
        } catch (error) {
            console.error("Error al cargar las ventas:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const listSaleByDocument = async (event) => {
        event.preventDefault();
        console.log('Search sale by document:', searchSaleByDocument);
        const response = await getSalesByDocument(searchSaleByDocument);
        if (response.length > 0) {
            const sales = response.map(item => ({
                id: item.id,
                documentClient: item.documentClient,
                totalAmount: item.totalAmount,
                dateCreated: item.dateCreated,
            }));
            setSales(sales);
        } else {
            loadSales();
        }
    };



    return (
        <>
            <Header/>
            <form onSubmit={listSaleByDocument}>
                <div className="wrapper">
                    <div className="mail_box">
                        <input className="enter_email_text" type="text" name="searchSaleByDocument"
                               id="searchSaleByDocument" placeholder="Documento del cliente..."
                               value={searchSaleByDocument} onChange={(event) => {setSearchSaleByDocument(event.target.value)
                        }}/>
                        <button className="subscribe_bt_1" type="submit"><p>Buscar</p></button>
                    </div>
                    <div className="create_box">
                        <button className="subscribe_bt_2"><p>Hacer una venta</p></button>
                    </div>
                </div>
            </form>
            {isLoading ? (
                <div>Cargando...</div>
            ) : (
                <SaleTable salesList={sales}/>
            )}
        </>
    );
};

export default Sale;

