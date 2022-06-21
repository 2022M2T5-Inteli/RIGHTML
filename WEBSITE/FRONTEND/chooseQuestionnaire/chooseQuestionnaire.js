const educationalDiagnosisID = 4;
const managementDiagnosisID = 5;

<<<<<<< HEAD
// Carregar os diagnósticos ao carregar a página
=======

//Carrega automaticamente ao entrar na página 
>>>>>>> a9c417e7708449096d8aa78461aa480490188d05
function onload() {
    checkSession();
    updateEducationalDiagnosisBox();
    updateManagementDiagnosisBox();
}

<<<<<<< HEAD
// Inicia a integração do banco de dados dos números das questões para aparecer no frontend
=======
//Pegar o do banco de dados o número de questões 
>>>>>>> a9c417e7708449096d8aa78461aa480490188d05
function getNumberOfQuestions(diagnosis_id) {
    let number = 0;
    $.ajax({
        url: "http://127.0.0.1:3001/questions",
        type: 'GET',
        async: false,
        success: data => {
            data.forEach(question => {
                if (parseInt(diagnosis_id) === (question['diagnosis_id'])) {
                    number++;
                }
            });
        }
    });
    return number;
}

<<<<<<< HEAD
// Inicia a integração do banco de dados com os id's de cada diagnósticok para aparecer no frontend
=======

>>>>>>> a9c417e7708449096d8aa78461aa480490188d05
function getDiagnosisData(diagnosis_id) {
    let desiredDiagnosis = null;
    $.ajax({
        url: "http://127.0.0.1:3001/diagnoses",
        type: 'GET',
        async: false,
        success: data => {
            data.forEach(diagnosis => {
                if (parseInt(diagnosis_id) === (diagnosis['id'])) {
                    desiredDiagnosis = diagnosis;
                }
            });
        }
    });
    return desiredDiagnosis;

}

<<<<<<< HEAD
// Atualiza a descrição da agenda de acordo com os dos de cada escola 
=======
//Checa quantas questões de educação estão disponíveis para resposta e mostra na tela
>>>>>>> a9c417e7708449096d8aa78461aa480490188d05
function updateEducationalDiagnosisBox() {
    let diagnosis = getDiagnosisData(educationalDiagnosisID)
    $("#educational-description").text(diagnosis['description']);
    $("#time-educational").text(diagnosis['answer_time'] + " minutos");
    $("#question-number-educational").text(getNumberOfQuestions(educationalDiagnosisID) + " questões");
}

<<<<<<< HEAD
// Atualiza a descrição da agenda de acordo com os dos de cada escola 
=======
//Checa quantas questões de gestão estão disponíveis para resposta e mostra na tela
>>>>>>> a9c417e7708449096d8aa78461aa480490188d05
function updateManagementDiagnosisBox() {
    let diagnosis = getDiagnosisData(managementDiagnosisID)
    $("#management-description").text(diagnosis['description']);
    $("#time-management").text(diagnosis['answer_time'] + " minutos");
    $("#question-number-management").text(getNumberOfQuestions(managementDiagnosisID) + " questões");
}

<<<<<<< HEAD
// Atualiza a descrição da agenda de acordo com os dos de cada escola 
=======
//Função que checa se o usúario está logado
>>>>>>> a9c417e7708449096d8aa78461aa480490188d05
function checkSession(){
        if(localStorage.getItem("loggedIn") === "false" || localStorage.getItem("table") != "school_manager") {
            alert('Você não tem permissão para ver esta página. Entre como gestor escolar para proceder.');
            window.location = "../index.html";
        }
}