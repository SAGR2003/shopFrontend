export const putProductStock = async (code, stock) => {

    try {
        const url = `http://localhost:8081/products/${code}/${stock}`

        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify({
                code: code,
                stock: stock
            })
        });

        if (response.ok) {
            const responseData = await response.json();
            return responseData;
        } else {
            console.error("Error al agregar stock:", response.status);
            throw new Error("Error al agregar stock");
        }
    } catch (error) {
        console.error("Error al agregar stock:", error);
        throw error;
    }

};
