function onload() {
    readQuestionsFromDatabase();
}

const questionsContainer = document.getElementById("questions-container");
let currentEditModeQuestionIndex = null;

function modal() {
    $('#axis-dropdown').val('')
    $('#critical-factors').val('')
    $('#alternative1').val('')
    $('#alternative2').val('')
    $('#alternative3').val('')
    $('#alternative4').val('')
    $('#alternative5').val('')
    $('#weight1').val('')
    $('#weight2').val('')
    $('#weight3').val('')
    $('#weight4').val('')
    $('#weight5').val('')
    $("#add-axis-span").hide();
    $("#add-subaxis-span").hide();
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
    return highestPosition;
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

function saveQuestionChanges(question_id) {
    let position = lastQuestionPosition()
    $.ajax({
        url: "http://127.0.0.1:3001/questionupdate",
        type: 'POST',
        async: false,
        data: {
            id: question_id,
            weight: parseInt($("#edit-weight").val()),
            text: $("#edit-question").val(),
            position: position,
            axis_subdivision_id: findIDByName($('#edit-critical-factors').val()),
            axis_id: getAxisIdFromName($('#edit-axis-dropdown').val()),
            diagnosis_id: 1
        }
    });
    saveAlternativeChanges(question_id);
    readQuestionsFromDatabase();
}

function getLastQuestionId() {
    var highestId = 0;
    $.ajax({
        url: "http://127.0.0.1:3001/questions",
        type: 'GET',
        async: false,
        success: data => {
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
function getModalSubdivisions(axis_id) {
    critical_factors = [];
    $.ajax({
        url: "http://127.0.0.1:3001/axissubdivisions",
        type: 'GET',
        async: false,
        success: data => {
            data.forEach(element => {
                if (parseInt(axis_id) === (element['axis_id'])) {
                    critical_factors.push(element['name'])
                }
            });
        }
    });
    return critical_factors;
}

$("#axis-dropdown").change(function () {
    let subdivisions = getModalSubdivisions(getAxisIdFromName($("#axis-dropdown").val()));
    document.getElementById('critical-factors').innerHTML = "<option value='' disabled selected>Escolher...</option>";
    subdivisions.forEach(subdivision => {
        document.getElementById('critical-factors').innerHTML += `<option value="${subdivision}">${subdivision}</option>`
    })
});

$("#edit-axis-dropdown").change(function () {
    let subdivisions = getModalSubdivisions(getAxisIdFromName($("#edit-axis-dropdown").val()));
    document.getElementById('edit-critical-factors').innerHTML = "<option value='' disabled selected>Escolher...</option>";
    subdivisions.forEach(subdivision => {
        document.getElementById('edit-critical-factors').innerHTML += `<option value="${subdivision}">${subdivision}</option>`
    })
});


function findIDByName(name) {
    let id = ''
    $.ajax({
        url: "http://127.0.0.1:3001/axissubdivisions",
        type: 'GET',
        async: false,
        success: data => {
            data.forEach(element => {
                if (name === element['name']) {
                    id = element['id'];
                }
            })
        }
    })
    return id;

}

function saveAlternatives(question_id) {
    for (let i = 1; i <= 5; i++) {
        if ($("#alternative" + i).val() != "") {
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

function saveAlternativeChanges(question_id) {
    original_alternatives = getAlternatives(question_id);
    for (let i = 1; i <= 5; i++) {
        if ($("#edit-alternative" + i).val() != "") {
            $.ajax({
                url: "http://127.0.0.1:3001/optionupdate",
                type: 'POST',
                async: false,
                data: {
                    id: original_alternatives[i - 1]['id'],
                    weight: $("#edit-alternativeweight" + i).val(),
                    text: $("#edit-alternative" + i).val(),
                    question_id: question_id,
                    position: i,
                    axis_subdivision_id: findIDByName($('#edit-critical-factors').val()),
                    axis_id: getAxisIdFromName($('#edit-axis-dropdown').val()),
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
                if (parseInt(element['diagnosis_id']) === 2) {
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

$('#edit-add-axis').on('click', function (event) {
    if ($('#edit-add-axis-span').is(":visible")) {
        $('#edit-add-axis-span').hide();
    } else {
        $('#edit-add-axis-span').show();
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
            diagnosis_id: 2,
            position: 10,
        }
    });
    $('#add-axis-input').val("");
    $('#add-axis-span').hide();
    modal();
});

$('#edit-save-axis').on('click', function (event) {
    let axis_name = $('#edit-add-axis-input').val();
    $.ajax({
        url: "http://127.0.0.1:3001/axisinsert",
        type: 'POST',
        async: false,
        data: {
            name: axis_name,
            diagnosis_id: 2,
            position: 10,
        }
    });
    $('#edit-add-axis-input').val("");
    $('#edit-add-axis-span').hide();
    modal();
});

$('#add-subaxis').on('click', function (event) {
    if ($('#add-subaxis-span').is(":visible")) {
        $('#add-subaxis-span').hide();
    } else {
        $('#add-subaxis-span').show();
    }
});

$('#edit-add-subaxis').on('click', function (event) {
    if ($('#edit-add-subaxis-span').is(":visible")) {
        $('#edit-add-subaxis-span').hide();
    } else {
        $('#edit-add-subaxis-span').show();
    }
});

$('#save-subaxis').on('click', function (event) {
    let subaxis_name = $('#add-subaxis-input').val();
    $.ajax({
        url: "http://127.0.0.1:3001/axissubdivisioninsert",
        type: 'POST',
        async: false,
        data: {
            name: subaxis_name,
            axis_id: getAxisIdFromName($("#axis-dropdown").val()),
            diagnosis_id: 1,
            position: 10,
        }
    });
    $('#add-subaxis-input').val("");
    $('#add-subaxis-span').hide();
    modal();
});

$('#edit-save-subaxis').on('click', function (event) {
    let subaxis_name = $('#edit-add-subaxis-input').val();
    $.ajax({
        url: "http://127.0.0.1:3001/axissubdivisioninsert",
        type: 'POST',
        async: false,
        data: {
            name: subaxis_name,
            axis_id: getAxisIdFromName($("#edit-axis-dropdown").val()),
            diagnosis_id: 2,
            position: 10,
        }
    });
    $('#edit-add-subaxis-input').val("");
    $('#edit-add-subaxis-span').hide();
    updateEditModal();
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
                    alternatives.push(element);
                }
            })
        }

    })
    return alternatives;
}


function deleteQuestion(question_id) {
    let alternatives = getAlternatives(question_id);
    alternatives.forEach(alternative => {
        $.ajax({
            url: "http://127.0.0.1:3001/optiondelete",
            type: 'POST',
            async: false,
            data: {
                id: alternative['id']
            }
        });
    });
    $.ajax({
        url: "http://127.0.0.1:3001/questiondelete",
        type: 'POST',
        async: false,
        data: {
            id: question_id
        }
    });
    readQuestionsFromDatabase();
}

function getQuestionsByAxis() {
    let axes = getAxes();
    const questions = {};
    axes.forEach(axis => {
        questions[axis['id']] = []
    });

    $.ajax({
        //url do endpoint
        url: "http://127.0.0.1:3001/questions",
        //tipo da requisição
        type: 'GET',
        //se obtiver sucesso, executar a arrow function abaixo
        success: data => {
            //se não tiver questão no banco de dados, retorna um div do html com esse texto
            if (data.length == 0) {
            }
            //se tiver questão, limpa o questionsContainer
            else {
                data.forEach(question => {
                    if (question['axis_id'] in questions) {
                        questions[question['axis_id']].push(question);
                    }
                })
            }      //forEach faz loop que vai passar por cada elemento dentro do data
        }
    });
    return questions;
}

function showQuestionsByAxis() {
    let axesWithQuestions = getQuestionsByAxis();
    console.log(axesWithQuestions)
    console.log(axesWithQuestions['1'][0])
    Object.entries(axesWithQuestions).forEach(axis => {
        document.getElementById("questions-container-test").innerHTML += `<div class="accordion" id="${axis}Accordion">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#my${axis}" aria-expanded="true" aria-controls="my${axis}">
                ${getAxisFromId(axis)}
            </button>
          </h2>
          <div id="my${axis}" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div class="accordion-body" id="${axis}-body">
            </div>
          </div>
          </div>`
        let questionArray = axis[1];
        for (let i = 0; i < questionArray.length; i++) {
            console.log("im insde")
            console.log(questionArray[i])
        }
        questionArray.forEach(question => {
            console.log(question['text'])
            document.getElementById(`${axis}-body`).innerHTML += question;
        })
    })

}

function readQuestionsFromDatabase() {
    showQuestionsByAxis();
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
                    <h5>Questão ${element['position']} | Eixo ${getAxisFromId(element['axis_id'])}</h5>
                </div>
                <div class="col-sm-1">
                    <button type="button" id="trash${element['id']}" class="btn btn-primary trash" onclick="deleteQuestion(${element['id']})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                        </svg>
                    </button>
                </div>
                <div class="col-sm-1">
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal" onclick="updateEditModal(${element['id']})">
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
                <label class="form-check-label" for="flexRadioDefault1">${alternative['text']}</label>
                </div>`
                    })
                });
            }
        }

    });
}

function updateEditModal(question_id) {
    $('#edit-add-axis-span').hide();
    $('#edit-add-subaxis-span').hide();
    var question = null;
    $.ajax({
        url: "http://127.0.0.1:3001/questions",
        type: 'GET',
        async: false,
        success: data => {
            data.forEach(element => {
                if (parseInt(question_id) === parseInt(element['id'])) {
                    question = element;
                }
            })
        }

    })
    let axes = getAxes();
    axes.forEach(axis => {
        document.getElementById('edit-axis-dropdown').innerHTML += `<option value="${axis['name']}">${axis['name']}</option>`
    })
    $('#edit-axis-dropdown').val(getAxisFromId(question['axis_id']));
    let subdivisions = getModalSubdivisions((question['axis_id']));
    subdivisions.forEach(subdivision => {
        document.getElementById('edit-critical-factors').innerHTML += `<option value="${subdivision}">${subdivision}</option>`
    })
    $("#edit-question").val(question['text']);
    $("#edit-weight").val(question['weight']);
    alternatives = getAlternatives(question['id']);
    let current_count = 1
    alternatives.forEach(alternative => {
        $('#edit-alternative' + current_count).val(alternative['text']);
        $('#edit-alternativeweight' + current_count).val(alternative['weight']);
        current_count++;
    })
    let buttonFunction = `saveQuestionChanges(${question_id})`;
    $("#save-button").attr("onclick", buttonFunction);
   console.log("ok")
}



function getSubaxisFromId(id) {
    let subaxisName = '';
    $.ajax({
        url: "http://127.0.0.1:3001/axissubdivisions",
        type: 'GET',
        async: false,
        success: data => {
            data.forEach(element => {
                if (parseInt(id) === parseInt(element['id'])) {
                    subaxisName = element;
                }
            })
        }

    })
    return subaxisName;
}