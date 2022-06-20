function readQuestionsFromDatabase() {
    if (questionsExist()) {
        document.getElementById("questions-container").innerHTML = '';
        createAxisAccordions("questions-container");
        showQuestionsByAxis();
    } else {
        document.getElementById("questions-container").innerHTML = `
            <div id = "questions-placeholder"> Ainda não há questões neste questionário.</div>`;
    }

}

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

let loadedQuestions = [];

function showQuestionsByAxis() {
    loadedQuestions = [];
    let axes = getAxes()
    axes.forEach(axis => {
        let subdivisions = getSubdivisionsFromAxisId(axis['id']);
        subdivisions.forEach(subdivision => {
            let questions = getQuestionsFromSubaxis(subdivision['id']);
            if (questions.length > 0) {
                document.getElementById(`${axis['name']}-body`).innerHTML += `<div class="axis-title-outer-styling">
      <div class="axis-title-inner-styling">
        <h4>${subdivision['name']}</h4>
      </div>
    </div>`;
                questions.forEach(question => {
                    document.getElementById(`${axis['name']}-body`).innerHTML += `
                            <div id = "question${question['id']}">
                            <p style="font-size:16px;">${question['text']}</p>`
                    loadedQuestions.push(question)
                    let alternatives = getAlternatives(question['id']);
                    alternatives.forEach(alternative => {
                        document.getElementById(`${axis['name']}-body`).innerHTML +=
                            `<div class="form-check">
                             <input class="form-check-input" type="radio" name="question${question['id']}" id="${alternative['id']}" value="${alternative['id']}">
                             <label class="form-check-label" for="flexRadioDefault1">${alternative['text']}</label>
                             </div>`
                    })
                    document.getElementById(`${axis['name']}-body`).innerHTML += `<input id="extra-info-${question['id']}" style="width:100%;margin: 10px 0;;" placeholder="Mais informações"></input>`
                        document.getElementById(`${axis['name']}-body`).innerHTML += "</div><hr>";
                });
            }
            ;
            document.getElementById(`${axis['name']}-body`).innerHTML += "<br>";
        });
    })
};

function getAxes() {
    var axes = [];
    $.ajax({
        url: "http://127.0.0.1:3001/axes",
        type: 'GET',
        async: false,
        success: data => {
            data.forEach(element => {
                if (parseInt(element['diagnosis_id']) === 5) {
                    axes.push(element);
                }
            });
        }
    });
    return axes;
}

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

let user = null;
let school = null;

function getSessionData() {
    let primaryKey = localStorage.getItem("primaryKey");
    let table = localStorage.getItem("table");
    user = null;
    school = null;
    if (table === "school_manager") {
        $.ajax({
            url: "http://127.0.0.1:3001/schoolmanagers",
            type: 'GET',
            async: false,
            success: data => {
                data.forEach(school_manager => {
                    if (parseInt(primaryKey) === parseInt(school_manager['cpf'])) {
                        user = school_manager;
                    }
                })
            }
        })
        $.ajax({
            url: "http://127.0.0.1:3001/schools",
            type: 'GET',
            async: false,
            success: data => {
                data.forEach(currentSchool => {
                    if (parseInt(user['school_cnpj']) === parseInt(currentSchool['cnpj'])) {
                        school = currentSchool;
                    }
                })
            }
        })
        console.log(school)
    } else {
        alert("Entre em uma conta de gestor escolar para continuar.")
    }
}

function saveAnswers() {
    getSessionData()
    loadedQuestions.forEach(answeredQuestion => {
        console.log(answeredQuestion)
        let chosen_alternative_id = document.querySelector(`input[name=question${answeredQuestion['id']}]:checked`).value
        $.ajax({
            url: "http://127.0.0.1:3001/answerinsert",
            type: 'POST',
            async: false,
            data: {
                extra_info: $(`#extra-info-${answeredQuestion['id']}`).val(),
                option_id: chosen_alternative_id,
                question_id: answeredQuestion['id'],
                axis_subdivision_id: answeredQuestion['axis_subdivision_id'],
                axis_id: answeredQuestion['axis_id'],
                diagnosis_id: 5,
                school_cnpj: school['cnpj'],
                network_id: school['network_id']
            }
        });
    })
}
