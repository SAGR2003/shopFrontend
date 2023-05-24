import React, {useEffect, useState} from "react";
import Header from "../Header";
import {SaleTable} from "./SaleTable";
import {getAllSales} from "../../requests/sales/getAllSales";
import {getSalesByDocument} from "../../requests/sales/getSalesByDocument";
import {ClimbingBoxLoader} from "react-spinners";
import {MakeSale} from "./MakeSale";
import {Link} from "react-router-dom";
import {undoSale} from "../../requests/sales/undoSale";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRotateLeft} from "@fortawesome/free-solid-svg-icons";
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

    const undoLastSale = async () => {
        try {
            await undoSale();
            await loadSales();
        } catch (error) {
            console.error("Error:", error);
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
                <div>
                    <div className="wrapper_sale">
                        <div className="mail_box_sale">
                            <input className="enter_email_text" type="text" name="searchSaleByDocument"
                                   id="searchSaleByDocument" placeholder="Documento del cliente..."
                                   value={searchSaleByDocument} onChange={(event) => {setSearchSaleByDocument(event.target.value)
                            }}/>
                            <button className="subscribe_bt_1" type="submit"><p>Buscar</p></button>
                        </div>
                        <div className="create_box_sale1">
                            <button className="subscribe_bt_2"><Link to={"/make-sale"}><p>Hacer una venta</p></Link></button>
                        </div>
                        <div className="create_box_sale2" style={{ backgroundColor:'#D7A97B' }}>
                            <button onClick={undoLastSale} className="subscribe_bt_2" style={{ display: 'flex', alignItems: 'center',color:'white' }}>
                                <FontAwesomeIcon icon={faRotateLeft} size="lg"style={{marginLeft:'10px'}}/>
                                <p style={{ fontSize: 20, marginRight:'20px', color:'white' }}>Deshacer</p>
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
                                <SaleTable salesList={sales}/>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sale;

