const questionsContainer = document.getElementById("questions-container");

const questionsArray = [
        new Question("Disciplinas diversificadas aprovam ?", "Ensino", ["Não há diretriz padrão definida na rede" , " Há padrão de avaliações aplicadas na rede" ]),
        new Question("A secretária tem atendido às carências específicas da rede ?", "Pessoas", ["As carências específicas da rede não são atendidas" , "As carências específicas da rede são atendidas parcialmente" ,"As carências específicas da rede são totalmente atendidas" ] ),
        new Question("Como é o processo de acompanhamento da Secretaria no Censo Escolar ? ", "Fluxo", [" Não há processo de acompanhamento da Secretaria no Censo Escolar padronizado" , "Há processo de acompanhamento da Secretaria no Censo Escolar padronizado, mas não é efetivo", "Há processo de acompanhamento da Secretaria no Censo Escolar padronizado e efetivo" ]  ),
        new Question("O processo de enturmação considera a metragem das salas de aulas", "Infraestrutura e TI", ["Não é considerado a metragem das salas de aula no processo de enturmação", "O processo de enturmação  considera parcialmente a metragem das salas de aula", "O processo de enturmação considera totalmente a metragem das salas de aulas" ])];

let currentEditModeQuestionIndex = null;

function Question(question = "Este é o enunciado", axis = "Este é o eixo", alternatives = ["A", "B", "C", "D", "E"]) {
    this.question = question;
    this.axis = axis;
    this.alternatives = alternatives
}

function addQuestion() {
    getQuestionData();
}

function displayQuestion(question) {
    document.getElementById("questions-placeholder").hidden = true;
    let index = questionsArray.indexOf(question, 0);
    let numberOfAlternatives = question.alternatives.length;
    questionsContainer.innerHTML += `
    <div id="question${index + 1}">
        <div class="row question-header">
            <div class="col-sm-10">
                <h5>Questão ${index + 1} | Eixo ${question.axis} </h5>
            </div>
            <div class="col-sm-1">
                <button type="button" class="btn btn-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                    </svg>
                </button>
            </div>
            <div class="col-sm-1">
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal">
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

        console.log(document.getElementById("question1"))
    }
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

function updateQuestions() {
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
    currentEditModeQuestionIndex =  questionIndex;
    let originalQuestion = questionsArray[questionIndex];
    const form = document.getElementById("editForm");
    form["question"].value = originalQuestion.question;
    form['axis'].value = originalQuestion.axis;
    let alternativeElements = document.querySelectorAll(".editableAlternatives");
    for (let i = 0; i < alternativeElements.length; i++) {
        document.querySelectorAll(".editableAlternatives")[i].value = originalQuestion.alternatives[i];
    }
}