let logged = localStorage.getItem("loggedIn");
let headerLogged = document.getElementById("changeLink");
let userType = localStorage.getItem("table");
console.log(userType)


//Verifica se o usuria já havia logado antes 
function loggedChecked() {
    if (logged === "true") {
        console.log('logadoooo')
        // headerLogged.innerHTML = `<a href="./login/login.html" class="nav-item nav-link" id="changeLink">Logadao</a>`
        if (userType === "school_manager") {
            console.log('gestor escola user')
            headerLogged.innerHTML = `<a href="../schoolManagerDashboard/schoolManagerDashboard.html" class="nav-item nav-link">Área do Gestor</a>`
        }

        else if (userType === "network_manager") {
            console.log('gestor rede user')
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