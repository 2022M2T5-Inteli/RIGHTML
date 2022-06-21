const diagnosisId = 4;

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
      label: 'Escola exemplo',
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
          questionWeight =  question['weight']
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

  function getSessionData(){
    let loggedIn = localStorage.getItem("loggedIn")
    let userType = localStorage.getItem("table")
    let primaryKey = localStorage.getItem("primaryKey");

    if(loggedIn === true && userType==="school_manager"){
       console.log("logado")
    }
  }


  function onLoad(){
    console.log(getSessionData())
  }

