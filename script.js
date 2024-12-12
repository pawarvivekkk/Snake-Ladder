const questions = [
    {
        question: "What is Article 15?",
        options: ["Right to Equality", "Right to Life", "Freedom of Speech", "Protection of Culture"],
        correct: "Right to Equality",
        explanation: "Article 15 prohibits discrimination on grounds of religion, race, caste, sex, or place of birth."
    },
    {
        question: "What is Article 21?",
        options: ["Right to Life", "Right to Equality", "Freedom of Religion", "Right to Privacy"],
        correct: "Right to Life",
        explanation: "Article 21 ensures the protection of life and personal liberty, except according to procedure established by law."
    },
    {
        question: "What does Article 32 provide?",
        options: ["Right to Constitutional Remedies", "Right to Vote", "Right to Privacy", "Directive Principles of State Policy"],
        correct: "Right to Constitutional Remedies",
        explanation: "Article 32 allows individuals to move the Supreme Court for enforcement of fundamental rights."
    },
    {
        question: "What is the significance of the Preamble?",
        options: ["It lists Fundamental Duties", "It states the objectives of the Constitution", "It defines Directive Principles", "It is the Annexure to the Constitution"],
        correct: "It states the objectives of the Constitution",
        explanation: "The Preamble declares India to be a Sovereign, Socialist, Secular, Democratic, and Republic nation."
    },
    {
        question: "What is Article 19 about?",
        options: ["Right to Freedom of Speech", "Right to Education", "Right to Life", "Right to Equality"],
        correct: "Right to Freedom of Speech",
        explanation: "Article 19 guarantees six freedoms, including speech, assembly, association, movement, residence, and profession."
    },
    {
        question: "Which part of the Constitution deals with Fundamental Duties?",
        options: ["Part IV", "Part IV A", "Part III", "Part V"],
        correct: "Part IV A",
        explanation: "Fundamental Duties are listed under Part IV A of the Indian Constitution."
    },
    {
        question: "What is Article 14 about?",
        options: ["Equality before the law", "Right to Education", "Protection of Culture", "Right to Life"],
        correct: "Equality before the law",
        explanation: "Article 14 guarantees equality before the law and equal protection of the laws within the territory of India."
    },
    {
        question: "What is Article 51A?",
        options: ["Fundamental Duties", "Right to Life", "Directive Principles", "Right to Education"],
        correct: "Fundamental Duties",
        explanation: "Article 51A enumerates the Fundamental Duties of every citizen of India."
    },
    {
        question: "What is the aim of Directive Principles of State Policy?",
        options: ["To guide the State in policy-making", "To grant Fundamental Rights", "To impose legal obligations on citizens", "To establish emergency powers"],
        correct: "To guide the State in policy-making",
        explanation: "Directive Principles aim to establish social and economic democracy by guiding the State in its policies."
    },
    {
        question: "What does Article 17 abolish?",
        options: ["Untouchability", "Slavery", "Caste System", "Child Labor"],
        correct: "Untouchability",
        explanation: "Article 17 abolishes 'untouchability' and forbids its practice in any form."
    },
    // Additional 40 questions...
// The format of each question follows the pattern: question, options, correct answer, and explanation.

    {
      question: "What is Article 15?",
      options: ["Right to Equality", "Right to Life", "Freedom of Speech", "Protection of Culture"],
      correct: "Right to Equality",
      explanation: "Article 15 prohibits discrimination on grounds of religion, race, caste, sex, or place of birth."
    },
    {
      question: "What is Article 21?",
      options: ["Right to Equality", "Right to Life", "Freedom of Speech", "Protection of Culture"],
      correct: "Right to Life",
      explanation: "Article 21 guarantees the protection of the right to life and personal liberty."
    },
    {
      question: "What is the Directive Principles of State Policy?",
      options: [
        "Guidelines for government policy",
        "Right to Information",
        "Right to Property",
        "None of the above"],
      correct: "Guidelines for government policy",
      explanation: "Directive Principles are guidelines for the government to create policies that improve social and economic welfare."
    }
    // Add more questions as needed.
  ];
  
  let playerPosition = 1;
  let timeLeft = 20;
  let timer = null;
  let questionActive = false;
  
  const snakes = { 16: 6, 47: 26, 49: 11, 56: 53, 62: 19, 64: 60, 87: 24 };
  const ladders = { 1: 38, 4: 14, 9: 31, 21: 42, 28: 84, 36: 44, 51: 67, 71: 91, 80: 99 };
  
  function generateBoard() {
    const board = document.getElementById("snake-ladder-board");
    board.innerHTML = "";
  
    for (let i = 100; i >= 1; i--) {
      const cell = document.createElement("div");
      cell.textContent = i;
  
      if (snakes[i]) cell.classList.add("snake");
      if (ladders[i]) cell.classList.add("ladder");
      board.appendChild(cell);
    }
  }
  
  function rollDice() {
    if (questionActive) {
      alert("Answer the current question before rolling the dice!");
      return;
    }
  
    const diceValue = Math.floor(Math.random() * 6) + 1;
    playerPosition += diceValue;
    if (playerPosition > 100) playerPosition = 100;
  
    updatePlayerPosition();
    checkForSnakeOrLadder();
    askQuestion();
  }
  
  function checkForSnakeOrLadder() {
    if (snakes[playerPosition]) {
      playerPosition = snakes[playerPosition];
      alert("Oops! You encountered a snake. Moving down.");
    } else if (ladders[playerPosition]) {
      playerPosition = ladders[playerPosition];
      alert("Yay! You climbed a ladder. Moving up.");
    }
  }
  
  function updatePlayerPosition() {
    const cells = document.querySelectorAll(".board div");
    cells.forEach(cell => cell.classList.remove("player"));
  
    const currentCell = document.querySelectorAll(".board div")[100 - playerPosition];
    currentCell.classList.add("player");
  
    document.getElementById("player-position").textContent = `Player Position: ${playerPosition}`;
  }
  
  function askQuestion() {
    questionActive = true;
  
    const questionIndex = (playerPosition - 1) % questions.length;
    const question = questions[questionIndex];
  
    document.getElementById("question-text").textContent = question.question;
  
    const optionsContainer = document.getElementById("options-container");
    optionsContainer.innerHTML = "";
  
    question.options.forEach(option => {
      const optionButton = document.createElement("div");
      optionButton.textContent = option;
      optionButton.classList.add("option");
      optionButton.onclick = () => checkAnswer(option, question.correct, question.explanation);
      optionsContainer.appendChild(optionButton);
    });
  
    document.getElementById("question-container").style.display = "block";
    startTimer();
  }
  
  function startTimer() {
    clearInterval(timer);
    timeLeft = 20;
    document.getElementById("time-left").textContent = timeLeft;
  
    timer = setInterval(() => {
      timeLeft--;
      document.getElementById("time-left").textContent = timeLeft;
  
      if (timeLeft <= 0) {
        clearInterval(timer);
        movePlayerBack();
        alert("Time's up! You move 2 steps back.");
        endQuestion();
      }
    }, 1000);
  }
  
  function checkAnswer(selected, correct, explanation) {
    clearInterval(timer);
  
    if (selected === correct) {
      alert("Correct! " + explanation);
    } else {
      alert("Wrong! " + explanation + " Moving 2 steps back.");
      movePlayerBack();
    }
  
    endQuestion();
  }
  
  function movePlayerBack() {
    playerPosition = Math.max(playerPosition - 2, 1);
    updatePlayerPosition();
  }
  
  function endQuestion() {
    questionActive = false;
    document.getElementById("question-container").style.display = "none";
  }
  
  generateBoard();
  