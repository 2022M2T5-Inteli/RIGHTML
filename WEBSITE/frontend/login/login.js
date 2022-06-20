function login() {
    var loginInput = parseInt(document.getElementById('cpf').value);
    var userType = document.querySelector('input[type=radio][name=userType]:checked').value;
    if (userType === "schoolManager") {
        if (checkSchoolManager(loginInput)) {
            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("primaryKey", loginInput);
            localStorage.setItem("table", "school_manager");
            window.location.href = "../schoolManagerDashboard/schoolManagerDashboard.html";
        } else {
            // alert("Este CPF não está cadastrado como gestor escolar.")
            Swal.fire({
                icon: 'error',
                title: 'Este CPF não está cadastrado como gestor escolar.',
            })

        }
    } else if (userType === "networkManager") {
        if (checkNetworkManager(loginInput)) {
            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("primaryKey", loginInput);
            localStorage.setItem("table", "network_manager");
        } else {
            // alert("Este CPF não está cadastrado como gestor de rede.")
            Swal.fire({
                icon: 'error',
                title: 'Este CPF não está cadastrado como gestor de rede.',
            })

        }
    } else if (userType === "falconi") {
        if (checkFalconiEmployee(loginInput)) {
            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("primaryKey", loginInput);
            localStorage.setItem("table", "employee");
            window.location.href = "../adminDashboard/adminDashboard.html";
        } else {
            // alert("Este CPF não está cadastrado como funcionário Falconi.")
            Swal.fire({
                icon: 'error',
                title: 'Este CPF não está cadastrado como funcionário Falconi.',
            })

        }
    }
    console.log(loginInput + " " + userType)
}

function checkSchoolManager(loginInput) {
    let user = null;
    $.ajax({
        url: "http://127.0.0.1:3001/schoolmanagers",
        type: 'GET',
        async: false,
        success: data => {
            data.forEach(schoolManager => {
                if (schoolManager['cpf'] === loginInput) {
                    user = schoolManager;
                }
            })
        }
    })
    return user;
}

function checkNetworkManager(loginInput) {
    let user = null;
    $.ajax({
        url: "http://127.0.0.1:3001/networkmanagers",
        type: 'GET',
        async: false,
        success: data => {
            data.forEach(networkManager => {
                if (networkManager['cpf'] === loginInput) {
                    user = networkManager;
                }
            })
        }
    })
    return user;
}

function checkFalconiEmployee(loginInput) {
    let user = null;
    $.ajax({
        url: "http://127.0.0.1:3001/employees",
        type: 'GET',
        async: false,
        success: data => {
            data.forEach(falconiEmployee => {
                if (falconiEmployee['cpf'] === loginInput) {
                    user = falconiEmployee;
                }
            })
        }
    })
    return user;
}