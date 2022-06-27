// Pega dados atuais de login
let logged = localStorage.getItem("loggedIn");
let headerLogged = document.getElementById("changeLink");
let userType = localStorage.getItem("table");

//Verifica se o usuário está logado e, se sim, 
function loggedChecked() {
    if (logged === "true") {
        if (userType === "school_manager") {
            headerLogged.innerHTML = `<a href="../schoolManagerDashboard/schoolManagerDashboard.html" class="nav-item nav-link">Área do Gestor</a>`
        }

        else if (userType === "network_manager") {
            headerLogged.innerHTML = `<a href="../networkManagerDashboard/networkManagerDashboard.html" class="nav-item nav-link">Área do Gestor</a>`
        }

        else if (userType === "employee") {
            console.log('funcionario')
            headerLogged.innerHTML = `<a href="./adminDashboard.html" class="nav-item nav-link">Área do Administrador </a>`
        }
    }
    else {

        headerLogged.innerHTML = `<a href="./login/login.html" class="nav-item nav-link" id="changeLink">Entrar</a>`
    }
}