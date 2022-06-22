

// Essa função serve para atualizar os dados da escola no banco de dados
var user = null;
var school = null;

function getSessionData() {
    if (localStorage.getItem("loggedIn") === "false" || localStorage.getItem("table") != "school_manager") {
        // alert('Você não tem permissão para ver esta página. Entre como gestor escolar para proceder.');
        Swal.fire({
            icon: 'error',
            title: 'Você não tem permissão para ver esta página',
            text: 'Entre como gestor de rede para proceder',
        })
        window.location = "../index.html";
    }
    let primaryKey = localStorage.getItem("primaryKey");
    $.ajax({
        url: "http://127.0.0.1:3001/schoolmanagers",
        type: 'GET',
        async: false,
        success: data => {
            data.forEach(school_manager => {
                if (parseInt(primaryKey) === parseInt(school_manager['cpf'])) {
                    user = school_manager;
                }
            })
        }
    })
    $.ajax({
        url: "http://127.0.0.1:3001/schools",
        type: 'GET',
        async: false,
        success: data => {
            data.forEach(currentSchool => {
                if (parseInt(user['school_cnpj']) === parseInt(currentSchool['cnpj'])) {
                    school = currentSchool;
                }
            })
        }
    })
}

function logout() {
    localStorage.setItem("loggedIn", "false");
    localStorage.setItem("primaryKey", null);
    localStorage.setItem("table", null);
    window.location.href = "../login/login.html";
}

