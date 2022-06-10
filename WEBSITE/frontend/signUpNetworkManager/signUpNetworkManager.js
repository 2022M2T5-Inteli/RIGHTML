// function criarConta() {
//     window.location = "../homePage/home.html"
// }

$(document).ready(function () {
    $("#buttonCreateAccount").click(function () {
        let urlNetworkManager = "http://127.0.0.1:3001/networkmanagerinsert"
        let urlNetwork = "http://127.0.0.1:3001/networkinsert"

        if ($('#networkManagerName').val() === "" || $('#networkManagerEmail').val() === "" || $('#networkName').val() === "" || $('#networkId').val() === "" || $('#networkManagerCPF').val() === "") {
            alert("preencha seus dados")
        }
        else {
            alert("registrado")
        }

        $.ajax({ //basicamente tem a mesma função do postman
            url: urlNetworkManager,
            type: 'POST',
            data: {
                name: $('#networkManagerName').val(),
                email: $('#networkManagerEmail').val(),
                cpf: $('#networkManagerCPF').val(),
            },
        })
        $.ajax({ //basicamente tem a mesma função do postman
            url: urlNetwork,
            type: 'POST',
            data: {
                name: $('#networkName').val(),
                network_id: $('#networkId').val(),
                type: $('input[name=opcao]:checked').val(),
            },
        })
    });
});





