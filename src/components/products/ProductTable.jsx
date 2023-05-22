import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

export const ProductTable = ({productsList, handleEdit}) => {
    return (
        <>
            <table>
                <thead>
                <tr className="table100-head">
                    <th scope="col">Código</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Valor Unitario</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Fecha de creación</th>
                    <th scope="col">Acciones</th>
                </tr>
                </thead>
                <tbody>{
                    productsList.map((product) => <tr key={product.code}>
                        <td>{product.code}</td>
                        <td>{product.name}</td>
                        <td>{product.unitValue}</td>
                        <td>{product.stock}</td>
                        <td>{product.dateCreated}</td>
                        <td>
                            <button id='editar' onClick={() => handleEdit(product)}>
                                <FontAwesomeIcon icon="fa-solid fa-pen-to-square" size="lg" color="#1A5840"/>
                            </button>
                        </td>
                    </tr>)
                }
                </tbody>
            </table>
        </>
    )
}
