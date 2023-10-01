const socket = io();
const $inputMessage = document.querySelector("#message");
const $listMessages = document.querySelector("#listMessages");
const $btnSend = document.querySelector("#btnSend");

(async () => {
    const { value: user } = await Swal.fire({
        title: "Welcome to the chat",
        input: "text",
        inputLabel: "Enter your username",
        inputPlaceholder: "Enter your name",
        confirmButtonText: "Enter",
        allowOutsideClick: false,
        allowEscapeKey: false,
        stopKeydownPropagation: false,
    });

    if (user) {
        socket.emit("newUser", user);
    }
})();

const sendMessage = (e) => {
    e.preventDefault();
    const message = $inputMessage.value.trim();

    if (!message) return;

    socket.emit("message", message);
    $inputMessage.value = "";
};

$btnSend.addEventListener("click", sendMessage);

socket.on("messageEmit", (data) => {
    const message = data;

    $listMessages.innerHTML = "";

    message.forEach((element) => {
        const messageElement = document.createElement("p");
        messageElement.textContent = `${element.user}: ${element.message}`;
        $listMessages.appendChild(messageElement);
    });

    // Ajustar el scroll hacia abajo
    $listMessages.scrollTop = $listMessages.scrollHeight;
});
