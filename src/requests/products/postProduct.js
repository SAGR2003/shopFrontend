
export const postProduct = async(product) => {

    try {
        const url = "http://localhost:8081/products"
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });

        if (response.ok) {
            const responseData = await response.json();
            return responseData;
        } else {
            console.error("Error al crear el producto:", response.status);
            throw new Error("Error al crear el producto");
        }
    } catch (error) {
        console.error("Error al crear el producto:", error);
        throw error;
    }
}