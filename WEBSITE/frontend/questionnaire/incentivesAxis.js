function Question(question = "Este é o enunciado", axis = "incentivos", 
    alternatives = ["A desenvolver", "Pouco desenvolvido", "Desenvolvimento intermediário", 
    "Desenvolvido", "Consolidado"]) {
    this.question = question;
    this.axis = axis;
    this.alternatives = alternatives
}

const questionsArray = [
    new Question("Os professores possuem programas de incentivo financeiro para alcance de resultados?"),
    new Question("Os professores possuem programas de incentivo não financeiro para alcance de resultados?"),
    new Question("Os demais servidores possuem programas de incentivo financeiro para alcance de resultados?"),
    new Question("Os alunos da rede possuem algum tipo de programa de incentivo para alcance de resultados?"),
    new Question("As escolas da rede possuem algum tipo de programa de incentivo para alcance de resultados?")];

function loadQuestions() {
    console.log("here")
    const questionsContainer = document.getElementById("questions-container")
    if (questionsArray.length === 0) {
        return questionsContainer.innerHTML = "Ainda não há questões neste questionário. Clique no + para adicionar uma.";
    }
    questionsContainer.innerHTML = "";
    for (let i = 0; i < questionsArray.length; i++) {
        let question = questionsArray[i];
        console.log(questionsArray);
        let index = questionsArray.indexOf(question, 0);
        let numberOfAlternatives = question.alternatives.length;
        console.log(question.alternatives)
        questionsContainer.innerHTML += `
        <div id="question${index + 1}">
            <div class="row question-header">
                <div class="col-sm-10">
                    <h5>Questão ${index + 1} | Eixo ${question.axis} </h5>
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