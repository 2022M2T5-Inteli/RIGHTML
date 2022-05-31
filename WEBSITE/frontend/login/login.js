function login() {
    var loginInput = document.getElementById('loginInput')

    if (loginInput.textContent == "admin@falconi.com") {
        window.location.replace("../adminDashboard/adminDashboard.html");
    }

    else if (loginInput.textContent == "gestor@gmail.com") {
        window.location.replace("../schoolManagerDashboard/schoolManagerDashboard.html");
    }
}