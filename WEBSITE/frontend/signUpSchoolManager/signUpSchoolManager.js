function criarConta() {
    window.location = "../homePage/home.html"
}


let CNPJS = [];
let school_id = [];

// essa função checa se já existe um email cadastrado assim permitindo o cadastro ou indica o login  
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

function get_network_id() {
    $.ajax({
        url: "http://127.0.0.1:3001/networkmanagers",
        type: 'GET',
        async: false,
        success: data => {
            data.forEach(element => {
                school_id.push(element['network_id'])
            });
        }

    });
}

// TESTANDO INTEGRAÇÃO COM BACKEND
// nessa função adicionamos os dados das escolas no banco de dados 
$(document).ready(function () {
    $("#criarConta").click(function () {
        let url = "http://127.0.0.1:3001/schoolinsert";
        get_network_id();
        get_cnpjs();
        console.log("CNPJ: " + CNPJS);
        console.log(school_id);
        if ( (!CNPJS.includes(parseInt($('#CNPJ').val()))) ) {

            $.ajax({
                url: url,
                type: 'POST',
                data: {
                    type_of_institution:$('#type').val(),
                    number_of_employees:$('#employee_number').val(),
                    cnpj: $('#CNPJ').val(),
                    number_of_students:$('#student_number').val(),
                    name: $('#school_name').val(),
                    school_census_id: $('#school_id').val()
                },
            });

        } else {
            console.log("blabla")
            alert("cnpj já cadastrado !");
        }

        if ( (!school_id.includes(parseInt($('#network_id').val()))) ) {

            $.ajax({
                url: url,
                type: 'POST',
                data: {
                    type_of_institution:$('#type').val(),
                    number_of_employees:$('#employee_number').val(),
                    cnpj: $('#CNPJ').val(),
                    number_of_students:$('#student_number').val(),
                    name: $('#school_name').val(),
                    school_census_id: $('#school_id').val(),
                    network_id:$('#network_id').val()
                },
            });

        } else {
            console.log("blabla")
            alert("ID da rede já cadastrado !");
        }
    
    
    });
});
