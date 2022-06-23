
//te encaminha para a proxima pagina de cadastro
function next() {
    let options = document.querySelector('input[name="option"]:checked').value
    if (options == "schoolManager") {
        window.location = "../signUpSchoolManager/signUpSchoolManager.html"
    }
    else if (options == "networkManager") {
        window.location = "../signUpNetworkManager/signUpNetworkManager.html"
    }
    else {
        // window.alert("Selecione uma das opções")
        Swal.fire({
            icon: 'error',
            title: 'Selecione uma das opções',
        })
    }
}

//posta as infos colocadas no login
$(document).ready(function () {
    $("#continue").click(function () {
        let url = "http://127.0.0.1:3001/schoolmanagerinsert";
        get_cpfs()
        console.log("LISTA: " + cpfs)
        console.log("CPF1:" + $('#cpf').val())
        console.log("CPF2:" + cpfs.includes(parseInt(document.getElementById("cpf").value)))
        //if (!cpfs.includes(parseInt($('#cpf').val()))) {

        $.ajax({
            url: url,
            type: 'POST',
            data: {
                email: "sjkhkjlsdn",
                name: $('#first-name').val(),
                school_cnpj: "212321",//$('#school_cnpj').val(),
                cpf: $('#cpf').val(),
            },
        });
    });
});

//pega os cpfs do banco de dados
let cpfs = [];
function get_cpfs() {
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