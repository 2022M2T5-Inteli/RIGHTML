var user = null;
var network = null;

function getSessionData() {
    //verifica se voê tem permissão para estar na página
    // se não estiver logado, mostra pop-up de erro
    if (localStorage.getItem("loggedIn") === "false" ||
        localStorage.getItem("table") != "network_manager") {
        Swal.fire({
            icon: 'error',
            title: 'Você não tem permissão para ver esta página',
            text: 'Entre como gestor de rede para proceder',
        }).then(function() {
            window.location.href = "../index.html";
        })
    }

    // se estiver logado corretamente, pega informações do login do browser para descobrir
    // em qual conta está logado
    let primaryKey = localStorage.getItem("primaryKey");
    // encontra o registro de network manager associado ao cpf logado
    $.ajax({
        url: "http://127.0.0.1:1234/networkmanagers",
        type: 'GET',
        async: false,
        success: data => {
            data.forEach(network_manager => {
                if (parseInt(primaryKey) === parseInt(network_manager['cpf'])) {
                    user = network_manager;
                }
            })
        }
    })

    // encontra a rede de ensino associada ao network manager logado
    $.ajax({
        url: "http://127.0.0.1:1234/networks",
        type: 'GET',
        async: false,
        success: data => {
            data.forEach(currentNetwork => {
                if (parseInt(user['network_id']) === parseInt(currentNetwork['id'])) {
                    network = currentNetwork;
                }
            })
        }
    })

//atualizar infos no banco de dados de acordo com o inputado no box de atualizar informações
    $("#update-data").click(function () {
        let url = "http://127.0.0.1:1234/networkupdate";
        {
            $.ajax({
                url: url,
                type: 'POST',
                data: {
                    type: $('#network-type-update').val(),
                    name: $('#network-name-update').val(),
                    id: network['id']
                },
            })
            updateNetworkInfo();
        }

    })
}

//sair da conta logada
function logout() {
    localStorage.setItem("loggedIn", "false");
    localStorage.setItem("primaryKey", null);
    localStorage.setItem("table", null);
    window.location.href = "../login/login.html";
}

// mostra dados atuais nos inputs de atualização
function showUpdateBox() {
    $('#network-name-update').val(network['name']);
    $("#network-type-update").val(network['type'])
}

// retorna o nome de uma rede com base no id
function getNetworkNameFromId(network_id) {
    let networkName = null;
    $.ajax({
        url: "http://127.0.0.1:1234/networks",
        type: 'GET',
        async: false,
        success: data => {
            data.forEach(network => {
                if (parseInt(network['id']) === parseInt(network_id)) {
                    networkName = network['name'];
                }
            })
        }
    })
    return networkName;
}

// atualiza os dados da rede no box de informações
function updateNetworkInfo() {
    getSessionData();
    $("#networkName").text(network['name'])
    $("#network").text(getNetworkNameFromId(network['network_id']))
    if (network['type'] === "public") {
        $("#networkType").text("Pública")
    } else if (network['type'] === "private") {
        $("#networkType").text("Particular")
    }
}