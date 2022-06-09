function next() {
    let options = document.querySelector('input[name="option"]:checked').value
    if (options == "schoolManager") {
        window.location = "../signUpSchoolManager/signUpSchoolManager.html"
    }
    else if (options == "networkManager") {
        window.location = "../signUpNetworkManager/signUpNetworkManager.html"
    }
    else {
        window.alert("Selecione uma das opções")
    }
}

$(document).ready(function () {
    $("#button").click(function () {
        let url = "http://127.0.0.1:3001/schoolmanagerinsert";
        let xhttp = new XMLHttpRequest();
            xhttp.open("POST", url, false);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send("name" + $('#name').val() + "&email=" + $('#email').val() + "&cpf" + $('#cpf').val());//A execução do script pára aqui até a requisição retornar do servidor
    });
});