export const getProductByCode = async (code) => {
    const url = `http://localhost:8081/products/${code}`;
    const resp = await fetch(url);
    const data = await resp.json();

    if (data && data.code) {
        const product = {
            code: data.code,
            name: data.name,
            unitValue: data.unitValue,
            stock: data.stock,
            dateCreated: data.dateCreated,
        };
        return product;
    } else {
        return null;
    }
};

