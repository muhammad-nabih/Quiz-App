// DOM Elements
const questionNumberElement = document.querySelector(".question-number");
const questionElement = document.querySelector(".question h2");
const parentQuestionElement = document.querySelector(".question");
const choicesAreaElement = document.querySelector(".choices-area");
const submitButton = document.querySelector("#submit");
const bulletSpansElement = document.querySelector(".bullets .spans");
const countdownElement = document.querySelector(".bullets .countdown");
const progressLoadElement = document.querySelector(".progress-load");

// Initialize State
let currentQuestionIndex = 0;
let countLoader = 0;
let result = 0;
let total = 0;
let minutes = 29;
let seconds = 60;
let timeDown;
// Fetch data from the JSON file
async function fetchData() {
  try {
    const response = await fetch("assets/js/data/data.json");
    const data = await response.json();
    const totalQuestions = data.length;

    // Create question bullets
    createQuestionBullets(totalQuestions);

    // Count Down Questions
    questionNumberElement.textContent = totalQuestions;

    // Display data on the page
    displayQuestionData(data);

    // Calculate the width to increment the progress bar
    const loadWidth = 100 / totalQuestions;

    // ^ Submit Click Handler
    submitButton.onclick = () => {
      if (currentQuestionIndex < totalQuestions) {
        questionNumberElement.textContent--;
        // Get the correct answer for the current question
        const correctAnswer = data[currentQuestionIndex]["correct_answer"];
        const checkedInput = document.querySelector(
          "input[type=radio]:checked"
        );

        if (checkedInput && checkedInput.dataset.choice === correctAnswer) {
          result += 10;
        }

        // Update the progress bar width
        progressLoadElement.style.width =
          parseFloat(progressLoadElement.style.width || "0") + loadWidth + "%";
        countLoader += loadWidth;

        total = totalQuestions;
        showResult(totalQuestions, data);
      }
    };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function showResult(totalQuestions, data) {
  if (countLoader >= 100) {
    // Display the result
    clearData();
    parentQuestionElement.classList.add("result");
    questionElement.textContent = `Your Score: ${result} out of ${
      totalQuestions * 10
    }`;
    clearInterval(timeDown)
    countdownElement.style.flex="1"
    countdownElement.style.fontSize="3rem"
    questionElement.style.margin = "10px auto";
    choicesAreaElement.innerHTML = "";

    submitButton.style.display = "none"; // Hide the button
  } else {
    // Move to the next question
    currentQuestionIndex++;

    // Clear the previous choices
    choicesAreaElement.innerHTML = "";

    // Add Class On On The current span
    const bulletSpansElement = document.querySelectorAll(".spans span");
    if (currentQuestionIndex < totalQuestions) {
      bulletSpansElement[currentQuestionIndex].classList.add("on");
    }

    // Display the next question
    displayQuestionData(data);
  }
}

fetchData();

// Create question bullets
function createQuestionBullets(totalQuestions) {
  for (let i = 0; i < totalQuestions; i++) {
    const bulletSpan = document.createElement("span");
    bulletSpansElement.appendChild(bulletSpan);
    if (i === 0) {
      bulletSpan.classList.add("on");
    }
  }
}

// Display question data on the page
function displayQuestionData(data) {
  const currentQuestionAndOptionsData = data[currentQuestionIndex];

  // Display the question text
  questionElement.textContent = currentQuestionAndOptionsData["question"];

  // Display answer options
  currentQuestionAndOptionsData["options"].forEach((option, index) => {
    // Call Back Component choose Area
    choicesAreaElement.appendChild(createChoiceArea(option, index));
  });
}

// Create a choice area with radio input and label
function createChoiceArea(option, index) {
  const chooseArea = document.createElement("div");
  chooseArea.classList.add("choose");

  const inputRadio = document.createElement("input");
  inputRadio.type = "radio";
  inputRadio.name = "choice";
  inputRadio.setAttribute("data-choice", option);
  inputRadio.id = `answer-${index}`;

  const label = document.createElement("label");
  label.htmlFor = `answer-${index}`;
  label.textContent = option;

  // Checked First Option
  if (index === 0) inputRadio.checked = true;

  chooseArea.appendChild(inputRadio);
  chooseArea.appendChild(label);

  return chooseArea;
}

function timerDown(totalQuestions) {
  timeDown = setInterval(() => {
    seconds--;
    if (seconds === 0 && minutes === 0) {
      // Display the result
      clearInterval(timerDown);
      clearData();
      questionElement.textContent = `Your Score: ${result} out of ${
        total * 10
      }`;
      parentQuestionElement.classList.add("result");
    } else if (seconds === 0) {
      minutes--;
      seconds = 59;
    }
    countdownElement.textContent = `${minutes}:${
      seconds > 10 ? seconds : "0" + seconds
    }`;
  }, 1000);
  return timerDown;
}

timerDown();

function clearData() {
  choicesAreaElement.innerHTML = "";
  questionElement.innerHTML = "";
  submitButton.style.display = "none";
  bulletSpansElement.innerHTML = "";
}
