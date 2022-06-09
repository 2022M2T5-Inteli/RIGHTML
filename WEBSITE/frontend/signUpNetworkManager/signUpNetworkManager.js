// function criarConta() {
//     window.location = "../homePage/home.html"
// }

function inputNetworkManagersData() {
    $(document).ready(function() {
        $("#buttonCreateAccount").click(function () {
            let url = "http://127.0.0.1:3001/networkmanagerinsert";
            console.log("works")
        

            if ($('#networkManagerName').val() === "" || $('#networkManagerEmail').val() === "" || $('#networkName').val() === "" || $('#networkId').val() ==="") {
                alert("preencha seus dados")
            }
            else {
                alert("registrado")
            }

            $.ajax({ //basicamente tem a mesma função do postman
                url: url,
                type: 'POST',
                    data: {
                    cpf: $('#networkManagerName').val(),                       
                    email: $('#networkManagerEmail').val(),
                    name: $('#networkName').val(),
                    network_id: $('#networkId').val(),
                },
            })        
            });
        })};

    


 

