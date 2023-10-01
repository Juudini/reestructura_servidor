const loginForm = document.getElementById("loginForm");

console.log("Login on");
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;

    const password = document.getElementById("loginPassword").value;

    const loginData = {
        email,
        password,
    };
    console.log("form Data", loginData);

    try {
        const res = await fetch("/api/sessions/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
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
