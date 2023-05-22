export const getProducts = async () => {
    const url = "http://localhost:8081/products"
    const resp = await fetch(url);
    const data = await resp.json();

    return data.listResponse.map(product => ({
        code: product.code,
        name: product.name,
        unitValue: product.unitValue,
        stock: product.stock,
        dateCreated: product.dateCreated
    }));
}