const diagnosisId = 5;

let axes = [];
//pega os eixos existentes no banco de dados
function getAxisLabels() {
  let axes = getAxes()
  let axesNames = [];
  axes.forEach(axis => {
    axesNames.push(axis['name'])
  })
  console.log(axesNames)
  return axesNames
}
//te envia para pagina da falconi
function contactUs() {
  window.location.href = "https://conteudo.falconi.com/formulario-home";
}
//estilo do grafico

//calcula sua nota na questao
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
  console.log(axesScores)
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
//mostra a alternativa marcada
function getAnswersByAxis(axis_id) {
  let answers = [];
  $.ajax({
    url: "http://127.0.0.1:1234/answers",
    type: 'GET',
    async: false,
    success: data => {
      data.forEach(answer => {
        if (answer["axis_id"] === axis_id) {
          answers.push(answer)
        }
      });
    }
  });
  return answers;
}
//pega o eixos do questionario escolhido
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
//pega o usuario que está sendop avaliado
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

//verifica se você tem permissão para estar na página
function getSessionData() {
  let loggedIn = localStorage.getItem("loggedIn")
  let userType = localStorage.getItem("table")
  let primaryKey = localStorage.getItem("primaryKey");

  if (loggedIn === 'true' && userType === "school_manager") {
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
//pega o nome da escola do usuario 
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
function onLoad() {
  getSessionData();
  loggedChecked();
  let results = getAxesScores();
  getAxisLabels();
  $("#gestaoPessoasNota").html(results[0])
  $("#sistemaGestaoNota").html(results[1])


}
//olha quem está logado na pagina
let logged = localStorage.getItem("loggedIn");
let headerLogged = document.getElementById("changeLink");
let userType = localStorage.getItem("table");
// console.log(userType)


//Verifica se o usuria já havia logado antes 
function loggedChecked() {
  if (logged === "true") {
    // console.log('logadoooo')

    if (userType === "school_manager") {
      // console.log('gestor escola user')
      headerLogged.innerHTML = `<a href="../schoolManagerDashboard/schoolManagerDashboard.html" class="nav-item nav-link" >Área do Gestor</a>`
    }

    else if (userType === "network_manager") {
      // console.log('gestor rede user')
      headerLogged.innerHTML = `<a href="../networkManagerDashboard/networkManagerDashboard.html" class="nav-item nav-link" >Área do Gestor</a>`
    }

    else if (userType === "employee") {
      // console.log('funcionario')
      headerLogged.innerHTML = `<a href="../adminDashboard.html" class="nav-item nav-link" >Área do Administrador </a>`
    }
  }
  else {

    headerLogged.innerHTML = `<a href="../login/login.html" class="nav-item nav-link" id="changeLink">Entrar</a>`
  }
}

