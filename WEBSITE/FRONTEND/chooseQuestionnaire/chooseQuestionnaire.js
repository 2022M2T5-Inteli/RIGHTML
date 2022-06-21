const educationalDiagnosisID = 4;
const managementDiagnosisID = 5;


//Carrega automaticamente ao entrar na página 
function onload() {
    checkSession();
    updateEducationalDiagnosisBox();
    updateManagementDiagnosisBox();
}

//Pegar o do banco de dados o número de questões 
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

//Checa quantas questões de educação estão disponíveis para resposta e mostra na tela
function updateEducationalDiagnosisBox() {
    let diagnosis = getDiagnosisData(educationalDiagnosisID)
    $("#educational-description").text(diagnosis['description']);
    $("#time-educational").text(diagnosis['answer_time'] + " minutos");
    $("#question-number-educational").text(getNumberOfQuestions(educationalDiagnosisID) + " questões");
}

//Checa quantas questões de gestão estão disponíveis para resposta e mostra na tela
function updateManagementDiagnosisBox() {
    let diagnosis = getDiagnosisData(managementDiagnosisID)
    $("#management-description").text(diagnosis['description']);
    $("#time-management").text(diagnosis['answer_time'] + " minutos");
    $("#question-number-management").text(getNumberOfQuestions(managementDiagnosisID) + " questões");
}

//Função que checa se o usúario está logado
function checkSession(){
        if(localStorage.getItem("loggedIn") === "false" || localStorage.getItem("table") != "school_manager") {
            alert('Você não tem permissão para ver esta página. Entre como gestor escolar para proceder.');
            window.location = "../index.html";
        }
}