function Question(question = "Este é o enunciado", axis = "equidade", 
    alternatives = ["A desenvolver", "Pouco desenvolvido", "Desenvolvimento intermediário", 
    "Desenvolvido", "Consolidado"]) {
    this.question = question;
    this.axis = axis;
    this.alternatives = alternatives
}

const questionsArray = [
        new Question("Disciplinas diversificadas aprovam ?", "Ensino", ["Não há diretriz padrão definida na rede" , " Há padrão de avaliações aplicadas na rede" ]),
        new Question("A secretária tem atendido às carências específicas da rede ?", "Pessoas", ["As carências específicas da rede não são atendidas" , "As carências específicas da rede são atendidas parcialmente" ,"As carências específicas da rede são totalmente atendidas" ] ),
        new Question("Como é o processo de acompanhamento da Secretaria no Censo Escolar ? ", "Fluxo", [" Não há processo de acompanhamento da Secretaria no Censo Escolar padronizado" , "Há processo de acompanhamento da Secretaria no Censo Escolar padronizado, mas não é efetivo", "Há processo de acompanhamento da Secretaria no Censo Escolar padronizado e efetivo" ]  ),
        new Question("O processo de enturmação considera a metragem das salas de aulas", "Infraestrutura e TI", ["Não é considerado a metragem das salas de aula no processo de enturmação", "O processo de enturmação  considera parcialmente a metragem das salas de aula", "O processo de enturmação considera totalmente a metragem das salas de aulas" ]),
        new Question(" Há suporte financeiro a alunos vulneráveis?", "Equidade", ["Não há suporte financeiro" , "Há suporte financeiro para alunos vulneráveis"])];

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