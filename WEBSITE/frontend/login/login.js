
//Compara se os dados do login estão no banco de dados e libera o acesso
function login() {
    var loginInput = parseInt(document.getElementById('cpf').value);
    var userType = document.querySelector('input[type=radio][name=userType]:checked').value;
    //Compara o input da tela de login caso escolha o botão gestor de escola
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
                title: 'Este CPF não está cadastrado como gestor escolar',
            })

        }
        //Compara o input da tela de login caso escolha o botão gestor de rede 
    } else if (userType === "networkManager") {
        if (checkNetworkManager(loginInput)) {
            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("primaryKey", loginInput);
            localStorage.setItem("table", "network_manager");
            window.location.href = "../networkManagerDashboard/networkManagerDashboard.html";
        } else {
            // alert("Este CPF não está cadastrado como gestor de rede.")
            Swal.fire({
                icon: 'error',
                title: 'Este CPF não está cadastrado como gestor de rede',
            })

        }
        //Compara o input da tela de login caso escolha o botão funcionário Falconi
    } else if (userType === "falconi") {
        console.log("inside")
        if (checkFalconiEmployee(loginInput)) {
            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("primaryKey", loginInput);
            localStorage.setItem("table", "employee");
            window.location.href = "../adminDashboard/adminDashboard.html";
        } else {
            // alert("Este CPF não está cadastrado como funcionário Falconi.")
            Swal.fire({
                icon: 'error',
                title: 'Este CPF não está cadastrado como administrador Falconi',
            })

        }
    }
    console.log(loginInput + " " + userType)
}

//Checa no banco de dados se o cpf existe ou não
function checkSchoolManager(loginInput) {
    let user = null;
    $.ajax({
        url: "http://127.0.0.1:1234/schoolmanagers",
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

//Checa no banco de dados se o cpf existe ou não
function checkNetworkManager(loginInput) {
    let user = null;
    $.ajax({
        url: "http://127.0.0.1:1234/networkmanagers",
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

//Checa no banco de dados se o cpf existe ou não
function checkFalconiEmployee(loginInput) {
    console.log("login input: " + loginInput)
    let user = null;
    $.ajax({
        url: "http://127.0.0.1:1234/employees",
        type: 'GET',
        async: false,
        success: data => {
            data.forEach(falconiEmployee => {
                console.log(falconiEmployee)
                if (parseInt(falconiEmployee['cpf']) === parseInt(loginInput)) {
                    user = falconiEmployee;
                }
            })
        }
    })
    return user;
}