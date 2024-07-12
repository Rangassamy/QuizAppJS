class Question {
  constructor(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }

  isCorrectAnswer(choice) {
    return this.answer === choice;
  }
}

// Mon tableau avec toutes mes questions
const questions = [
  new Question(
    "Quelle méthode Javascript permet de filtrer les éléments d'un tableau",
    ["indexOf()", "map()", "filter()", "reduce()"],
    "filter()"
  ),
  new Question(
    "Quelle méthode Javascript permet de vérifier si un élément figure dans un tableau",
    ["isNaN()", "includes()", "findIndex()", "isOdd()"],
    "includes()"
  ),
  new Question(
    "Quelle méthode transforme du JSON en un objet Javascript ?",
    ["JSON.parse()", "JSON.stringify()", "JSON.object()", "JSON.toJS"],
    "JSON.parse()"
  ),
  new Question(
    "Quel objet Javascript permet d'arrondir à l'entier le plus proche",
    ["Math.ceil()", "Math.floor()", "Math.round()", "Math.random()"],
    "Math.round()"
  ),
];

class Quiz {
  constructor(questions) {
    this.questions = questions;
    this.score = 0;
    this.currentQuestionIndex = 0;
  }

  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  guess(answer) {
    if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
      this.score++;
    }
    this.currentQuestionIndex++;
  }

  hasEnded() {
    return this.currentQuestionIndex >= this.questions.length;
  }
}

const quiz = new Quiz(questions);

function displayQuestion() {
  if (quiz.hasEnded()) {
    showScores();
  } else {
    // Afficher la question
    const questionElement = document.getElementById("question");
    questionElement.innerHTML = quiz.getCurrentQuestion().text;

    // Afficher les choix
    const choices = quiz.getCurrentQuestion().choices;
    for (let i = 0; i < choices.length; i++) {
      const choiceElement = document.getElementById("choice" + i);
      choiceElement.innerHTML = choices[i];
      guessHandler("guess" + i, choices[i]);
    }

    // Afficher le progrès
    showProgress();
  }
}

function guessHandler(id, guess) {
  const button = document.getElementById(id);
  button.onclick = function () {
    quiz.guess(guess);
    displayQuestion();
  };
}

function showScores() {
  const quizEndHTML = `
    <h2>Score</h2>
    <h3>Votre score est : ${quiz.score} / ${quiz.questions.length}</h3>
  `;
  const element = document.getElementById("quiz");
  element.innerHTML = quizEndHTML;
}

function showProgress() {
  const currentQuestionNumber = quiz.currentQuestionIndex + 1;
  const element = document.getElementById("progress");
  element.innerHTML = `Question ${currentQuestionNumber} sur ${quiz.questions.length}`;
}

//Lancements de Quiz App
displayQuestion();
