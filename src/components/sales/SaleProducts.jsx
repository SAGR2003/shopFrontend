import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartPlus} from "@fortawesome/free-solid-svg-icons";
export const SaleProducts = ({productsList, setStateModalCart, handleCartItem, cart}) => {

    return (
        <>
            <table>
                <thead>
                <tr className="table100-head">
                    <th scope="col">Código</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Valor Unitario</th>
                    <th scope="col">Cantidad disponible</th>
                    <th scope="col">Agregar</th>
                </tr>
                </thead>
                <tbody>{
                    productsList.map((product) => <tr key={product.code}>
                        <td>{product.code}</td>
                        <td>{product.name}</td>
                        <td>{product.unitValue}</td>
                        <td>{product.stock}</td>
                        <td>
                            <button id="agregar" onClick={() => handleCartItem(product)}>
                                <FontAwesomeIcon icon={faCartPlus} size="lg" style={{color: "#1A5840",}} />
                            </button>
                        </td>
                    </tr>)
                }
                </tbody>
            </table>
        </>
    )
}