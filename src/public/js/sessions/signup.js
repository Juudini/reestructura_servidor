const registerForm = document.getElementById("registerForm");

console.log("Register on");
registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("registerName").value;
    const lastName = document.getElementById("registerLastName").value;
    const email = document.getElementById("registerEmail").value;
    const age = document.getElementById("registerAge").value;
    const password = document.getElementById("registerPassword").value;

    const registerData = {
        name,
        lastName,
        email,
        age,
        password,
    };
    console.log("FORM Data REGISTER.JS", registerData);

    try {
        const res = await fetch("/api/sessions/signup/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(registerData),
        });

        if (!res.ok) {
            throw new Error("La solicitud no fue exitosa");
        }

        const data = await res.json();
        console.log("register data FETCH RESPONSE", data);
        if (data && data.success) {
            window.location.href = data.redirect;
            return;
        }
    } catch (error) {
        console.error("Error:", error);
    }
});
