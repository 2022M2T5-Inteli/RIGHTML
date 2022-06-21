const educationalDiagnosisID = 4;
const managementDiagnosisID = 5;


function onload() {
    checkSession();
    updateEducationalDiagnosisBox();
    updateManagementDiagnosisBox();
}

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


function updateEducationalDiagnosisBox() {
    let diagnosis = getDiagnosisData(educationalDiagnosisID)
    $("#educational-description").text(diagnosis['description']);
    $("#time-educational").text(diagnosis['answer_time'] + " minutos");
    $("#question-number-educational").text(getNumberOfQuestions(educationalDiagnosisID) + " questões");
}
function updateManagementDiagnosisBox() {
    let diagnosis = getDiagnosisData(managementDiagnosisID)
    $("#management-description").text(diagnosis['description']);
    $("#time-management").text(diagnosis['answer_time'] + " minutos");
    $("#question-number-management").text(getNumberOfQuestions(managementDiagnosisID) + " questões");
}

function checkSession(){
        if(localStorage.getItem("loggedIn") === "false" || localStorage.getItem("table") != "school_manager") {
            alert('Você não tem permissão para ver esta página. Entre como gestor escolar para proceder.');
            window.location = "../index.html";
        }
}