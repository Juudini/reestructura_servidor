const socket = io();

socket.on("connection", () => {
    console.log("Connection started");
});
socket.on("newProduct", async (data) => {
    console.log("Nuevo producto agregado:", data);

    const productsContainer = document.getElementById("realTimeProducts");

    const newProductDiv = document.createElement("div");
    newProductDiv.setAttribute("data-product-id", data._id);
    newProductDiv.classList.add("product");

    const productInfoDiv = document.createElement("div");
    productInfoDiv.classList.add("product-info", "data");

    productInfoDiv.innerHTML = `
        <h2>${data.title}</h2>
        <p>ID: ${data._id}</p>
        <p>Description: ${data.description}</p>
        <p>Code: ${data.code}</p>
        <p>Price: ${data.price}</p>
        ${
            data.status
                ? "<p>Status: Available</p>"
                : "<p>Status: Not Available</p>"
        }
        <p>Stock: ${data.stock}</p>
        <p>Category: ${data.category}</p>
    `;

    newProductDiv.appendChild(productInfoDiv);
    const productThumbnailDiv = document.createElement("div");
    productThumbnailDiv.classList.add("product-thumbnail");

    data.thumbnail.forEach((thumbnail) => {
        const imgElement = document.createElement("img");
        imgElement.src = thumbnail;
        imgElement.alt = data.title;
        imgElement.width = "200";
        productThumbnailDiv.appendChild(imgElement);
    });

    newProductDiv.appendChild(productThumbnailDiv);

    productsContainer.appendChild(newProductDiv);
});

socket.on("deletedProduct", (id) => {
    const productsContainer = document.getElementById("realTimeProducts");
    const productToRemove = productsContainer.querySelector(
        `div[data-product-id="${id}"]`
    );

    if (productToRemove) {
        productToRemove.remove();
        console.log("Producto eliminado del HTML");
    } else {
        console.log("Producto no encontrado en el HTML");
    }
});
