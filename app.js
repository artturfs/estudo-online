// Seleciona os formulários
const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");

// Função de Cadastro
if (signupForm) {
    signupForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const email = document.getElementById("signup-email").value;
        const password = document.getElementById("signup-password").value;

        // Verifica se o email já existe no Local Storage
        const existingEmail = localStorage.getItem("userEmail");

        if (existingEmail === email) {
            alert("Esse email já está cadastrado. Por favor, use outro email.");
        } else {
            // Armazena o email e senha no Local Storage
            localStorage.setItem("userEmail", email);
            localStorage.setItem("userPassword", password);

            alert("Cadastro realizado com sucesso!");
            signupForm.reset();
            window.location.href = "singup.html"; // Redireciona para a página de login
        }
    });
}

// Função de Login
if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        // Verifica os dados do Local Storage
        const storedEmail = localStorage.getItem("userEmail");
        const storedPassword = localStorage.getItem("userPassword");

        if (email === storedEmail && password === storedPassword) {
            alert("Login bem-sucedido!");
            window.location.href = "index.html"; // Redireciona para a página principal
        } else {
            alert("Email ou senha incorretos.");
        }
    });
}
