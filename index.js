import { QUESTIONS } from "./API/questions.js";
const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");
const MIN = 1;
const MAX = 50;
let numeroRandom1 = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;
let numeroRandom2 = numeroRandom1 + 10;

if (numeroRandom1 >= 40) {
  numeroRandom1 = 40;
  numeroRandom2 = 50;
}

const randomQuestions = QUESTIONS.slice(numeroRandom1, numeroRandom2);

function buildQuiz() {
  const output = [];

  randomQuestions.forEach((currentQuestion, questionNumber) => {
    const answers = [];
    for (let letter in currentQuestion.answers) {
      answers.push(
        `
          <label>
            <input
              type="radio"
              name="question${questionNumber}" 
              value="${letter}"
            >
              ${letter} :
              ${currentQuestion.answers[letter]}
          </label>
        `
      );
    }
    output.push(
      `
        <div class="question">
          <span class="question-span">${questionNumber + 1}.-</span>
          <span class="question-p">${currentQuestion.question}</span>
        </div>
        <div class="answers">
          ${answers.join("")}
        </div>
      `
    );
  });

  quizContainer.innerHTML = output.join("");
}

function showResults() {
  const answerContainers = quizContainer.querySelectorAll(".answers");
  let numCorrect = 0;

  randomQuestions.forEach((currentQuestion, questionNumber) => {
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    if (userAnswer === currentQuestion.correctAnswer) {
      numCorrect++;
      answerContainers[questionNumber].style.color = "green";
    } else {
      answerContainers[questionNumber].style.color = "red";
    }
  });

  resultsContainer.innerHTML = `Puntuación: ${numCorrect} de ${randomQuestions.length}`;
  submitButton.style.display = "none";
  const retryButton = document.createElement("button");
  retryButton.innerText = "Repetir Test";

  retryButton.addEventListener("click", () => {
    window.scrollTo(0, 0);
    location.reload();
  });

  resultsContainer.appendChild(retryButton);
}

buildQuiz();

submitButton.addEventListener("click", showResults);

