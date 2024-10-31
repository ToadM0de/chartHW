const canvasRef = document.getElementById("chart");

let crittersFound = {};

let myChart = new Chart(canvasRef, {
  type: "bar",

  data: {},
});

async function getCrittersFound() {
  const crittersFoundRawData = await fetch(`/api/crittersfound`);
  const crittersFoundData = await crittersFoundRawData.json();

  crittersFound = {};
  for (let i = 0; i < crittersFoundData.crittersFound.length; i++) {
    const crittersName = crittersFoundData.crittersFound[i];
    crittersFound[crittersName] = crittersFound[crittersName] || 0;

    crittersFound[crittersName]++;
  }

  myChart.data.labels = Object.keys(crittersFound);
  myChart.data.datasets = [
    {
      label: "Critters Found",
      data: Object.values(crittersFound),
    },
  ];

  myChart.update();
}

getCrittersFound();

const allCharts = {
  bar: {
    name: "Bar",
    config: {
      type: "bar",

      data: {},

      options: {
        scales: {
          y: {
            min: 0,
            max: 20,
          },
        },
      },
    },
  },

  pie: {
    name: "Pie",
    config: {
      type: "pie",

      data: {},
    },
  },

  line: {
    name: "Line",
    config: {
      type: "line",

      data: {},
    },
  },
};

Object.values(allCharts).forEach(function (chart) {
  const newButton = document.createElement("button");

  newButton.innerHTML = `Show ${chart.name} Chart`;

  newButton.onclick = function () {
    console.log(chart.name);
    myChart.destroy();
    myChart = new Chart(canvasRef, chart.config);
    getCrittersFound();
  };

  document.querySelector("#chartButtons").appendChild(newButton);
});

function removeDatapoint() {
  myChart.data.labels.pop();
  myChart.update();
}

async function addDatapoint() {
  const labelValue = document.getElementById("label").value;

  function deleteDatapoint() {
    myChart.data.labels.splice();
    myChart.update();
  }

  await fetch(`/api/crittersfound/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ crittersName: labelValue }),
  });

  getCrittersFound();
}
