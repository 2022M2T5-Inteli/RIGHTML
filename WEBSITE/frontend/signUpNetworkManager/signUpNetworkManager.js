function criarConta() {
    window.location = "../homePage/home.html"
}

$(document).ready(function () {
    $("").click(function () {
        let url = "http://127.0.0.1:3001/schoolmanagerinsert";
        let xhttp = new XMLHttpRequest();
        if (has_duplicates($('#cpf').val()) === false) {
            xhttp.open("POST", url, false);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send("email=elisaflemer@&name=" + $('#first-name').val() + "&school_cnpj=" + $('#school_cnpj') + "&cpf=" + $('#cpf').val());//A execução do script pára aqui até a requisição retornar do servidor
        } else {
            alert("CPF já cadastrado")
        }

    });
});

function inputNetworkManagersData() {
    $(document).ready(function() {
        $("#buttonCreateAccount").click(function () {
            let url = "http://127.0.0.1:3001/networkmanagerinsert";
            console.log("works")
            {
                $.ajax({ //basicamente tem a mesma função do postman
                    url: url,
                    type: 'POST',
                    data: {
                        cpf: $('#CNPJ_key').val(),
                        email: $('#update_employees_number').val(),
                        name: $('#update_students_number').val(),
                        network_id: $('#update_students_number').val(),
                    },
                })
            }});
        });
}

