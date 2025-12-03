// === Variables ===
let playerScore = 0;
let compScore = localStorage.getItem("compScore") || 0;
const playerEl = document.getElementById("PlyerScore");
const computerEl = document.getElementById("compScore");
const choices = document.querySelectorAll(".choice");
const body = document.querySelector("body");

playerEl.textContent = playerScore;
computerEl.textContent = compScore;

const winsAgainst = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};
//  choice randomly
function randomChoice() {
  const options = Object.keys(winsAgainst);
  return options[Math.floor(Math.random() * options.length)];
}
// who wins
function getWinner(player, computer) {
  if (player === computer) return "draw";
  return winsAgainst[player] === computer ? "player" : "computer";
}
// update scores
function updateScores(winner) {
  if (winner === "player") {
    playerScore++;
    localStorage.setItem("playerScore", playerScore);
  } else if (winner === "computer") {
    compScore++;
    localStorage.setItem("compScore", compScore);
  }
  playerEl.textContent = playerScore;
  computerEl.textContent = compScore;
}
// get emoji according to choice
function getChoiceEmoji(choice) {
  const map = { rock: "✊", paper: "✋", scissors: "✌️" };
  return map[choice] || "❓";
}

// button factory
function createButton(text, handler, className) {
  const btn = document.createElement("button");
  btn.textContent = text;
  btn.classList.add(className);
  btn.setAttribute("type", "button");
  Object.assign(btn.style, {
    padding: "8px 10px",
    borderRadius: "5px",
    cursor: "pointer",
  });
  btn.addEventListener("click", handler);
  return btn;
}

// Main Game UI
function updateUI(player, computer, winner) {
  console.log("Player", player);
  console.log("pc", computer);
  console.log("winner", winner);

  const choicer = document.querySelector(".choicer");
  choicer.classList.add("d-none");

  const result = document.querySelector(".result");
  result.classList.remove("d-none");

  //next btn active
  const nextBtn = document.querySelector("#next");

  //Show dynamic choices
  const userChoice = document.querySelector(".userChoice");
  userChoice.textContent = getChoiceEmoji(player);
  const pcChoice = document.querySelector(".pcChoice");
  pcChoice.textContent = getChoiceEmoji(computer);
  //who wins
  const pc = document.querySelector(".pc");
  const user = document.querySelector(".user");
  if (winner == "player") {
    user.classList.add("winnerBg");
    nextBtn.classList.remove("d-none"); //user win btn active
    nextBtn.addEventListener("click", handleNext);
  } else if (winner == "computer") {
    pc.classList.add("winnerBg");
  }
  // divInfo area
  const heading = document.querySelector(".status");
  heading.innerHTML =
    winner === "player"
      ? "You Win <br>Against PC"
      : winner === "computer"
      ? "You Lost <br>Against PC"
      : "TIE UP";
  // playAgain Btn
  const playAgainBtn = document.querySelector(".play-again-btn");
  playAgainBtn.textContent =
    winner == "player" || winner == "computer" ? "Play Again" : "Replay";
  playAgainBtn.addEventListener("click", playAgain);
  // congratulation
  document.querySelector('.resetBtn').addEventListener('click',handleReset)

}
//  Play Again
function playAgain() {
  // Hide result, show choice screen again
  document.querySelector(".result").classList.add("d-none");
  document.querySelector(".choicer").classList.remove("d-none");

  // Remove any winner background
  document.querySelector(".user").classList.remove("winnerBg");
  document.querySelector(".pc").classList.remove("winnerBg");
}
function handleReset() {
  // show score 
  document.querySelector(".score").classList.remove("d-none");
  // Hide result, show choice screen again
  document.querySelector(".result").classList.add("d-none");
  document.querySelector(".choicer").classList.remove("d-none");
  
  // Remove any winner background
  document.querySelector(".user").classList.remove("winnerBg");
  document.querySelector(".pc").classList.remove("winnerBg");
  
  // Hide congratulation, show choice screen again
  document.querySelector(".congratulation").classList.add("d-none");
  
  // Hide next btn
  document.querySelector("#next").classList.add("d-none");

localStorage.clear()
playerScore = 0;
compScore = 0;
playerEl.textContent = 0;
computerEl.textContent = 0;

}

//  Next Screen
function handleNext() {
  document.querySelector(".congratulation").classList.remove("d-none");
  document.querySelector(".result").classList.add("d-none");
  document.querySelector(".score").classList.add("d-none");
}

// Player Choice Handling
function getPlayerChoice() {
  choices.forEach((choice) => {
    choice.addEventListener("click", (e) => {
      const player = e.target.getAttribute("data-choice");
      const computer = randomChoice();
      const winner = getWinner(player, computer);

      updateUI(player, computer, winner);

      updateScores(winner);
    });
  });
}

getPlayerChoice();
