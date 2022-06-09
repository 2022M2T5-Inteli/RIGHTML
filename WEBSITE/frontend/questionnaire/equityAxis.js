
function readQuestionsFromDatabase() {
    $.ajax({
        url: "http://127.0.0.1:3001/questions",
        type: 'GET',
        success: data => {
                data.forEach(element => {
                    console.log("FUNCTION: " + (element['text']))
                    questionsContainer.innerHTML += `
                    <div id="question${element['position']}">
                        <div class="row question-header">
                            <div class="col-sm-10">
                                <h5>Questão ${element['position']}</h5>
                            </div>
                            
                        <div class="question-wording">
                            <p>${element['text']}</p>
                        </div>`;
                        let alternatives = getAlternatives(element['id']);
                        console.log("Meu enunciado é: " + element['text'] + "e minhas opções são: " + alternatives)
                        alternatives.forEach(alternative => {
                            questionsContainer.innerHTML +=
                    `<div class="form-check">
                    <input class="form-check-input" type="radio" name="question${element['position']}" id="flexRadioDefault1">
                    <label class="form-check-label" for="flexRadioDefault1">${alternative}</label>
                    </div>`
                  
                        
                        })
              
                });
        
            
        }

    });
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

// Essa função serve para inputar as questões respondidas no banco de dados  
$(document).ready(function() {
    $("#update_data").click(function () {
        let url = "http://127.0.0.1:3001/answerinsert";
        
        console.log("works")
        
        {  
            $.ajax({
                url: url,
                type: 'POST',
                data: {
                    cnpj: $('#CNPJ_key').val(),
                    number_of_employees: $('#update_employees_number').val(),
                    number_of_students: $('#update_students_number').val(),

                },
            })
        }});
    });

    function saveAnswers(question_id) {
        alternatives = [];
        $.ajax({
            url: "http://127.0.0.1:3001/answerinsert",
            type: 'POST',
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