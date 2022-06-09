
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
                        </div>`
                    
              
                });
        
            
        }

    });
}



