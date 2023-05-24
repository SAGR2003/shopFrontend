export const undoSale = async () => {
    try {
        const response = await fetch("http://localhost:8081/sales/undo", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            return await response.json();
        } else {
            console.error("Error al deshacer la venta:", response.status);
            throw new Error("Error al deshacer la venta");
        }
    } catch (error) {
        console.error("Error al deshacer la venta:", error);
        throw error;
    }
};
