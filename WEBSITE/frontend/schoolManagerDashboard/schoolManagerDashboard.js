

// Essa função serve para atualizar os dados da escola no banco de dados
var user = null;
var school = null;

function getSessionData() {
    if (localStorage.getItem("loggedIn") === "false" || localStorage.getItem("table") != "school_manager") {
        // alert('Você não tem permissão para ver esta página. Entre como gestor escolar para proceder.');
        Swal.fire({
            icon: 'error',
            title: 'Você não tem permissão para ver esta página',
            text: ' Entre como gestor escolar para proceder'
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

$("#update_data").click(function () {
    let url = "http://127.0.0.1:3001/schoolupdate";
    {
        $.ajax({
            url: url,
            type: 'POST',
            data: {
                cnpj: school['cnpj'],
                type_of_institution: $('#institutionTypeUpdate').val(),
                number_of_employees: $('#update_employees_number').val(),
                number_of_students: $('#update_students_number').val(),
                name: $('#school-name-update').val(),
                school_census_id: $("#school-census-update").val(),
                network_id: $("#networkUpdate").val()
            },
        })
        updateSchoolInfo();
    }
});

function logout() {
    localStorage.setItem("loggedIn", "false");
    localStorage.setItem("primaryKey", null);
    localStorage.setItem("table", null);
    window.location.href = "../login/login.html";
}

function showUpdateBox() {
    updateNetworkDropdown();
    $('#update_employees_number').val(school['number_of_employees']);
    $('#update_students_number').val(school['number_of_students']);
    $('#school-name-update').val(school['name']);
    $("#school-census-update").val(school['school_census_id']);
    $("#networkUpdate").val(school['network_id'])
    $("#institutionTypeUpdate").val(school['type_of_institution'])
}
function getNetworkNameFromId(network_id) {
    let networkName = null;
    $.ajax({
        url: "http://127.0.0.1:3001/networks",
        type: 'GET',
        async: false,
        success: data => {
            data.forEach(network => {
                if (parseInt(network['id']) === parseInt(network_id)) {
                    networkName = network['name'];
                }
            })
        }
    })
    return networkName;
}

function updateSchoolInfo() {
    getSessionData();
    $("#institutionName").text(school['name'])
    $("#network").text(getNetworkNameFromId(school['network_id']))
    if (school['type_of_institution'] === "public") {
        $("#institutionType").text("Pública")
    } else if (school['type_of_institution'] === "private") {
        $("#institutionType").text("Particular")
    }
    $("#cnpj").text(school['cnpj'])
    $("#school-census-id").text(school['school_census_id'])
    $("#student-number").text(school['number_of_students'])
    $("#staff-number").text(school['number_of_employees'])

}

function updateNetworkDropdown() {
    let networks = getNetworks();
    networks.forEach(network => {
        $("#networkUpdate").html(`<option value="${network['id']}">${network['name']}</option>`)
    })
}

function getNetworks() {
    let networks = [];
    $.ajax({
        url: "http://127.0.0.1:3001/networks",
        type: 'GET',
        async: false,
        success: data => {
            data.forEach(network => {
                networks.push(network);
            })
        }
    })
    return networks;
}