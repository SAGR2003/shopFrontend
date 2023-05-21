export const putProductStock = async (code, stock) => {
    const url = `http://localhost:8081/products/${code}/${stock}`;

    const resp = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify({
            code: code,
            stock: stock
        })
    });
    console.log(resp);

}