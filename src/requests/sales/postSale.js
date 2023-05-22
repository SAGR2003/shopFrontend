export const postSale = async (documentClient, cartItems) => {
    const saleData = cartItems.map((item) => ({
        productCode: item.code,
        quantity: item.quantity
    }));

    try {
        const response = await fetch(`http://localhost:8081/sales/${documentClient}/sell`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(saleData)
        });

        if (response.ok) {
            const responseData = await response.json();
            return responseData;
        } else {
            console.error("Error al realizar la venta:", response.status);
            throw new Error("Error al realizar la venta");
        }
    } catch (error) {
        console.error("Error al realizar la venta:", error);
        throw error;
    }
};

