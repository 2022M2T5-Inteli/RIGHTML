function login() {
    var loginInput = parseInt(document.getElementById('cpf').value);
    var userType = document.querySelector('input[type=radio][name=userType]:checked').value;
    if (userType === "schoolManager") {
        if(checkSchoolManager(loginInput)) {
            localStorage.setItem("primaryKey", loginInput);
            localStorage.setItem("table", "school_manager");
            window.location.href = "../schoolManagerDashboard/schoolManagerDashboard.html";
        } else {
            alert("Este CPF não está cadastrado como gestor escolar.")
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
                if(schoolManager['cpf'] === loginInput) {
                    user = schoolManager;
                }
            })
        }
    })
    return user;
}