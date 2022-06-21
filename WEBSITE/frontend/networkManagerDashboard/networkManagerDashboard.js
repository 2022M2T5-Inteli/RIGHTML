

// Essa função serve para atualizar os dados da escola no banco de dados
var user = null;
var network = null;

function getSessionData() {
    if (localStorage.getItem("loggedIn") === "false" || localStorage.getItem("table") != "network_manager") {
        alert('Você não tem permissão para ver esta página. Entre como gestor de rede para proceder.');
        window.location = "../index.html";
    }
    let primaryKey = localStorage.getItem("primaryKey");
    $.ajax({
        url: "http://127.0.0.1:3001/networkmanagers",
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

    $.ajax({
        url: "http://127.0.0.1:3001/networks",
        type: 'GET',
        async: false,
        success: data => {
            data.forEach(currentNetwork => {
                if (parseInt(user['network_id']) === parseInt(['id'])) {
                    network = currentNetwork;
                }
            })
        }
    })

    $("#update_data").click(function () {
        let url = "http://127.0.0.1:3001/networkupdate";
        {
            $.ajax({
                url: url,
                type: 'POST',
                data: {  //aaaaaaaaaaaa
                    type_of_institution: $('#institutionTypeUpdate').val(),
                    name: $('#network-name-update').val(),
                    network_id: $("#networkUpdate").val()
                },
            })
            updateNetworkInfo();
        }
    });

    function logout() {
        localStorage.setItem("loggedIn", "false");
        localStorage.setItem("primaryKey", null);
        localStorage.setItem("table", null);
        window.location.href = "../login/login.html";
    }

    function showUpdateBox() {
        $('#school-name-update').val(network['name']);
        $("#networkUpdate").val(network['network_id'])
        $("#institutionTypeUpdate").val(network['type_of_institution'])
    }

    function getNetworkNameFromId(network_id) {
        let networkName = null;
        $.ajax({
            url: "http://127.0.0.1:3001/networks",
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
        $("#institutionName").text(network['name'])
        $("#network").text(getNetworkNameFromId(network['network_id']))
        if (network['type_of_institution'] === "public") {
            $("#institutionType").text("Pública")
        } else if (network['type_of_institution'] === "private") {
            $("#institutionType").text("Particular")
        }
    }
}