import React, {useEffect, useState} from "react";
import Header from "../Header";
import {SaleTable} from "./SaleTable";
import {getAllSales} from "../../requests/sales/getAllSales";

const Sale = () => {
    const [sales, setSales] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
        const sale = await getSaleByDocument(searchSaleByDocument);
        if (sale) {
            setSales([sale]);
        } else {
            loadSales();
        }
    }

    return (
        <>
            <Header/>
            <form onSubmit={listSaleByDocument}>
                <div className="wrapper">
                    <div className="mail_box">
                        <input className="enter_email_text" type="text" name="searchSaleByDocument"
                               id="searchSaleByDocument" placeholder="Documento del cliente..."
                               value={searchSaleByDocument} onChange={(event) => {setsearchSaleByDocument(event.target.value)
                        }}/>
                        <button className="subscribe_bt_1" type="submit"><p>Buscar</p></button>
                    </div>
                    <div className="create_box">
                        <button className="subscribe_bt_2" onClick={() => setStateModal(true)}><p>Crear producto</p>
                        </button>
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

