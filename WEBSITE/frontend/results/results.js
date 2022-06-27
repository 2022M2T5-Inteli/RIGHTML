// id do diagnóstico analisado
const diagnosisId = 4;

// variáveis para dados do usuário logado
var school = null;
var user = null;

// variável para guardar eixos
let axes = [];

//pega os nomes dos eixos existentes no banco de dados
function getAxisLabels() {
  let axes = getAxes()
  let axesNames = [];
  axes.forEach(axis => {
    axesNames.push(axis['name'])
  })
  return axesNames
}
// redireciona para a página da falconi
function contactUs() {
  window.location.href = "https://conteudo.falconi.com/formulario-home";
}

// configura gráfico
const ctx = document.getElementById('myChart');

const myChart = new Chart(ctx, {
  type: 'radar',
  data: {
    labels: getAxisLabels(),
    datasets: [{
      label: getSchoolName(),
      data: getAxesScores(),
      fill: true,
      backgroundColor: 'rgba(129, 13, 253, 0.2)',
      borderColor: 'rgb(129, 13, 253)',
      pointBackgroundColor: 'rgb(129, 13, 253)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgb(129, 13, 253)'
    }]
  },
  options: {
    elements: {
      line: {
        borderWidth: 2
      }
    }
  },
});

//calcula nota em cada eixo
function getAxesScores() {
  let axesScores = [];
  let axes = getAxes()
  axes.forEach(axis => {
    let soma = 0;
    let answers = getAnswersByAxis(axis['id']);
    answers.forEach(answer => {
      soma += getWeightAlternative(answer) * getWeightQuestion(answer)
    })
    axesScores.push(soma);
  });
  return axesScores;
}

//pega o peso da opção marcada
function getWeightAlternative(answer) {
  let chosenOption = null;
  let alternativeId = answer["option_id"]
  $.ajax({
    url: "http://127.0.0.1:1234/options",
    type: 'GET',
    async: false,
    success: data => {
      data.forEach(option => {
        if (option["id"] === alternativeId) {
          chosenOption = option['weight']
        }
      });
    }
  });
  return chosenOption;
}
//pega o peso da questão
function getWeightQuestion(answer) {
  let questionWeight = null;
  let questionId = answer["question_id"]
  $.ajax({
    url: "http://127.0.0.1:1234/questions",
    type: 'GET',
    async: false,
    success: data => {
      data.forEach(question => {
        if (question["id"] === questionId) {
          questionWeight = question['weight']
        }
      });
    }
  });
  return questionWeight;
}
// retorna as alternativas marcadas para certo eixo e escola
function getAnswersByAxis(axis_id) {
  getSessionData();
  let answers = [];
  $.ajax({
    url: "http://127.0.0.1:1234/answers",
    type: 'GET',
    async: false,
    success: data => {
      data.forEach(answer => {
        if (answer["axis_id"] === axis_id && answer['school_cnpj'] === school['cnpj']) {
          answers.push(answer)
        }
      });
    }
  });
  return answers;
}
//pega o eixos do questionário escolhido
function getAxes() {
  let axes = [];
  $.ajax({
    url: "http://127.0.0.1:1234/axes",
    type: 'GET',
    async: false,
    success: data => {
      data.forEach(axis => {
        if (axis["diagnosis_id"] === diagnosisId) {
          axes.push(axis)
        }
      });
    }
  });
  return axes;
}

//pega o usuário que está sendop avaliado
function getUser() {
  let cpf = localStorage.getItem("primaryKey");
  let user = null;
  $.ajax({
    url: "http://127.0.0.1:1234/schoolmanagers",
    type: 'GET',
    async: false,
    success: data => {
      data.forEach(schoolManager => {
        if (parseInt(schoolManager["cpf"]) === parseInt(cpf)) {
          user = schoolManager
        }
      });
    }
  });
  return user;
}
//verifica se você tem permissão para estar na página. Se sim, salva dados do usuário logado.
function getSessionData() {
  let loggedIn = localStorage.getItem("loggedIn")
  let userType = localStorage.getItem("table")
  let primaryKey = localStorage.getItem("primaryKey");

  if (loggedIn === 'true' && userType === "school_manager") {
    $.ajax({
      url: "http://127.0.0.1:1234/schoolmanagers",
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
      url: "http://127.0.0.1:1234/schools",
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
  }
  else {
    // alert("Você precisa se logar para ter acesso aos resultados")
    Swal.fire({
      icon: 'error',
      title: 'Você precisa se logar para ter acesso aos resultados',
    })
    window.location.href = "../login/login.html"
  }
}
//pega o nome da escola do usuário
function getSchoolName() {
  let user = getUser()
  let schoolName = null
  $.ajax({
    url: "http://127.0.0.1:1234/schools",
    type: 'GET',
    async: false,
    success: data => {
      data.forEach(school => {
        if (user["school_cnpj"] === school["cnpj"]) {
          schoolName = school["name"]
        }
      });
    }
  });
  return schoolName;
}


