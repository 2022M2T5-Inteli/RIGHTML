function criarConta() {
    window.location = "../homePage/home.html"
}


let CNPJS = [];
let school_id = [];

//Essa função coloca o CNPJ na lista
function get_cnpjs() {
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


// Função que checa se todos os campos da escola estão preenchidos 
$(document).ready(function () {
    $("#criarConta").click(function () {
        let url = "http://127.0.0.1:3001/schoolinsert";
        get_network_id();
        get_cnpjs();
        console.log(typeof parseInt($('#network_id').val()))
        console.log(typeof school_id[0]);
        console.log(school_id.includes(parseInt($('#network_id').val())))

        if ($('#type').val() === "" ||
            $('#employee_number').val() === "" ||
            $('#CNPJ').val() === "" ||
            $('#student_number').val() === "" ||
            $('#school_name').val() === "" ||
            $('#school_id').val() === "" ||
            $('#network_id').val() === "") {
            // alert("preencha todos os dados")
            Swal.fire({
                icon: 'error',
                title: 'Preencha todos os dados!',
            })
        }


        else if ((!school_id.includes(parseInt($('#network_id').val()))) || (CNPJS.includes(parseInt($('#CNPJ').val())))) {
            // alert("Preencha os dados corretamente")
            Swal.fire({
                icon: 'error',
                title: 'Preencha os dados corretamente!',
            })
        }

        else {

            {
                //Insere os dados da escola no banco de dados
                $.ajax({
                    url: url,
                    type: 'POST',
                    data: {
                        type_of_institution: $('#type').val(),
                        number_of_employees: $('#employee_number').val(),
                        cnpj: $('#CNPJ').val(),
                        number_of_students: $('#student_number').val(),
                        name: $('#school_name').val(),
                        school_census_id: $('#school_id').val(),
                        network_id: $('#network_id').val()
                    },
                })
            };
            Swal.fire({
                icon: 'success',
                title: 'Conta criada com sucesso',
                showConfirmButton: false,
                timer: 3000
            })
            window.location = '../schoolManagerDashboard/schoolManagerDashboard.html';
        }
    });
});

