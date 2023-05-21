export const ProductTable = ({productsList, handleEdit }) => {
    return (
        <>
            <table>
                <thead>
                <tr className="table100-head">
                    <th scope="col">Code</th>
                    <th scope="col">Name</th>
                    <th scope="col">Unit Value</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Date Created</th>
                    <th scope="col">Actions</th>
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
                            <button onClick={() => handleEdit(product)}>Add stock</button>
                        </td>
                    </tr>)
                }
                </tbody>
            </table>
        </>
    )
}