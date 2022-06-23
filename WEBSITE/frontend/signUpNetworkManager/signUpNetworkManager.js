let school_id = [];
//Essa função vê o ID da rede
function getLastNetworkId() {
    let lastID = -1;
    $.ajax({
        url: "http://127.0.0.1:3001/networks",
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
        if ($('#name').val() === "") {
            Swal.fire({
                icon: 'error',
                title: 'Preencha todos os dados!',
            })
        }
        else {
            //Insere os dados da escola no banco de dados
            $.ajax({
                url: "http://127.0.0.1:3001/networkinsert",
                type: 'POST',
                data: {
                    name: $('#networkName').val(),
                    type: document.querySelector('input[name="opcao"]:checked').value
                },
            })
            $.ajax({
                url: "http://127.0.0.1:3001/networkmanagerinsert",
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

            })
            window.location = '../networkManagerDashboard/networkManagerDashboard.html';
        }
    });
});


