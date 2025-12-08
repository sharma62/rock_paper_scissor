// === Variables ===
let playerScore = 0;
let compScore = localStorage.getItem("compScore") || 0;

const playerEl = document.getElementById("PlyerScore");
const computerEl = document.getElementById("compScore");
const choices = document.querySelectorAll(".choice");

playerEl.textContent = playerScore;
computerEl.textContent = compScore;

const winsAgainst = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

// Random choice
function randomChoice() {
  const options = Object.keys(winsAgainst);
  return options[Math.floor(Math.random() * options.length)];
}

// Winner logic
function getWinner(player, computer) {
  if (player === computer) return "draw";
  return winsAgainst[player] === computer ? "player" : "computer";
}

// Update scores
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

// Choice images
function getChoiceImage(choice) {
  const map = {
    rock: "./assets/rock.png",
    paper: "./assets/peper.png",
    scissors: "./assets/sciessor.png",
  };
  return map[choice] || " ";
}

// Main UI update
function updateUI(player, computer, winner) {
  document.querySelector(".choicer").classList.add("d-none");
  document.querySelector(".result").classList.remove("d-none");

  // Dynamic images
  const userChoice = document.querySelector(".userChoice");
  const pcChoice = document.querySelector(".pcChoice");

  userChoice.innerHTML = `<img src="${getChoiceImage(player)}" />`;
  pcChoice.innerHTML = `<img src="${getChoiceImage(computer)}"  />`;

  // Winner highlight
  const pc = document.querySelector(".pc");
  const user = document.querySelector(".user");
  const nextBtn = document.querySelector("#next");

  user.classList.remove("winnerBg");
  pc.classList.remove("winnerBg");

  if (winner === "player") {
    user.classList.add("winnerBg");
    nextBtn.classList.remove("d-none");
    nextBtn.addEventListener("click", handleNext);
  } else if (winner === "computer") {
    pc.classList.add("winnerBg");
  }

  // Status text
  const heading = document.querySelector(".status");
  heading.innerHTML =
    winner === "player"
      ? "You Win <br>Against PC"
      : winner === "computer"
      ? "You Lost <br>Against PC"
      : "TIE UP";

  // Play Again
  const playAgainBtn = document.querySelector(".play-again-btn");
  playAgainBtn.textContent =
    winner === "draw" ? "Replay" : "Play Again";
  playAgainBtn.onclick = playAgain;

  // Reset
  document.querySelector(".resetBtn").onclick = handleReset;
}

// Play Again
function playAgain() {
  document.querySelector(".result").classList.add("d-none");
  document.querySelector(".choicer").classList.remove("d-none");

  document.querySelector(".user").classList.remove("winnerBg");
  document.querySelector(".pc").classList.remove("winnerBg");
  document.getElementById('next').classList.add('d-none')
}

// Reset Scores
function handleReset() {
  document.querySelector(".score").classList.remove("d-none");
  document.querySelector(".result").classList.add("d-none");
  document.querySelector(".choicer").classList.remove("d-none");
  document.querySelector(".congratulation").classList.add("d-none");
  document.querySelector("#next").classList.add("d-none");

  localStorage.clear();
  playerScore = 0;
  compScore = 0;
  playerEl.textContent = 0;
  computerEl.textContent = 0;
}

// Hurray Screen
function handleNext() {
  document.querySelector(".congratulation").classList.remove("d-none");
  document.querySelector(".result").classList.add("d-none");
  document.querySelector(".score").classList.add("d-none");
}

// Player click handling
function getPlayerChoice() {
  choices.forEach((choice) => {
    choice.addEventListener("click", (e) => {
      const player = e.currentTarget.getAttribute("data-choice"); // FIXED
      const computer = randomChoice();
      const winner = getWinner(player, computer);

      updateUI(player, computer, winner);
      updateScores(winner);
    });
  });
}

getPlayerChoice();
