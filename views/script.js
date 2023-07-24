let game = {
  id: 0,
  correct: 0,
  wrong: 0,
  total: 0,
  qn: null,
  active: true,
  ids: [],
};

document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("submit").addEventListener("click", () => {
    document.getElementsByClassName("reg")[0].style.display = "none";
    document.getElementsByClassName("contentt")[0].style.display = "block";

    let name = document.getElementById("name").value
    let clas = document.getElementById("clas").value
    console.log({
        name: name,
        class: clas
    })
    listenTo();
  });
});

function listenTo() {
  updateQn();
  const submitBtn = document.getElementById("submit-btn");
  const resultDiv = document.getElementById("result");
  submitBtn.addEventListener("click", () => {
    document.getElementById("submit-btn").disabled = true;
    console.log("Disabled button!");
    if (game.active == true) {
      let answer = document
        .getElementsByName("q1")[0]
        .value.trim()
        .toLowerCase();
      if (
        game.qn.answer.toLowerCase() == answer ||
        game.qn.answer.toLowerCase().includes(answer) ||
        answer.includes(game.qn.answer.toLowerCase())
      ) {
        game.correct++;
      } else {
        game.wrong++;
      }
      game.total++;
    }
    if (game.id == 5) {
      document.getElementsByName("q1")[0].disabled = true;
      //End
    } else {
      updateQn();
    }
    document.getElementsByName("q1")[0].value = "";
    updateBar();
    const resultText = `You scored ${game.correct} out of 5.`;
    game.active = false;
    resultDiv.innerText = resultText;
  });
}

async function updateQn(params) {
  let e = await fetch("http://localhost:3000/genqn").then((response) => {
    if (!response.ok) return console.log(response.statusText);
    response.json().then((data) => {
      if (game.ids.includes(data.index)) return updateQn();
      game.ids.push(data.index);
      game.active = true;
      document.getElementById("submit-btn").disabled = false;
      game.id++;
      console.log(data);
      document.getElementById("qn").innerText = `${game.id}. ` + data.question;
      game.qn = data;
      game.active = true;
    });
  });
}

function updateBar() {
  let percentW = Math.round((game.correct / game.total) * 100);
  document.getElementById("progress-bar-fill").style.width = `${percentW}%`;
}
