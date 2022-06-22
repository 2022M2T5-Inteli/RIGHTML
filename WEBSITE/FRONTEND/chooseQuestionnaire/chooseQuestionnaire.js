const educationalDiagnosisID = 4;
const managementDiagnosisID = 5;

// Carregar os diagnósticos ao carregar a página
function onload() {
    checkSession();
    updateEducationalDiagnosisBox();
    updateManagementDiagnosisBox();
    loggedChecked();
}

// Inicia a integração do banco de dados dos números das questões para aparecer no frontend
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

// Inicia a integração do banco de dados com os id's de cada diagnósticok para aparecer no frontend
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

// Atualiza a descrição da agenda de acordo com os dos de cada escola 
function updateEducationalDiagnosisBox() {
    let diagnosis = getDiagnosisData(educationalDiagnosisID)
    $("#educational-description").text(diagnosis['description']);
    $("#time-educational").text(diagnosis['answer_time'] + " minutos");
    $("#question-number-educational").text(getNumberOfQuestions(educationalDiagnosisID) + " questões");
}

function updateManagementDiagnosisBox() {
    $("#question-number-management").text(getNumberOfQuestions(managementDiagnosisID) + " questões");
}

// Atualiza a descrição da agenda de acordo com os dos de cada escola 
function checkSession() {
    if (localStorage.getItem("loggedIn") === "false" || localStorage.getItem("table") != "school_manager") {
        // alert('Você não tem permissão para ver esta página. Entre como gestor escolar para proceder.');
        Swal.fire({
            icon: 'error',
            title: 'Você não tem permissão para ver esta página',
            text: 'Entre como gestor de rede para proceder',
        })
        window.location = "../index.html";
    }
}

let logged = localStorage.getItem("loggedIn");
let headerLogged = document.getElementById("changeLink");
let userType = localStorage.getItem("table");
console.log(userType)

function loggedChecked() {
    if (logged === "true") {
        console.log('logadoooo')
        // headerLogged.innerHTML = `<a href="./login/login.html" class="nav-item nav-link" id="changeLink">Logadao</a>`
        if (userType === "school_manager") {
            console.log('gestor escola user')
            headerLogged.innerHTML = `<a href="../schoolManagerDashboard/schoolManagerDashboard.html" class="nav-item nav-link" >Área do Gestor</a>`
        }

        else if (userType === "network_manager") {
            console.log('gestor rede user')
            headerLogged.innerHTML = `<a href="../networkManagerDashboard/networkManagerDashboard.html" class="nav-item nav-link" >Área do Gestor</a>`
        }

        else if (userType === "employee") {
            console.log('funcionario')
            headerLogged.innerHTML = `<a href="../adminDashboard.html" class="nav-item nav-link" >Área do Administrador </a>`
        }
    }
    else {

        headerLogged.innerHTML = `<a href="../login/login.html" class="nav-item nav-link" id="changeLink">Entrar</a>`
    }
}