
//te encaminha para a proxima pagina de cadastro
function next() {
    let options = document.querySelector('input[name="option"]:checked').value;
    let cpf = parseInt($("#cpf").val());
    console.log("cpf " + cpf)
    if (cpf === "" || $("#name").val() === "" || $("#email").val() === "") {
        Swal.fire({
            icon: 'error',
            title: 'Selecione uma das opções',
        })
    }
    else if (options == "schoolManager") {
        if (SchoolManagerCPFIsUnique(cpf)) {
            localStorage.setItem("cpf", cpf);
            localStorage.setItem("name", $("#name").val())
            localStorage.setItem("email", $("#email").val())
            window.location = "../signUpSchoolManager/signUpSchoolManager.html"
        } else {
            Swal.fire({
                icon: 'error',
                title: 'CPF já cadastrado',
            })
        }
    }
    else if (options == "networkManager") {
        if (NetworkManagerCPFIsUnique(cpf)) {
            localStorage.setItem("cpf", cpf);
            localStorage.setItem("name", $("#name").val())
            localStorage.setItem("email", $("#email").val())
            window.location = "../signUpNetworkManager/signUpNetworkManager.html"
        } else {
            Swal.fire({
                icon: 'error',
                title: 'CPF já cadastrado',
            })
        }
    }
}

function SchoolManagerCPFIsUnique(cpf) {
    let isUnique = true;
    $.ajax({
        url: "http://127.0.0.1:3001/schoolmanagers",
        type: 'GET',
        async: false,
        success: data => {
            data.forEach(element => {
                console.log("current cpf " + element['cpf'])
                if (cpf === element['cpf']) {
                    isUnique = false;
                }
            });
        }
    });
    return isUnique;
}

function NetworkManagerCPFIsUnique(cpf) {
    let isUnique = true;
    $.ajax({
        url: "http://127.0.0.1:3001/networkmanagers",
        type: 'GET',
        async: false,
        success: data => {
            data.forEach(element => {
                if (cpf === element['cpf']) {
                    isUnique = false;
                }
            });
        }
    });
    return isUnique;
}
