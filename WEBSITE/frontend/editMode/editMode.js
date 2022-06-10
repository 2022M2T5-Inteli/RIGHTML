function onload() {
    $("#add-axis-span").hide();
    readQuestionsFromDatabase();
}

const questionsContainer = document.getElementById("questions-container");
let currentEditModeQuestionIndex = null;


function addQuestion() {
    getQuestionData();
}

function getQuestionData() {
    let form = document.getElementById("form");
    let questionWording = form["question"].value;
    form["question"].value = "";
    let axis = form['axis'].value;
    form['axis'].value = "";
    let alternativeElements = document.querySelectorAll(".alternatives");
    let alternativeValues = [];
    for (let i = 0; i < alternativeElements.length; i++) {
        alternativeValues.push(alternativeElements[i].value);
        document.querySelectorAll(".alternatives")[i].value = "";
    }
    let question = new Question(questionWording, axis, alternativeValues);
    questionsArray.push(question);
    updateQuestions();
}

function applyQuestionChanges() {
    let form = document.getElementById("editForm");
    let questionWording = form["question"].value;
    let axis = form['axis'].value;
    let alternativeElements = document.querySelectorAll(".editableAlternatives");
    let alternativeValues = [];
    for (let i = 0; i < alternativeElements.length; i++) {
        alternativeValues.push(alternativeElements[i].value);
    }
    let question = new Question(questionWording, axis, alternativeValues);
    questionsArray[currentEditModeQuestionIndex] = question;
    updateQuestions();
}

function modal() {
    $('#question').val("");
    $('#weight').val("");
    let axes = getAxes();
    document.getElementById('axis-dropdown').innerHTML = "<option value='' disabled selected>Escolher...</option>";
    axes.forEach(axis => {
        document.getElementById('axis-dropdown').innerHTML += `<option value="${axis['name']}">${axis['name']}</option>`
    })
}

var highestPosition = 0;
function lastQuestionPosition() {
    highestPosition = 0;
    $.ajax({
        url: "http://127.0.0.1:3001/questions",
        type: 'GET',
        async: false,
        success: data => {
            data.forEach(element => {
                if (parseInt(element['position']) > highestPosition) {
                    highestPosition = parseInt(element['position']);
                }
            });
        }
    });
    highestPosition += 1;
    console.log("highest position: " + highestPosition)
}



function saveQuestion() {
    lastQuestionPosition();
    $.ajax({
        url: "http://127.0.0.1:3001/questioninsert",
        type: 'POST',
        async: false,
        data: {
            weight: parseInt($("#weight").val()),
            text: $("#question").val(),
            position: highestPosition,
            axis_subdivision_id: findIDByName($('#critical-factors').val()),
            axis_id: getAxisIdFromName($('#axis-dropdown').val()),
            diagnosis_id: 1
        }
    });
    let lastId = getLastQuestionId()
    saveAlternatives(lastId);
    readQuestionsFromDatabase();
}

function getLastQuestionId() {
    var highestId = 0;
    $.ajax({
        url: "http://127.0.0.1:3001/questions",
        type: 'GET',
        async: false,
        success: data => {
            console.log("PLAMOR")
            data.forEach(question => {
                if (question['id'] > highestId) {
                    highestId = question['id'];
                }
            })
        }
    });
    return highestId;
}

function getAxisIdFromName(name) {
    console.log(name)
    let id = null;
    $.ajax({
        url: "http://127.0.0.1:3001/axes",
        type: 'GET',
        async: false,
        success: data => {
            data.forEach(element => {
                if (element['name'] === name) {
                    id = element['id'];
                }
            });
        }
    });
    return id;
}
let critical_factors = [];
function getModalSubdivisions() {
    critical_factors = [];
    let axis = $("#axis-dropdown").val();
    let id = getAxisIdFromName(axis);
    $.ajax({
        url: "http://127.0.0.1:3001/axissubdivisions",
        type: 'GET',
        async: false,
        success: data => {
            data.forEach(element => {
                if (parseInt(id) === (element['axis_id'])) {
                    critical_factors.push(element['name'])
                }
            });
        }
    });
    return critical_factors;
}

$("#axis-dropdown").change(function () {
    console.log(getModalSubdivisions("Ensino"))
    let subdivisions = getModalSubdivisions();
    document.getElementById('critical-factors').innerHTML = "<option value='' disabled selected>Escolher...</option>";
    subdivisions.forEach(subdivision => {
        document.getElementById('critical-factors').innerHTML += `<option value="${subdivision}">${subdivision}</option>`
    })
});


function findIDByName(name){
let id = ''
    $.ajax({
        url: "http://127.0.0.1:3001/axissubdivisions",
        type: 'GET',
        async: false,
        success: data => {
            data.forEach(element => {
                if ( name === element['name']) {
                    id = element['id'];
        }})
    }})
    return id;

}
     
function saveAlternatives(question_id) {
    for(let i = 1; i <= 5; i++) {
        if($("#alternative" + i).val() != "") {
            $.ajax({
                url: "http://127.0.0.1:3001/optioninsert",
                type: 'POST',
                async: false,
                data: {
                    weight: $("#alternativeweight" + i).val(),
                    text: $("#alternative" + i).val(),
                    question_id: question_id,
                    position: i,
                    axis_subdivision_id: findIDByName($('#critical-factors').val()),
                    axis_id: getAxisIdFromName($('#axis-dropdown').val()),
                    diagnosis_id: 1
                }
            });
        }
    }
}

function getAxes() {
    var axes = [];
    $.ajax({
        url: "http://127.0.0.1:3001/axes",
        type: 'GET',
        async: false,
        success: data => {
            data.forEach(element => {
                if (parseInt(element['diagnosis_id']) === 1) {
                    axes.push(element);
                }
            });
        }
    });
    return axes;
}

function getAxisIdFromName(name) {
    let id = null;
    $.ajax({
        url: "http://127.0.0.1:3001/axes",
        type: 'GET',
        async: false,
        success: data => {
            data.forEach(element => {
                if (element['name'] === name) {
                    id = element['id'];
                }
            });
        }
    });
    return id;
}

$('#add-axis').on('click', function (event) {
    if ($('#add-axis-span').is(":visible")) {
        $('#add-axis-span').hide();
    } else {
        $('#add-axis-span').show();
    }
});

$('#save-axis').on('click', function (event) {
    let axis_name = $('#add-axis-input').val();
    $.ajax({
        url: "http://127.0.0.1:3001/axisinsert",
        type: 'POST',
        async: false,
        data: {
            name: axis_name,
            diagnosis_id: 1,
            position: 10,
        }
    });
    $('#add-axis-input').val("");
    $('#add-axis-span').hide();
    modal();
});

$('#add-subaxis').on('click', function (event) {
    if ($('#add-subaxis-span').is(":visible")) {
        $('#add-subaxis-span').hide();
    } else {
        $('#add-subaxis-span').show();
    }
});

$('#save-subaxis').on('click', function (event) {
    let axis_name = $('#add-subaxis-input').val();
    $.ajax({
        url: "http://127.0.0.1:3001/axisinsert",
        type: 'POST',
        async: false,
        data: {
            name: axis_name,
            diagnosis_id: 1,
            position: 10,
        }
    });
    $('#add-subaxis-input').val("");
    $('#add-subaxis-span').hide();
    modal();
});

function getAxisFromId(id) {
    var name = null;
    $.ajax({
        url: "http://127.0.0.1:3001/axes",
        type: 'GET',
        async: false,
        success: data => {
            data.forEach(element => {
                if (parseInt(element['id']) === parseInt(id)) {
                    name = element['name'];
                }
            });
        }
    });
    return name;
}

let alternatives = [];

function getAlternatives(question_id) {
    alternatives = [];
    $.ajax({
        url: "http://127.0.0.1:3001/options",
        type: 'GET',
        async: false,
        success: data => {
            data.forEach(element => {
                if (parseInt(question_id) === parseInt(element['question_id'])) {
                    alternatives.push(element['text']);
                }
            })
        }

    })
    return alternatives;
}



function readQuestionsFromDatabase() {
    $.ajax({
        //url do endpoint
        url: "http://127.0.0.1:3001/questions",
        //tipo da requisição
        type: 'GET',
        //se obtiver sucesso, executar a arrow function abaixo
        success: data => {
            //se não tiver questão no banco de dados, retorna um div do html com esse texto
            if (data.length == 0) {
                return questionsContainer.innerHTML = "Ainda não há questões neste questionário. Clique no + para adicionar uma.";
            }
            //se tiver questão, limpa o questionsContainer
            else {
                questionsContainer.innerHTML = "";
                //forEach faz loop que vai passar por cada elemento dentro do data
                //cada vez que passa ele vai guardar o registro atual na variável elemento
                data.forEach(element => {
                    //insere todo o html que precisa para cada pergunta
                    questionsContainer.innerHTML += `
                
        <div id="question${element['position']}">
            <div class="row question-header">
                <div class="col-sm-10">
                    <h5>Questão ${element['position']} | Eixo ${getAxisFromId(element['axis_id'])} </h5>
                </div>
                <div class="col-sm-1">
                    <button type="button" class="btn btn-primary trash" onclick="deleteQuestion()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                        </svg>
                    </button>
                </div>
                <div class="col-sm-1">
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal" onclick="updateEditModal()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="question-wording">
                <p>${element['text']}</p>
            </div>`;
                    let alternatives = getAlternatives(element['id']);
                    alternatives.forEach(alternative => {
                        questionsContainer.innerHTML +=
                            `<div class="form-check">
                <input class="form-check-input" type="radio" name="question${element['position']}" id="flexRadioDefault1">
                <label class="form-check-label" for="flexRadioDefault1">${alternative}</label>
                </div>`
                    })
                });
            }
        }

    });
}

/* function updateQuestions() {
    if (questionsArray.length === 0) {
        return questionsContainer.innerHTML = "Ainda não há questões neste questionário. Clique no + para adicionar uma.";
    }
    questionsContainer.innerHTML = "";
    for (let i = 0; i < questionsArray.length; i++) {
        let question = questionsArray[i];
        let index = questionsArray.indexOf(question, 0);
        let numberOfAlternatives = question.alternatives.length;
        console.log(question.alternatives)
        questionsContainer.innerHTML += `
        <div id="question${index + 1}">
            <div class="row question-header">
                <div class="col-sm-10">
                    <h5>Questão ${index + 1} | Eixo ${question.axis} </h5>
                </div>
                <div class="col-sm-1">
                    <button type="button" class="btn btn-primary" onclick="deleteQuestion(${index})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                        </svg>
                    </button>
                </div>
                <div class="col-sm-1">
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal" onclick="updateEditModal(${index})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="question-wording">
                <p>${question.question}</p>
            </div>`

        for (let i = 0; i < numberOfAlternatives; i++) {
            questionsContainer.innerHTML +=
                `<div class="form-check">
                <input class="form-check-input" type="radio" name="question${index + 1}" id="flexRadioDefault1">
                <label class="form-check-label" for="flexRadioDefault1">${question.alternatives[i]}</label>
                </div>`
            if (i === numberOfAlternatives - 1) {
                questionsContainer.innerHTML += `</div>`;
            }
        }
    }
}

function deleteQuestion(questionIndex) {
    questionsArray.splice(questionIndex, 1);
    updateQuestions();
}

function updateEditModal(questionIndex) {
    console.log("Im here")
    currentEditModeQuestionIndex = questionIndex;
    let originalQuestion = questionsArray[questionIndex];
    const form = document.getElementById("editForm");
    form["question"].value = originalQuestion.question;
    form['axis'].value = originalQuestion.axis;
    let alternativeElements = document.querySelectorAll(".editableAlternatives");
    for (let i = 0; i < alternativeElements.length; i++) {
        document.querySelectorAll(".editableAlternatives")[i].value = originalQuestion.alternatives[i];
    }
} */