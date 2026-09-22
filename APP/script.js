const questions = [
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: ["var", "int", "string", "define"],
        answer: "var"
    },

    {
        question: "Which keyword allows you to declare a block-scoped variable?",
        options: ["var", "let", "define", "variable"],
        answer: "let"
    },

    {
        question: "Which keyword is used to declare a constant?",
        options: ["constant", "let", "const", "fixed"],
        answer: "const"
    },

    {
        question: "Which symbol is used for strict equality comparison?",
        options: ["==", "=", "===", "!="],
        answer: "==="
    },

    {
        question: "What is the result of typeof 'Hello'?",
        options: ["text", "String", "string", "char"],
        answer: "string"
    },

    {
        question: "Which method is used to add an element to the end of an array?",
        options: ["push()", "pop()", "shift()", "unshift()"],
        answer: "push()"
    },

    {
        question: "Which method removes the last element from an array?",
        options: ["remove()", "pop()", "delete()", "shift()"],
        answer: "pop()"
    },

    {
        question: "Which method removes the first element from an array?",
        options: ["pop()", "remove()", "shift()", "delete()"],
        answer: "shift()"
    },

    {
        question: "Which method adds an element to the beginning of an array?",
        options: ["push()", "shift()", "unshift()", "addFirst()"],
        answer: "unshift()"
    },

    {
        question: "Which function is used to print something in the browser console?",
        options: ["print()", "console.log()", "write()", "display()"],
        answer: "console.log()"
    },

    {
        question: "Which operator is used for logical AND?",
        options: ["||", "&&", "!", "&"],
        answer: "&&"
    },

    {
        question: "Which operator is used for logical OR?",
        options: ["&&", "||", "!", "|"],
        answer: "||"
    },

    {
        question: "Which operator is used for logical NOT?",
        options: ["!", "not", "!!", "~"],
        answer: "!"
    },

    {
        question: "Which method converts a JSON string into a JavaScript object?",
        options: [
            "JSON.parse()",
            "JSON.stringify()",
            "JSON.convert()",
            "JSON.object()"
        ],
        answer: "JSON.parse()"
    },

    {
        question: "Which method converts a JavaScript object into a JSON string?",
        options: [
            "JSON.parse()",
            "JSON.stringify()",
            "JSON.convert()",
            "JSON.toString()"
        ],
        answer: "JSON.stringify()"
    },

    {
        question: "Which keyword is used to define a function?",
        options: ["function", "func", "define", "method"],
        answer: "function"
    },

    {
        question: "Which property is used to find the length of a string?",
        options: ["size", "length", "count", "strlen()"],
        answer: "length"
    },

    {
        question: "Which method converts a string to uppercase?",
        options: [
            "upperCase()",
            "toUpperCase()",
            "uppercase()",
            "makeUpper()"
        ],
        answer: "toUpperCase()"
    },

    {
        question: "Which method converts a string to lowercase?",
        options: [
            "lowerCase()",
            "toLowerCase()",
            "lower()",
            "makeLower()"
        ],
        answer: "toLowerCase()"
    },

    {
        question: "Which object is used to generate random numbers?",
        options: ["Random", "Math", "Number", "Randomizer"],
        answer: "Math"
    },

    {
        question: "Which method rounds a number down to the nearest integer?",
        options: [
            "Math.ceil()",
            "Math.round()",
            "Math.floor()",
            "Math.down()"
        ],
        answer: "Math.floor()"
    },

    {
        question: "Which method rounds a number up to the nearest integer?",
        options: [
            "Math.floor()",
            "Math.ceil()",
            "Math.round()",
            "Math.up()"
        ],
        answer: "Math.ceil()"
    },

    {
        question: "Which keyword is used to stop a loop immediately?",
        options: ["stop", "exit", "break", "end"],
        answer: "break"
    },

    {
        question: "Which keyword skips the current iteration of a loop?",
        options: ["skip", "continue", "next", "pass"],
        answer: "continue"
    },

    {
        question: "Which method is commonly used to select an element by its ID?",
        options: [
            "document.getElementById()",
            "document.getElement()",
            "document.selectId()",
            "document.id()"
        ],
        answer: "document.getElementById()"
    }
];



let currentQuestion = 0;
let userAnswer = new Array(questions.length).fill(null);
let score = 0;
let timeLeft = 20*60;
let timerInterval;

const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");
const timeUpScreen = document.getElementById("timeUpScreen");
const startBtn = document.getElementById("startBtn");
const questionNumber = document.getElementById("questionNumber");
const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");
const timer = document.getElementById("timer");
const progressBar = document.getElementById("progressBar");
const scoreElement = document.getElementById("score");
const scoreText = document.getElementById("scoreText");
const reviewContainer = document.getElementById("reviewContainer");
const restartBtn = document.getElementById("restartBtn");
const timeUpRestartBtn = document.getElementById("timeUpRestartBtn");

startBtn.addEventListener("click", function () {
  startScreen.style.display = "none";
  quizScreen.style.display = "block";
  currentQuestion = 0;
  userAnswers = new Array(questions.length).fill(null);
  score = 0;
  timeLeft = 20 * 60;
  updateTimer();
  displayQuestion();
  startTimer();
});

function displayQuestion(){
  const question = questions[currentQuestion];
  questionNumber.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  questionText.textContent = question.question;
  optionsContainer.innerHTML = "";
  question.options.forEach(function (option) {
    const optionDiv = document.createElement("label");
    optionDiv.classList.add("option");
    if (userAnswers[currentQuestion] === option) {
      optionDiv.classList.add("selected");
    }

    optionDiv.innerHTML = `
            <input
                type="radio"
                name="answer"
                value="${option}"
                ${userAnswers[currentQuestion] === option ? "checked" : ""}
            >
            <span class="option-text">
                ${option}
            </span>
        `;

    optionDiv.addEventListener("click", function () {
      userAnswers[currentQuestion] = option;

      document.querySelectorAll(".option").forEach(function (item) {
        item.classList.remove("selected");
      });

      optionDiv.classList.add("selected");
    });

    optionsContainer.appendChild(optionDiv);
  });

  updateNavigation();
  updateProgress();
}


function updateNavigation() {
  if (currentQuestion === 0) {
    prevBtn.style.display = "none";
  } else {
    prevBtn.style.display = "block";
  }

  if (currentQuestion === questions.length - 1) {
    nextBtn.style.display = "none";
    submitBtn.style.display = "block";
  } else {
    nextBtn.style.display = "block";
    submitBtn.style.display = "none";
  }
}

nextBtn.addEventListener("click", function () {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    displayQuestion();
  }
});

prevBtn.addEventListener("click", function () {
  if (currentQuestion > 0) {
    currentQuestion--;

    displayQuestion();
  }
});

function updateProgress() {
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  progressBar.style.width = progress + "%";
}

function startTimer() {
  clearInterval(timerInterval);

  timerInterval = setInterval(function () {
    timeLeft--;

    updateTimer();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);

      timeUp();
    }
  }, 1000);
}

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);

  const seconds = timeLeft % 60;

  timer.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function timeUp() {
  quizScreen.style.display = "none";

  resultScreen.style.display = "none";

  timeUpScreen.style.display = "block";
}

submitBtn.addEventListener("click", function () {
  clearInterval(timerInterval);

  calculateResult();

  quizScreen.style.display = "none";

  resultScreen.style.display = "block";
});

function calculateResult() {
  score = 0;

  questions.forEach(function (question, index) {
    if (userAnswers[index] === question.answer) {
      score++;
    }
  });

  scoreElement.textContent = `${score} / ${questions.length}`;

  scoreText.textContent = `You scored ${score} out of ${questions.length} marks.`;

  displayReview();
}

function displayReview() {
  reviewContainer.innerHTML = "";

  questions.forEach(function (question, index) {
    const userAnswer = userAnswers[index];

    const isCorrect = userAnswer === question.answer;

    const reviewCard = document.createElement("div");

    reviewCard.classList.add("review-card");

    if (isCorrect) {
      reviewCard.classList.add("correct");
    } else {
      reviewCard.classList.add("wrong");
    }

    const userAnswerText = userAnswer === null ? "Not Answered" : userAnswer;

    reviewCard.innerHTML = `

            <div class="review-question">
                Q${index + 1}. ${question.question}
            </div>


            <div class="answer-row">
                <strong>
                    Correct Answer:
                </strong>
                <span class="correct-answer">
                    ${question.answer}
                </span>
            </div>

            <div class="answer-row">
                <strong>
                    Your Answer:
                </strong>
                <span class="user-answer">
                    ${userAnswerText}
                </span>
            </div>

            <span
                class="status
                ${isCorrect ? "correct-status" : "wrong-status"}">
                ${isCorrect ? "✓ Correct" : "✗ Wrong"}
            </span>
        `;
    reviewContainer.appendChild(reviewCard);
  });
}

restartBtn.addEventListener("click", restartQuiz);
timeUpRestartBtn.addEventListener("click", restartQuiz);

function restartQuiz() {
  clearInterval(timerInterval);
  currentQuestion = 0;
  userAnswers = new Array(questions.length).fill(null);
  score = 0;
  timeLeft = 20 * 60;
  updateTimer();
  resultScreen.style.display = "none";
  timeUpScreen.style.display = "none";
  quizScreen.style.display = "none";
  startScreen.style.display = "block";
}