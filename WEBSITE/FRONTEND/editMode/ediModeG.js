// Carregar questões ao carregar a página
function onload() {
    readQuestionsFromDatabase();
}

// Constante id do diagnosses
 const diagnosisid = 5;


// Reinicia modal de adicionar questões
function addModal() {
    // Deixa dropdowns em branco
    $('#axis-dropdown').val('')
    $('#domain').val('')

    // Deixa alternativas em branco
    $('#alternative1').val('')
    $('#alternative2').val('')
    $('#alternative3').val('')
    $('#alternative4').val('')
    $('#alternative5').val('')

    // Deixa pesos em branco
    $('#weight').val('');
    $('#alternativeweight1').val('')
    $('#alternativeweight2').val('')
    $('#alternativeweight3').val('')
    $('#alternativeweight4').val('')
    $('#alternativeweight5').val('')

    // Deixar campo de enunciado em branco
    $("#question").val('');

    // Esconde botão de deletar eixo subeixo e campos de adicionar eixo e subeixo
    $("#delete-axis").hide();
    $("#delete-subaxis").hide();
    $("#add-axis-span").hide();
    $("#add-subaxis-span").hide();
    updateAddModalDropdowns();

}

// Atualiza dropdowns do modal de adicionar questão
function updateAddModalDropdowns() {
    let axes = getAxes();
    document.getElementById('axis-dropdown').innerHTML = "<option value='' disabled selected>Escolher...</option>";
    axes.forEach(axis => {
        document.getElementById('axis-dropdown').innerHTML += `<option value="${axis['name']}">${axis['name']}</option>`
    })
    document.getElementById('domain').innerHTML = "<option value='' disabled selected>Escolher...</option>";


}



// Salva nova questão no modal de adicionar questões
function saveQuestion() {
    if ($('#domain').val() === null || $('domain').val() === null) {
        alert("Escolha um eixo e fator crítico para adicionar a questão.");
    } else if ($('#question').val() === '') {
        alert("Preencha o enunciado da questão para continuar.");
    } else if ($('#weight').val() === '') {
        alert("Preencha o peso da questão para continuar.");
    } else if (($('#alternative1').val() != '' && $('#alternativeweight1').val() === '') ||
        ($('#alternative2').val() != '' && $('#alternativeweight2').val() === '') ||
        ($('#alternative3').val() != '' && $('#alternativeweight3').val() === '') ||
        ($('#alternative4').val() != '' && $('#alternativeweight4').val() === '') ||
        ($('#alternative5').val() != '' && $('#alternativeweight5').val() === '')) {
        alert("Preencha os pesos das alternativas para adicionar a questão.");
    } else {
        $.ajax({
            url: "http://127.0.0.1:3001/questioninsert",
            type: 'POST',
            async: false,
            data: {
                weight: parseInt($("#weight").val()),
                text: $("#question").val(),
                axis_subdivision_id: findSubdivisionIDFromName($('#domain').val()),
                axis_id: getAxisIdFromName($('#axis-dropdown').val()),
                diagnosis_id: diagnosisid
            }
        });
        let lastId = getLastQuestionId()
        saveAlternatives(lastId);
        readQuestionsFromDatabase();
        $('#addModal').modal('toggle');

    }
}

function saveQuestionChanges(question_id) {
    if ($('#edit-domain').val() === null || $('#edit-domain').val() === null) {
        alert("Escolha um eixo e fator crítico para salvar a questão.");
    } else if ($('#edit-question').val() === '') {
        alert("Preencha o enunciado da questão para continuar.");
    } else if ($('#edit-weight').val() === '') {
        alert("Preencha o peso da questão para continuar.");
    } else if (($('#edit-alternative1').val() != '' && $('#edit-alternativeweight1').val() === '') ||
        ($('#edit-alternative2').val() != '' && $('#edit-alternativeweight2').val() === '') ||
        ($('#edit-alternative3').val() != '' && $('#edit-alternativeweight3').val() === '') ||
        ($('#edit-alternative4').val() != '' && $('#edit-alternativeweight4').val() === '') ||
        ($('#edit-alternative5').val() != '' && $('#edit-alternativeweight5').val() === '')) {
        alert("Preencha os pesos das alternativas para salvar a questão.");
    } else {
        $.ajax({
            url: "http://127.0.0.1:3001/questionupdate",
            type: 'POST',
            async: false,
            data: {
                id: question_id,
                weight: parseInt($("#edit-weight").val()),
                text: $("#edit-question").val(),
                axis_subdivision_id: findSubdivisionIDFromName($('#edit-domain').val()),
                axis_id: getAxisIdFromName($('#edit-axis-dropdown').val()),
                diagnosis_id: diagnosisid
            }
        });
        saveAlternativeChanges(question_id);
        readQuestionsFromDatabase();
        $('#editModal').modal('toggle');
    }
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

let domain = [];

function getSubdivisionsFromAxisId(axis_id) {
    subdivisions = [];
    $.ajax({
        url: "http://127.0.0.1:3001/axissubdivisions",
        type: 'GET',
        async: false,
        success: data => {
            data.forEach(element => {
                if (parseInt(axis_id) === (element['axis_id'])) {
                    subdivisions.push(element)
                }
            });
        }
    });
    return subdivisions;
}

$("#axis-dropdown").change(function () {
    if ($("#axis-dropdown").val() === "") {
        $("#delete-axis").hide();
    } else {
        $("#delete-axis").show();
        let subdivisions = getSubdivisionsFromAxisId(getAxisIdFromName($("#axis-dropdown").val()));
        document.getElementById('domain').innerHTML = "<option value='' disabled selected>Escolher...</option>";
        subdivisions.forEach(subdivision => {
            document.getElementById('domain').innerHTML += `<option value="${subdivision['name']}">${subdivision['name']}</option>`
        })
    }
});


$("#domain").change(function () {
    if ($("#domain").val() === "") {
        $("#delete-subaxis").hide();
    } else {
        $("#delete-subaxis").show();
    }
});

$("#edit-axis-dropdown").change(function () {
    if ($("#edit-axis-dropdown").val() === "") {
        $("#edit-delete-axis").hide();
    } else {
        let subdivisions = getSubdivisionsFromAxisId(getAxisIdFromName($("#edit-axis-dropdown").val()));
        document.getElementById('edit-domain').innerHTML = "<option value='' disabled selected>Escolher...</option>";
        subdivisions.forEach(subdivision => {
            document.getElementById('edit-domain').innerHTML += `<option value="${subdivision}">${subdivision}</option>`
        })
    }
});


function findSubdivisionIDFromName(name) {
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
                    axis_subdivision_id: findSubdivisionIDFromName($('#domain').val()),
                    axis_id: getAxisIdFromName($('#axis-dropdown').val()),
                    diagnosis_id: diagnosisid
                }
            });
        }
    }
}

function saveAlternativeChanges(question_id) {
    original_alternatives = getAlternatives(question_id);
    for (let i = 0; i < original_alternatives.length; i++) {
        $.ajax({
            url: "http://127.0.0.1:3001/optiondelete",
            type: 'POST',
            async: false,
            data: {
                id: original_alternatives[i]['id'],
            }
        });
    }
    let currentPosition = 1;
    for (let i = 1; i <= 5; i++) {
        if ($("#edit-alternative" + i).val() != "") {
            $.ajax({
                url: "http://127.0.0.1:3001/optioninsert",
                type: 'POST',
                async: false,
                data: {
                    weight: $("#edit-alternativeweight" + i).val(),
                    text: $("#edit-alternative" + i).val(),
                    question_id: question_id,
                    position: currentPosition,
                    axis_subdivision_id: findSubdivisionIDFromName($('#edit-domain').val()),
                    axis_id: getAxisIdFromName($('#edit-axis-dropdown').val()),
                    diagnosis_id: diagnosisid
                }
            });
            currentPosition++;
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

function deleteAxis(axis_id) {
    if ($('#axis-dropdown').val() != '') {
        let questions = getAllQuestionsFromAxis(axis_id);
        questions.forEach(question => {
            deleteQuestion(question['id']);
        });
        let subaxes = getSubdivisionsFromAxisId(axis_id);
        subaxes.forEach(subaxis => {
            deleteSubaxis(subaxis['id'])
        })
        $.ajax({
            url: "http://127.0.0.1:3001/axisdelete",
            type: 'POST',
            async: false,
            data: {
                id: axis_id
            }
        });


    }
}


$('#delete-axis').on('click', function (event) {
    if ($("#axis-dropdown").val() != '' &&
        confirm("Tem certeza de que deseja deletar este eixo? Todas as questões associadas a ele (inclusive esta) serão excluídas.")) {
        let axis_id = getAxisIdFromName($("#axis-dropdown").val());
        deleteAxis(axis_id)
        readQuestionsFromDatabase();
        updateAddModalDropdowns();
        $("#domain").val("");
        document.getElementById('domain').innerHTML = "<option value='' disabled selected>Escolher...</option>";
        $('#delete-axis').hide();
    } else if ($("#axis-dropdown").val() === '' || $("#axis-dropdown").val() === null) {
        alert("Selecione um fator crítico no dropdown para deletá-lo.")
    }
});


$('#delete-subaxis').on('click', function (event) {
    if ($("#domain").val() != '' &&
        confirm("Tem certeza de que deseja deletar este fator crítico? Todas as questões associadas a ele (inclusive esta) serão excluídas.")) {
        let currentAxis = $("#axis-dropdown").val();
        let subaxis_id = getSubaxisIdFromName($("#domain").val());
        let questions = getQuestionsFromSubaxis(subaxis_id);
        questions.forEach(question => {
            deleteQuestion(question['id']);
        })
        deleteSubaxis(subaxis_id)
        readQuestionsFromDatabase();
        updateAddModalDropdowns();
        $("#axis-dropdown").val(currentAxis);
        $("#domain").val("");

        document.getElementById('domain').innerHTML = "<option value='' disabled selected>Escolher...</option>";
    } else if ($("#domain").val() === '' || $("#domain").val() === null) {
        alert("Selecione um fator crítico no dropdown para deletá-lo.")
    }
});

function deleteSubaxis(subaxis_id) {
    $.ajax({
        url: "http://127.0.0.1:3001/axissubdivisiondelete",
        type: 'POST',
        async: false,
        data: {
            id: subaxis_id
        }
    });
}


$('#edit-delete-subaxis').on('click', function (event) {
    if ($("#edit-domain").val() != '' &&
        confirm("Tem certeza de que deseja deletar este fator crítico? Todas as questões associadas a ele (inclusive esta) serão excluídas.")) {
        console.log("insde")
        let subaxis_id = getSubaxisIdFromName($("#edit-domain").val());
        let questions = getQuestionsFromSubaxis(subaxis_id);
        questions.forEach(question => {
            deleteQuestion(question['id']);
        })
        deleteSubaxis(subaxis_id)
        readQuestionsFromDatabase();
        $('#editModal').modal('toggle');

    } else if ($("#edit-domain").val() === '' || $("#edit-domain").val() === null) {
        alert("Selecione um eixo no dropdown para deletá-lo.")
    }
});

$('#edit-delete-axis').on('click', function (event) {
    if ($("#edit-axis-dropdown").val() != '' &&
        confirm("Tem certeza de que deseja deletar este eixo? Todas as questões associadas a ele (inclusive esta) serão excluídas.")) {
        let axis_id = getAxisIdFromName($("#edit-axis-dropdown").val());
        deleteAxis(axis_id)
        readQuestionsFromDatabase();
        updateAddModalDropdowns();
        $('#editModal').modal('toggle');
    } else if ($("#edit-axis-dropdown").val() === '' || $("#edit-axis-dropdown").val() === null) {
        alert("Selecione um eixo no dropdown para deletá-lo.")
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
            diagnosis_id: diagnosisid,
        }
    });
    $('#add-axis-input').val("");
    $('#add-axis-span').hide();
    updateAddModalDropdowns();
    $('#axis-dropdown').val(axis_name);
    $('#delete-axis').show();
});

$('#edit-save-axis').on('click', function (event) {
    let axis_name = $('#edit-add-axis-input').val();
    $.ajax({
        url: "http://127.0.0.1:3001/axisinsert",
        type: 'POST',
        async: false,
        data: {
            name: axis_name,
            diagnosis_id: diagnosisid,
        }
    });
    $('#edit-add-axis-input').val("");
    $('#edit-add-axis-span').hide();
    addModal();
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

function getSubaxisIdFromName(name) {
    console.log("subaxis name: " + name)
    let id = -1;
    $.ajax({
        url: "http://127.0.0.1:3001/axissubdivisions",
        type: 'GET',
        async: false,
        success: data => {
            data.forEach(subaxis => {
                console.log("this subaxis: " + subaxis)
                if (name === subaxis['name']) {
                    id = subaxis['id']
                }
            });
        }
    });
    return id

}

$('#save-subaxis').on('click', function (event) {
    let axis = $("#axis-dropdown").val();
    if ($("#axis-dropdown").val() === '' || $("#axis-dropdown").val() === null) {
        return alert("Selecione um eixo para adicionar um fator crítico");
    }
    let subaxis_name = $('#add-subaxis-input').val();
    $.ajax({
        url: "http://127.0.0.1:3001/axissubdivisioninsert",
        type: 'POST',
        async: false,
        data: {
            name: subaxis_name,
            axis_id: getAxisIdFromName(axis),
            diagnosis_id: diagnosisid,
        }
    });
    $('#add-subaxis-input').val("");
    $('#add-subaxis-span').hide();
    let subdivisions = getSubdivisionsFromAxisId(getAxisIdFromName(axis));
    document.getElementById('domain').innerHTML = "<option value='' disabled selected>Escolher...</option>";
    subdivisions.forEach(subdivision => {
        document.getElementById('domain').innerHTML += `<option value="${subdivision['name']}">${subdivision['name']}</option>`
    })
    $('#domain').val(subaxis_name)
    $('#axis-dropdown').val(axis)
    $('#delete-subaxis').show();
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
            diagnosis_id: diagnosisid,
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

function getAnswers(question_id) {
    let answers = [];
    $.ajax({
        url: "http://127.0.0.1:3001/answerS",
        type: 'GET',
        async: false,
        success: data => {
            data.forEach(answer => {
                if (parseInt(question_id) === parseInt(answer['question_id'])) {
                    answers.push(answer);
                }
            })
        }

    })
    return answers;
}

function deleteQuestion(question_id) {
    let answers = getAnswers(question_id);
    console.log(answers)
    answers.forEach(answer => {
        $.ajax({
            url: "http://127.0.0.1:3001/answerdelete",
            type: 'POST',
            async: false,
            data: {
                id: answer['id']
            }
        });
    })
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

function getQuestionsFromSubaxis(subaxis_id) {
    let questions = [];
    $.ajax({
        //url do endpoint
        url: "http://127.0.0.1:3001/questions",
        //tipo da requisição
        type: 'GET',
        async: false,
        //se obtiver sucesso, executar a arrow function abaixo
        success: data => {
            //se não tiver questão no banco de dados, retorna um div do html com esse texto
            data.forEach(question => {
                if (question['axis_subdivision_id'] === subaxis_id) {

                    questions.push(question);
                }
            })
        }      //forEach faz loop que vai passar por cada elemento dentro do data
    });
    return questions;
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

function getAllQuestionsFromAxis(axis_id) {
    questions = [];
    $.ajax({
        //url do endpoint
        url: "http://127.0.0.1:3001/questions",
        //tipo da requisição
        type: 'GET',
        async: false,
        //se obtiver sucesso, executar a arrow function abaixo
        success: data => {
            //se não tiver questão no banco de dados, retorna um div do html com esse texto
            //se tiver questão, limpa o questionsContainer
            data.forEach(question => {
                if (question['axis_id'] === axis_id) {
                    questions.push(question);
                }
            })    //forEach faz loop que vai passar por cada elemento dentro do data
        }
    });
    return questions;
}

function createAxisAccordions(container) {
    let axes = getAxes()
    axes.forEach(axis => {
        document.getElementById(`${container}`).innerHTML += `<div class="accordion" id="${axis['name']}Accordion">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target='#my${axis['name']}' aria-expanded="true" aria-controls="my${axis}">
                ${axis['name']}
            </button>
          </h2>
          <div id='my${axis['name']}' class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div class="accordion-body" id="${axis['name']}-body">
            </div>
          </div>
          </div>`
    })
}

function showQuestionsByAxis() {
    var questionNumber = 0;
    let axes = getAxes()
    axes.forEach(axis => {
        let subdivisions = getSubdivisionsFromAxisId(axis['id']);
        subdivisions.forEach(subdivision => {
            let questions = getQuestionsFromSubaxis(subdivision['id']);
            if (questions.length > 0) {
                document.getElementById(`${axis['name']}-body`).innerHTML += `<h4 class="yellow">${subdivision['name']}</h4>`;
                questions.forEach(question => {
                    document.getElementById(`${axis['name']}-body`).innerHTML += `
                <div id = "question${questionNumber}" >
                    <div class='row'>
                        <div class="col-sm-9">
                            <p style="font-size:16px;">${question['text']}</p>
                        </div>
                        <div class="col-sm-3">
                        </row>
                        <span>
                            <button type="button" id="trash${question['id']}" class="btn btn-light" onclick="deleteQuestion(${question['id']})">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                                </svg>
                            </button>
                            <button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#editModal" onclick="updateEditModal(${question['id']})">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                </svg>
                            </button>
                        </span>
                    </div>
            `
                    let alternatives = getAlternatives(question['id']);
                    alternatives.forEach(alternative => {
                        document.getElementById(`${axis['name']}-body`).innerHTML +=
                            `<div class="form-check">
                <input class="form-check-input" type="radio" name="question${question['id']}" id="flexRadioDefault1">
                    <label class="form-check-label" for="flexRadioDefault1">${alternative['text']}</label>
                </div>`
                    })
                    document.getElementById(`${axis['name']}-body`).innerHTML += "</div><hr>";
                });
                questionNumber++;
            }
            ;
            document.getElementById(`${axis['name']}-body`).innerHTML += "<br>";
        });
    })
};

function questionsExist() {
    let questionsExist = false;
    $.ajax({
        url: "http://127.0.0.1:3001/questions",
        type: 'GET',
        async: false,
        success: data => {
            if (data.length > 0) {
                questionsExist = true;
            }
        }

    })
    return questionsExist;
}

function readQuestionsFromDatabase() {
    if (questionsExist()) {
        document.getElementById("questions-container").innerHTML = '';
        createAxisAccordions("questions-container");
        showQuestionsByAxis();
    } else {
        document.getElementById("questions-container").innerHTML = `
                <div id = "questions-placeholder"> Ainda não há questões neste questionário. 
        Clique no + para adicionar.</div>`;
    }

}


function updateEditModal(question_id) {
    $('#edit-add-axis-span').hide();
    $('#edit-add-subaxis-span').hide();
    $("#delete-axis").show();
    $("#delete-subaxis").show();
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
        document.getElementById('edit-axis-dropdown').innerHTML += `<option value = "${axis['name']}" > ${axis['name']}</option> `
    })
    $('#edit-axis-dropdown').val(getAxisFromId(question['axis_id']));
    let subdivisions = getSubdivisionsFromAxisId((question['axis_id']));
    subdivisions.forEach(subdivision => {
        document.getElementById('edit-domain').innerHTML += `<option value = "${subdivision['name']}" > ${subdivision['name']}</option> `
    })
    $("#edit-question").val(question['text']);
    $("#edit-weight").val(question['weight']);

    for (let i = 1; i <= 5; i++) {
        $('#edit-alternative' + i).val('');
        $('#edit-alternativeweight' + i).val('');
    }

    alternatives = getAlternatives(question['id']);
    let current_count = 1
    alternatives.forEach(alternative => {
        $('#edit-alternative' + current_count).val(alternative['text']);
        $('#edit-alternativeweight' + current_count).val(alternative['weight']);
        current_count++;
    })
    let buttonFunction = `saveQuestionChanges(${question_id})`;
    $("#save-button").attr("onclick", buttonFunction);
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

