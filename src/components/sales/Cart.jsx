export const Cart = ({ cartItems }) => {
    return (
        <div>
            <h2>Carrito de compras</h2>
            <ul>
                {cartItems.map((item) => (
                    <li key={item.code}>
                        Código: {item.code}, Nombre: {item.name}, Cantidad: {item.quantity}
                    </li>
                ))}
            </ul>
        </div>
    );
};
