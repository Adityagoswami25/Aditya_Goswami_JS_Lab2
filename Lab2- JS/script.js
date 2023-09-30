// Define your quiz questions and answers
const questions = [
  {
    question:
      "Which of the keyword is used to define the variable in the javascript?",
    choices: ["var", "let", "Both A & B", "None of the above"],
    correctAnswer: "Both A & B",
  },
  {
    question: "which of the method is used to get HTML element in javascript?",
    choices: [
      "getElementbyId()",
      "getElementsByClassName()",
      "Both A & B",
      "None of the above",
    ],
    correctAnswer: "Both A & B",
  },
  {
    question: " What does NaN means?",
    choices: [
      "Negative Number",
      "Not a Number",
      "Both A & B",
      "None of the above",
    ],
    correctAnswer: "Not a Number",
  },
  {
    question: "The 'let' and 'var' are known as:",
    choices: ["Prototypes", "Declaration statements", "Data Types", "Keywords"],
    correctAnswer: "Declaration statements",
  },
  {
    question: "Which type of JavaScript language is?",
    choices: [
      "Object oriented",
      "Object based",
      "Functional",
      "None of the above",
    ],
    correctAnswer: "Object based",
  },
];

let currentQuestionIndex = 0;
let score = 0;

// DOM elements
const questionText = document.getElementById("question");
const choiceButtons = document.querySelectorAll(".buttons button");
const progressText = document.getElementById("progress");
const scoreText = document.getElementById("score");
const backButton = document.getElementById("backButton");
const submitButton = document.getElementById("submitButton");

// Function to load a new question
function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionText.textContent = currentQuestion.question;

  // Assign choices to buttons
  for (let i = 0; i < choiceButtons.length; i++) {
    choiceButtons[i].textContent = currentQuestion.choices[i];
  }

  // Update progress text
  progressText.textContent = `Question ${currentQuestionIndex + 1} of ${
    questions.length
  }`;

  // Check if it's the last question
  if (currentQuestionIndex === questions.length - 1) {
    submitButton.textContent = "Submit";
  } else {
    submitButton.textContent = "Next";
    // Add an event listener for the "Next" button
    const nextButton = document.getElementById("submitButton");
    nextButton.addEventListener("click", () => {
      // Move to the next question
      currentQuestionIndex++;

      // If there are more questions, load the next one; otherwise, show the final score
      if (currentQuestionIndex < questions.length) {
        loadQuestion();
        backButton.disabled = false; // Enable the back button
      }
    });
  }
}

// Function to check the user's answer
function checkAnswer(userChoice) {
  const currentQuestion = questions[currentQuestionIndex];
  if (userChoice === currentQuestion.correctAnswer) {
    score++;
  }
}

// Remove the first event listener for choice buttons
choiceButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    const selectedChoice = button.textContent;
    clearSelectedChoice(); // Clear any previously selected choices
    button.classList.add("selected"); // Mark the current choice as selected
  });
});

// Function to go back to the previous question
function goBack() {
  currentQuestionIndex--;
  clearSelectedChoice(); // Clear the selected choice
  loadQuestion();
  if (currentQuestionIndex === 0) {
    backButton.disabled = true; // Disable the back button at the first question
  }
}

// Function to clear the selected choice
function clearSelectedChoice() {
  choiceButtons.forEach((button) => {
    button.classList.remove("selected");
  });
}

// Event listener for choice buttons
choiceButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    const selectedChoice = button.textContent;
    clearSelectedChoice(); // Clear any previously selected choices
    button.classList.add("selected"); // Mark the current choice as selected
    checkAnswer(selectedChoice);

    // Move to the next question
    currentQuestionIndex++;

    // If there are more questions, load the next one; otherwise, show the final score
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
      backButton.disabled = false; // Enable the back button
    } else {
      submitButton.disabled = false; // Enable the submit button
    }
  });
});

// Function to show the final score
function showScore() {
  questionText.textContent = "Quiz Complete!";
  choiceButtons.forEach((button) => {
    button.style.display = "none";
  });
  scoreText.textContent = `Score: ${score} / ${questions.length}`;
}

// Event listener for the submit button
submitButton.addEventListener("click", () => {
  if (currentQuestionIndex === questions.length) {
    showScore();
    submitButton.disabled = true; // Disable the submit button after submission

    // Calculate and display the percentage of correctly answered questions
    const percentage = (score / questions.length) * 100;
    scoreText.textContent += ` (${percentage.toFixed(2)}%)`;
  }
});

// Initialize the quiz
loadQuestion();
