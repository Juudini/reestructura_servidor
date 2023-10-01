// Conectar con el servidor de socket.io
const socket = io();

// Manejar la conexión exitosa
socket.on("connect", () => {
    console.log("Connected to server");

    // Obtener el cartId del localStorage
    const existingCartId = JSON.parse(localStorage.getItem("cartId"));

    // Verificar si cartId no existe en el localStorage
    if (existingCartId === null) {
        console.log("No existe cartId en el localStorage.");

        // Emitir un evento para indicar que no existe el cartId
        socket.emit("notExistsCartId");
    }

    // Manejar el evento 'sendCartId'
    socket.on("sendCartId", (newCartId) => {
        // Guardar el nuevo cartId en el localStorage
        localStorage.setItem("cartId", JSON.stringify(newCartId));
    });
});

// Manejar el clic en el botón "Add to Cart"
document.addEventListener("DOMContentLoaded", () => {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");

    addToCartButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const productId = button.getAttribute("data-product-id");

            // Obtener el cartId desde el localStorage
            const cartId = JSON.parse(localStorage.getItem("cartId"));

            // Emitir el evento 'addToCart' con los datos del producto y del carrito
            socket.emit("addToCart", { productId, cartId });
        });
    });
});
