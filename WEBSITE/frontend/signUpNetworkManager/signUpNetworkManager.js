function criarConta() {
    window.location = "../homePage/home.html"
}

$(document).ready(function () {
    $("").click(function () {
        let url = "http://127.0.0.1:3001/schoolmanagerinsert";
        let xhttp = new XMLHttpRequest();
        if (has_duplicates($('#cpf').val()) === false) {
            xhttp.open("POST", url, false);
            xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhttp.send("email=elisaflemer@&name=" + $('#first-name').val() + "&school_cnpj=" + $('#school_cnpj') + "&cpf=" + $('#cpf').val());//A execução do script pára aqui até a requisição retornar do servidor
        } else {
            alert("CPF já cadastrado")
        }

    });
});

function readQuestionsFromDatabase() {
    $.ajax({
        url: "http://127.0.0.1:3001/network_manager",
        type: 'POST',
        success: data => {
            if (data.length == 0) {
                return questionsContainer.innerHTML = "Ainda não há questões neste questionário. Clique no + para adicionar uma.";
            }
            else {
                questionsContainer.innerHTML = "";
                data.forEach(element => { 
                    questionsContainer.innerHTML += `
  
                });
            }
        }

    });
}

