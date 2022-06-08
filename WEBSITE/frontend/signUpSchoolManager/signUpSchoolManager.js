function criarConta() {
    window.location = "../homePage/home.html"
}


let emails = [];

// TESTANDO INTEGRAÇÃO COM BACKEND
// nessa função adicionamos os dados das escolas no banco de dados 
$(document).ready(function () {
    $("#continue").click(function () {
        let url = "http://127.0.0.1:3001/schoolmanagerinsert'";
        get_emails()
        console.log("LISTA: "+ emails)
        console.log("email primario:" + $('#email').val())
        console.log("teste" + cpfs.includes(parseInt(document.getElementById("email").value)))
        if (!cpfs.includes(parseInt($('#email').val()))) {

            $.ajax({
                url: url,
                type: 'POST',
                data: {
                    email: $('#email').val(),
                    name: $('#first-name').val(),
                    school_cnpj: "212321",//$('#school_cnpj').val(),
                    cpf: $('#cpf').val(),
                },
            });

        } else {
            alert("e-mail já cadastrado !");
        }

    });
});

// essa função checa se já existe um email cadastrado assim permitindo o cadastro ou indica o login  
function get_emails() {
    $.ajax({
        url: "http://127.0.0.1:3001/schoolmanagers",
        type: 'GET',
        success: data => {
            data.forEach(element => {

                cpfs.push(element['cpf'])
            });
        }

    });
}