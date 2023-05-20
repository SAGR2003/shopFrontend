export const postProduct = async(product) => {
    const url = "http://localhost:8081/products"
    const resp = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });
    const data = await resp.json();
    console.log(product);
}