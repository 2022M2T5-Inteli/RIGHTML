function contactUs() {
    window.location.href = "https://conteudo.falconi.com/formulario-home";
  }

  const ctx = document.getElementById('myChart');

  const myChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: [
        'Processo de ensino de aprendizagem',
        'Uso de tecnologias',
        'Formação das pessoas',
        'Número suficiente de escolas',
        'Políticas',
        '',
        ''
      ],
      datasets: [{
        label: 'Escola exemplo',
        data: [65, 48, 90, 81, 56, 55, 90],
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