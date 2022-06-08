

// Essa função serve para atualizar os dados da escola no banco de dados 
$(document).ready(function() {
    $("#update_data").click(function () {
        let url = "http://127.0.0.1:3001/schoolupdate";
        
        console.log("works")
        
        {  
            $.ajax({
                url: url,
                type: 'POST',
                data: {
                    cnpj: $('#CNPJ_key').val(),
                    number_of_employees: $('#update_employees_number').val(),
                    number_of_students: $('#update_students_number').val(),
                    name: $('#name_update').val(),

                },
            })
        }});
    });

   