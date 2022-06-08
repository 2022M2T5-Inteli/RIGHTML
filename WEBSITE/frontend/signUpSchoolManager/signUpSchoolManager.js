function criarConta() {
    window.location = "../homePage/home.html"
}

$(document).ready(function () {
    $("#criarConta").click(function () {
        let url = "http://127.0.0.1:3001/schoolinsert";
        let xhttp = new XMLHttpRequest();
       
            xhttp.open("POST", url, false);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send("cnpj=" + $('#CNPJ').val() + "&number_of_students=" + $('#numeroAlunos').val() + "&name=Fulano dE tAl " + $('#cpf').val());//A execução do script pára aqui até a requisição retornar do servidor


    });
});