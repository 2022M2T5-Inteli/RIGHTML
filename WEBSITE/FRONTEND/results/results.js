const diagnosisId = 5;

let axes = [];

function getAxisLabels() {
  let axes = getAxes()
  let axesNames = [];
  axes.forEach(axis => {
    axesNames.push(axis['name'])
  })
  return axesNames
}

function contactUs() {
  window.location.href = "https://conteudo.falconi.com/formulario-home";
}

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

function getWeightAlternative(answer) {
  let chosenOption = null;
  let alternativeId = answer["option_id"]
  $.ajax({
    url: "http://127.0.0.1:3001/options",
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

function getWeightQuestion(answer) {
  let questionWeight = null;
  let questionId = answer["question_id"]
  $.ajax({
    url: "http://127.0.0.1:3001/questions",
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

function getAnswersByAxis(axis_id) {
  let answers = [];
  $.ajax({
    url: "http://127.0.0.1:3001/answers",
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

function getAxes() {
  let axes = [];
  $.ajax({
    url: "http://127.0.0.1:3001/axes",
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

function getUser() {
  let cpf = localStorage.getItem("primaryKey");
  let user = null;
  $.ajax({
    url: "http://127.0.0.1:3001/schoolmanagers",
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
function getSessionData() {
  let loggedIn = localStorage.getItem("loggedIn")
  let userType = localStorage.getItem("table")
  let primaryKey = localStorage.getItem("primaryKey");

  if (loggedIn === 'true' && userType === "school_manager") {
  }
  else {
    alert("Você precisa se logar para ter acesso aos resultados")
    window.location.href = "../login/login.html"
  }
}

function getSchoolName() {
  let user = getUser()
  let schoolName = null
  $.ajax({
    url: "http://127.0.0.1:3001/schools",
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

}

let logged = localStorage.getItem("loggedIn");
let headerLogged = document.getElementById("changeLink");
let userType = localStorage.getItem("table");
console.log(userType)


//Verifica se o usuria já havia logado antes 
function loggedChecked() {
  if (logged === "true") {
    console.log('logadoooo')
    // headerLogged.innerHTML = `<a href="./login/login.html" class="nav-item nav-link" id="changeLink">Logadao</a>`
    if (userType === "school_manager") {
      console.log('gestor escola user')
      headerLogged.innerHTML = `<a href="../schoolManagerDashboard/schoolManagerDashboard.html" class="nav-item nav-link" >Área do Gestor</a>`
    }

    else if (userType === "network_manager") {
      console.log('gestor rede user')
      headerLogged.innerHTML = `<a href="../networkManagerDashboard/networkManagerDashboard.html" class="nav-item nav-link" >Área do Gestor</a>`
    }

    else if (userType === "employee") {
      console.log('funcionario')
      headerLogged.innerHTML = `<a href="../adminDashboard.html" class="nav-item nav-link" >Área do Administrador </a>`
    }
  }
  else {

    headerLogged.innerHTML = `<a href="../login/login.html" class="nav-item nav-link" id="changeLink">Entrar</a>`
  }
}

