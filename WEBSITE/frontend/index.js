let logged = localStorage.getItem("loggedIn");
let headerLogged = document.getElementById("changeLink");
let userType = localStorage.getItem("table");
console.log(userType)

function loggedChecked() {
    if (logged === "true") {
        console.log('logadoooo')
        // headerLogged.innerHTML = `<a href="./login/login.html" class="nav-item nav-link" id="changeLink">Logadao</a>`
        if (userType === "school_manager") {
            console.log('gestor escola useeer')
            headerLogged.innerHTML = `<a href="./schoolManagerDashboard/schoolManagerDashboard" class="nav-item nav-link" id="changeLink">Área do Gestor de Escola</a>`
        }

        else if (userType === "network_manager") {
            console.log('gestor rede useeer')
            headerLogged.innerHTML = `<a href="./login/login.html" class="nav-item nav-link" id="changeLink">Área do Gestor de Rede</a>`
        }

        else if (userType === "employee") {
            console.log('funcionariou')
            headerLogged.innerHTML = `<a href="./login/login.html" class="nav-item nav-link" id="changeLink">Área do Funcionário </a>`
        }
    }
    else {

        headerLogged.innerHTML = `<a href="./login/login.html" class="nav-item nav-link" id="changeLink">Entrar</a>`
    }
}