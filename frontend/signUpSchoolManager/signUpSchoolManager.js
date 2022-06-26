let CNPJS = [];
let school_id = [];

//Essa função coloca o CNPJ na lista
function get_cnpjs() {
    let CNPJS = [];
    $.ajax({
        url: "http://127.0.0.1:1234/schools",
        type: 'GET',
        async: false,
        success: data => {
            data.forEach(element => {
                CNPJS.push(element['cnpj'])
            });
        }
    });
    return CNPJS;
}

//Essa função vê o ID da rede 
function get_network_id() {
    $.ajax({
        url: "http://127.0.0.1:1234/networks",
        type: 'GET',
        async: false,
        success: data => {
            data.forEach(element => {

                school_id.push(element['id'])
            });
        }

    });
}

function cnpjIsUnique() {
    let isUnique = true;
    let cnpjs = get_cnpjs()
    cnpjs.forEach(cnpj => {
        if (cnpj === parseInt($("#CNPJ").val())) {
            isUnique = false;
            return
        }
    })
    return isUnique;
}

// Função que checa se todos os campos da escola estão preenchidos 
$(document).ready(function () {
    $("#criarConta").click(function () {
        if ($('#type').val() === "" ||
            $('#employee_number').val() === "" ||
            $('#CNPJ').val() === "" ||
            $('#student_number').val() === "" ||
            $('#school_name').val() === "" ||
            $('#school_id').val() === "") {
            Swal.fire({
                icon: 'error',
                title: 'Preencha todos os dados!',
            })
        }
        else if (cnpjIsUnique()) {
            //Insere os dados da escola no banco de dados
            $.ajax({
                url: "http://127.0.0.1:1234/schoolinsert",
                type: 'POST',
                data: {
                    type_of_institution: document.querySelector('input[name="opcao"]:checked').value,
                    number_of_employees: $('#employee_number').val(),
                    cnpj: $('#CNPJ').val(),
                    number_of_students: $('#student_number').val(),
                    name: $('#school_name').val(),
                    school_census_id: $('#school_id').val(),
                    network_id: $('#networks').val()
                },
            })
            $.ajax({
                url: "http://127.0.0.1:1234/schoolmanagerinsert",
                type: 'POST',
                data: {
                    name: localStorage.getItem("name"),
                    cpf: localStorage.getItem("cpf"),
                    email: localStorage.getItem("email"),
                    school_cnpj: $('#CNPJ').val()
                },
            })
            Swal.fire({
                icon: 'success',
                title: 'Conta criada com sucesso',

            })
            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("table", "school_manager");
            localStorage.setItem("primaryKey", localStorage.getItem("cpf"))
            localStorage.setItem("cpf", null);
            localStorage.setItem("name", null);
            localStorage.setItem("email", null);
            window.location = '../schoolManagerDashboard/schoolManagerDashboard.html';
        }
        else {
            return Swal.fire({
                icon: 'error',
                title: 'CNPJ já cadastrado!',
            })
        }
    });
});

function updateNetworkDropdown() {
    document.getElementById("networks").innerHTML += "";
    networks = getNetworks()
    networks.forEach(network => {
        document.getElementById("networks").innerHTML += `
        <option value="${network['id']}">${network['name']}</option>`
    })
}
//esolhe qual a rede da escola
function getNetworks() {
    let networks = [];
    $.ajax({
        url: "http://127.0.0.1:1234/networks",
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

