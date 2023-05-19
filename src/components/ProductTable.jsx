export const ProductTable = ({productsList}) => {
    return (
        <>
            <table className="table table-striped">
                <thead className="table-info">
                <tr>
                    <th scope="col">Product Code</th>
                    <th scope="col">Name</th>
                    <th scope="col">Unit Value</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Date Created</th>
                </tr>
                </thead>
                <tbody>{
                    productsList.map((product) => <tr key={product.code}>
                        <td>{product.code}</td>
                        <td>{product.name}</td>
                        <td>{product.unitValue}</td>
                        <td>{product.stock}</td>
                        <td>{product.dateCreated}</td>
                    </tr>)
                }
                </tbody>
            </table>
        </>
    )
}