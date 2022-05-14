function Question(question = "Este é o enunciado", axis = "equidade", 
    alternatives = ["A desenvolver", "Pouco desenvolvido", "Desenvolvimento intermediário", 
    "Desenvolvido", "Consolidado"]) {
    this.question = question;
    this.axis = axis;
    this.alternatives = alternatives
}

const questionsArray = [
    new Question("A Secretaria agrega indicadores socioeconômico nas análises de desempenho das escolas e regionais?"),
    new Question("Há metas para redução da desigualdade educacional?"),
    new Question("Há programas direcionados a escolas vulneráveis?"),
    new Question("Há remuneração diferenciada a professores que atuam nas escolas/regiões mais vulneráveis?"),
    new Question("Há suporte financeiro a alunos vulneráveis ?")];

function loadQuestions() {
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