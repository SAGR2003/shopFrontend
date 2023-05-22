export const getProductByCode = async (code) => {
    const url = `http://localhost:8081/products/${code}`;
    const resp = await fetch(url);
    const data = await resp.json();

    if (data && data.code) {
        return {
            code: data.code,
            name: data.name,
            unitValue: data.unitValue,
            stock: data.stock,
            dateCreated: data.dateCreated,
        };
    } else {
        return null;
    }
};

