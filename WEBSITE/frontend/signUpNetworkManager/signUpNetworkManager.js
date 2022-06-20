// function criarConta() {
//     window.location = "../homePage/home.html"
// }

$(document).ready(function () {
    let CPFS = [];
    function get_cpf() {
        $.ajax({
            url: "http://127.0.0.1:3001/networkmanagers",
            type: 'GET',
            async: false,
            success: data => {
                data.forEach(element => {

                    CPFS.push(element['cpf'])
                });
            }

        });
    }

    $("#buttonCreateAccount").click(function () {
        let urlNetworkManager = "http://127.0.0.1:3001/networkmanagerinsert"
        let urlNetwork = "http://127.0.0.1:3001/networkinsert"
        console.log(CPFS)

        if ($('#networkManagerName').val() === "" || $('#networkManagerEmail').val() === "" || $('#networkName').val() === "" || $('#networkId').val() === "" || $('#networkManagerCPF').val() === "") {
            // alert("Preencha seus dados")
            Swal.fire({
                icon: 'error',
                title: 'Preencha todos os campos!',
            })
        }
        else if ((CPFS.includes(parseInt($('#networkManagerCPF').val())))) {
            // alert("O CPF informado já existe!")
            Swal.fire({
                icon: 'error',
                title: 'O usuário com o CPF informado já existe!',
            })
        }
        else {
            console.log("deu bom")
            get_cpf()

            $.ajax({
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
            window.location.replace("../homePage/home.html")
        }
    });
});





