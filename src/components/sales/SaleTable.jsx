export const SaleTable = ({salesList}) => {
    return (
        <>
            <table>
                <thead>
                <tr className="table100-head">
                    <th scope="col">Código</th>
                    <th scope="col">Documento de cliente</th>
                    <th scope="col">Valor total</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Dirección de entrega</th>
                </tr>
                </thead>
                <tbody>
                {salesList.map((sale) => (
                    <tr key={sale.id}>
                        <td>{sale.id}</td>
                        <td>{sale.documentClient}</td>
                        <td>{sale.totalAmount}</td>
                        <td>{sale.dateCreated}</td>
                        <td>{sale.address ? sale.address : "Presencial"}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
};
