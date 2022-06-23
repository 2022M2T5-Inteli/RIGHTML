function criarConta() {
    window.location = "../homePage/home.html"
}


let CNPJS = [];
let school_id = [];

//Essa função coloca o CNPJ na lista
function get_cnpjs() {
    let CNPJS = [];
    $.ajax({
        url: "http://127.0.0.1:3001/schools",
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
        url: "http://127.0.0.1:3001/networks",
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
        if(cnpj === parseInt($("#CNPJ").val())) {
            isUnique = false;
            return
        }
    })
    return isUnique;
}

// Função que checa se todos os campos da escola estão preenchidos 
$(document).ready(function () {
    $("#criarConta").click(function () {
        let url = "http://127.0.0.1:3001/schoolinsert";
       // get_network_id();
        // console.log(typeof parseInt($('#network_id').val()))
        // console.log(typeof school_id[0]);
        // console.log(school_id.includes(parseInt($('#network_id').val())))

        if ($('#type').val() === "" ||
            $('#employee_number').val() === "" ||
            $('#CNPJ').val() === "" ||
            $('#student_number').val() === "" ||
            $('#school_name').val() === "" ||
            $('#school_id').val() === "" )
            //$('#network_id').val() === "")
            {
            // alert("preencha todos os dados")
            Swal.fire({
                icon: 'error',
                title: 'Preencha todos os dados!',
            })
        }


        else if(cnpjIsUnique()) {
            console.log("value" + document.querySelector('input[name="opcao"]:checked').value)
            Swal.fire({
                icon: 'success',
                title: 'Conta criada com sucesso',
                showConfirmButton: false,
                timer: 6000
            })
            {
                //Insere os dados da escola no banco de dados
                $.ajax({
                    url: url,
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
            };
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

