// Define DOM elements
const questionNumber = document.querySelector(".question-number");
const progressLoad = document.querySelector(".progress-load");
const question = document.querySelector(".question h2");
const choicesArea = document.querySelector(".choices-area");
const submit = document.querySelector("#submit");
const bulletsContainer = document.querySelector(".bullets");
const spans = document.querySelector(".bullets .spans");
const countdown = document.querySelector(".bullets .countdown");

// Define global variables
let indexQuestion = 0;

// Function to retrieve data from a JSON object
const loadData = async () => {
  try {
    const response = await fetch("assets/js/data/data.json");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    const spanLength = data.questions.length;
    const countDownQuestion = data.questions.length;
    questionNumber.textContent = countDownQuestion;
    const questionElement = data.questions[indexQuestion].question;
    const optionsElement = data.questions[indexQuestion].options;
    addQuestionToPage(questionElement, optionsElement);
    addSpansToPage(spanLength);
  } catch (error) {
    console.error(error);
  }
};

// Call the loadData function to load the initial data
loadData();

// Function to add question and answer options to the page
function addQuestionToPage(questionElement, options) {
  question.innerHTML = questionElement;
  let idCounter = 1;

  for (let option of options) {
    const choose = document.createElement("div");
    choose.classList.add("choose");

    const radioButton = document.createElement("input");
    radioButton.type = "radio";
    radioButton.name = "question";
    radioButton.id = `option-${idCounter}`;

    const label = document.createElement("label");
    label.htmlFor = `option-${idCounter}`;
    label.textContent = option;

    idCounter++;

    choose.appendChild(radioButton);
    choose.appendChild(label);

    choicesArea.appendChild(choose);
  }
}



//todo:Function To Add spans To page
function addSpansToPage(spanLength) {
  for (let i = 0; i < spanLength; i++) {
    const span = document.createElement("span");
    if (i === 0) {
      span.classList.add("on"); // Add the "on" class to the first span
    }
    spans.appendChild(span);
  }
}

//todo Add event listeners and implement functionality
submit.addEventListener("click", () => {
  // Handle the submit button click event
  // You can add your logic here
});

// Implement other functionality as needed
