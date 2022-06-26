let school_id = [];
//Essa função vê o ID da rede
function getLastNetworkId() {
    let lastID = -1;
    $.ajax({
        url: "http://127.0.0.1:1234/networks",
        type: 'GET',
        async: false,
        success: data => {
            data.forEach(element => {
                if (element['id'] > lastID) {
                    lastID = element['id'];
                }
            });
        }
    });
    return lastID;
}

// Função que checa se todos os campos da escola estão preenchidos
$(document).ready(function () {
    $("#create-account").click(function () {
        console.log("clicked")
        if ($('#name').val() === "") {
            Swal.fire({
                icon: 'error',
                title: 'Preencha todos os dados!',
            })
        }
        else {
            //Insere os dados da escola no banco de dados
            $.ajax({
                url: "http://127.0.0.1:1234/networkinsert",
                type: 'POST',
                data: {
                    name: $('#networkName').val(),
                    type: document.querySelector('input[name="opcao"]:checked').value
                },
            })
            console.log($('#networkName').val());
            $.ajax({
                url: "http://127.0.0.1:1234/networkmanagerinsert",
                type: 'POST',
                data: {
                    name: localStorage.getItem("name"),
                    cpf: localStorage.getItem("cpf"),
                    email: localStorage.getItem("email"),
                    network_id: getLastNetworkId()
                },
            })
            Swal.fire({
                icon: 'success',
                title: 'Conta criada com sucesso',

            }).then(function() {
                localStorage.setItem("loggedIn", "true");
                localStorage.setItem("table", "network_manager");
                localStorage.setItem("primaryKey", localStorage.getItem("cpf"))
                localStorage.setItem("cpf", null);
                localStorage.setItem("name", null);
                localStorage.setItem("email", null);

                window.location = '../networkManagerDashboard/networkManagerDashboard.html';
            })

        }
    });
});


