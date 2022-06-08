function criarConta() {
    window.location = "../homePage/home.html"
}

<<<<<<< HEAD

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
=======
$(document).ready(function () {
    $("#criarConta").click(function () {
        let url = "http://127.0.0.1:3001/schoolinsert";
        let xhttp = new XMLHttpRequest();
       
            xhttp.open("POST", url, false);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send("cnpj=" + $('#CNPJ').val() + "&number_of_students=" + $('#numeroAlunos').val() + "&name=Fulano dE tAl " + $('#cpf').val());//A execução do script pára aqui até a requisição retornar do servidor


    });
});
>>>>>>> e4afb9006e4464347f96af9966305a861982b6e5
