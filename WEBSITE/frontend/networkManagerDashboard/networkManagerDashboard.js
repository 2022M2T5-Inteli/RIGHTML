

// Essa função serve para atualizar os dados da escola no banco de dados
var user = null;
var network = null;


function getSessionData() {
    //verifica se voê tem permissão para estar na pagina
    console.log("loggedIn  = " + localStorage.getItem("loggedIn"))
    console.log("primary  = " + localStorage.getItem("primaryKey"))
    if (localStorage.getItem("loggedIn") === "false" || localStorage.getItem("table") != "network_manager") {
        Swal.fire({
            icon: 'error',
            title: 'Você não tem permissão para ver esta página',
            text: 'Entre como gestor de rede para proceder',
        }).then(function() {
            window.location.href = "../index.html";
        })

    }
    let primaryKey = localStorage.getItem("primaryKey");
    console.log("IM HERE")
    $.ajax({
        url: "http://127.0.0.1:1234/networkmanagers",
        type: 'GET',
        async: false,
        success: data => {
            data.forEach(network_manager => {
                console.log(localStorage.getItem("primaryKey"))
                if (parseInt(primaryKey) === parseInt(network_manager['cpf'])) {
                    user = network_manager;
                }
            })
        }
    })

    $.ajax({
        url: "http://127.0.0.1:1234/networks",
        type: 'GET',
        async: false,
        success: data => {
            data.forEach(currentNetwork => {
                if (parseInt(user['network_id']) === parseInt(['id'])) {
                    console.log("i am smth")
                    network = currentNetwork;
                }
            })
        }
    })
//atualizar infos no banco de dados
    $("#update_data").click(function () {
        let url = "http://127.0.0.1:1234/networkupdate";
        {
            $.ajax({
                url: url,
                type: 'POST',
                data: {
                    type_of_institution: $('#institutionTypeUpdate').val(),
                    name: $('#network-name-update').val(),
                    network_id: $("#networkUpdate").val()
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

//aparecer informações sobre sua escola no front
function showUpdateBox() {
    $('#school-name-update').val(network['name']);
    $("#networkUpdate").val(network['network_id'])
    $("#institutionTypeUpdate").val(network['type_of_institution'])
}

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

function updateNetworkInfo() {
    getSessionData();
    console.log("network:" + network)
    $("#networkName").text(network['name'])
    $("#network").text(getNetworkNameFromId(network['network_id']))
    if (network['type_of_institution'] === "public") {
        $("#institutionType").text("Pública")
    } else if (network['type_of_institution'] === "private") {
        $("#institutionType").text("Particular")
    }
}
