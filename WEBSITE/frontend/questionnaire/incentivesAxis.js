let idOptions = [];
var axis = 1
let questionsName = [];
function readQuestionsFromDatabase() {
    $.ajax({
        url: "http://127.0.0.1:3001/questions",
        type: 'GET',
        success: data => {

            //Preciso encontrar uma forma de fazer com que um axis_id especifico mostre na página        

                data.forEach(element => {
                    questionsName.push(element)
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
                        alternatives.forEach(alternative => {
                            questionsContainer.innerHTML +=
                    `<div class="form-check">
                    <input class="form-check-input" type="radio" name="question${element['position']}" id="${alternative['id']}" value="${alternative['id']}" >
                    <label class="form-check-label" for="">${alternative['text']}</label>
                    </div>`
                  
                        
                        })
                        
                });
        console.log($('#2.axis_id'))
            
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
                    alternatives.push(element);  //com essa função estou puxando todos os dados da array 
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

 function saveAnswers(OPTION_ID,QUESTION_ID){
    let url = "http://127.0.0.1:3001/answerinsert";

    {
        $.ajax({
            url: url,
            type: 'POST',
            data :{
                option_id: OPTION_ID,
                question_id : QUESTION_ID,

            }
            
        })
    }

 }

 function testePraDescobrir(){
    /* id="${alternative['id']}"
    let alternatives = getAlternatives(element['id']); */
    var valoresSelecionados = [];
    questionsName.forEach(question=>{
        
       var selected = $(`input[name="question${question.position}"]:checked`).val();
        question.selectedvalue = selected
        valoresSelecionados.push(question)
        saveAnswers(selected,question.id)

    })
    
   
    /* var dale =$('input[id="alternatives['id']:checked').val(); */
    
     }