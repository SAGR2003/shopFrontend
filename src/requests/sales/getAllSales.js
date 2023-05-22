export const getAllSales = async () => {
    const url = "http://localhost:8081/sales"
    const resp = await fetch(url);
    const data = await resp.json();

    return data.listResponse.map(sale => ({
        id: sale.id,
        documentClient: sale.documentClient,
        totalAmount: sale.totalAmount,
        dateCreated: sale.dateCreated
    }));
}