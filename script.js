const rollButton = document.getElementById('roll-dice');
const message = document.getElementById('message');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const choicesDiv = document.getElementById('choices');
const submitAnswerButton = document.getElementById('submit-answer');
const languageSelect = document.getElementById('language-select');
const difficultySelect = document.getElementById('difficulty-select');

const playerPiece = document.getElementById('player-piece');
const aiPiece = document.getElementById('ai-piece');
const popup = document.getElementById('board-popup');
const diceDisplay =
document.getElementById('dice-display');

const diceFaces = [
  "⚀",
  "⚁",
  "⚂",
  "⚃",
  "⚄",
  "⚅"
];
const savedAvatar = localStorage.getItem('playerAvatar');

if (savedAvatar) {
  playerPiece.style.backgroundImage = `url(${savedAvatar})`;
  playerPiece.style.backgroundSize = "cover";
  playerPiece.style.backgroundPosition = "center";
  playerPiece.style.backgroundRepeat = "no-repeat";
  playerPiece.style.transform = "rotate(0deg)";
}

aiPiece.innerHTML = `
  <img src="avatars/robot.jfif"
       style="
         width:100%;
         height:100%;
         border-radius:50%;
         object-fit:cover;
       ">
`;
aiPiece.style.backgroundSize = "cover";
aiPiece.style.backgroundPosition = "center";
aiPiece.style.backgroundRepeat = "no-repeat";

let playerPosition = 0;
let aiPosition = 0;
let currentQuestionIndex = 0;
let questionAnswered = false;

let selectedLanguage = languageSelect.value;
let selectedDifficulty = difficultySelect.value;

let attemptCount = 0;

const snakes = {
  99: 77,
  95: 75,
  93: 69,
  67: 30,
  63: 19,
  59: 17,
  16: 7
};

const ladders = {
  9: 27,
  18: 37,
  25: 54,
  28: 51,
  56: 64,
  68: 88,
  76: 97,
  79: 100
};

const questionBank = {
  "Python": {
    "Easy": [

{ question: "What keyword is used to define a function in Python?", choices: ["function", "def", "define", "func"], answer: "def" },

{ question: "Which function is used to get user input?", choices: ["scan()", "input()", "read()", "get()"], answer: "input()" },

{ question: "Which symbol is used for comments in Python?", choices: ["//", "#", "/* */", "--"], answer: "#" },

{ question: "Which data type stores multiple items?", choices: ["int", "float", "list", "bool"], answer: "list" },

{ question: "Which keyword is used for loops?", choices: ["repeat", "loop", "for", "iterate"], answer: "for" },

{ question: "What is the extension of Python files?", choices: [".pt", ".python", ".py", ".pyt"], answer: ".py" },

{ question: "Which function gives the length of a list?", choices: ["count()", "size()", "len()", "length()"], answer: "len()" },

{ question: "Which keyword is used to create a class?", choices: ["object", "class", "define", "struct"], answer: "class" },

{ question: "What is the output of print(2 + 3)?", choices: ["23", "5", "6", "Error"], answer: "5" },

{ question: "Which bracket is used for lists?", choices: ["()", "{}", "[]", "<>"], answer: "[]" }

],
"Medium": [

{ question: "Which operator is used for exponentiation?", choices: ["^", "**", "//", "%"], answer: "**" },

{ question: "Which keyword handles exceptions?", choices: ["catch", "try", "except", "handle"], answer: "except" },

{ question: "What is a lambda function?", choices: ["Loop", "Class", "Anonymous function", "Variable"], answer: "Anonymous function" },

{ question: "Which module is used for regular expressions?", choices: ["regex", "re", "pattern", "pyre"], answer: "re" },

{ question: "Which data type is immutable?", choices: ["list", "set", "tuple", "dictionary"], answer: "tuple" },

{ question: "What does range() return?", choices: ["List", "Tuple", "Iterable", "Integer"], answer: "Iterable" },

{ question: "Which keyword declares a global variable?", choices: ["let", "const", "global", "var"], answer: "global" },

{ question: "What is the result of 10 // 3?", choices: ["3.3", "3", "4", "0"], answer: "3" },

{ question: "Which Python version introduced f-strings?", choices: ["2.7", "3.5", "3.6", "3.9"], answer: "3.6" },

{ question: "Which function converts string to integer?", choices: ["str()", "int()", "float()", "bool()"], answer: "int()" }

],

"Hard": [

{ question: "What is the default return value of a function?", choices: ["0", "False", "None", "Error"], answer: "None" },

{ question: "Which keyword is used for inheritance?", choices: ["extends", "inherits", "class", "super"], answer: "class" },

{ question: "What is list comprehension?", choices: ["Shortcut for loops", "Database", "Class", "Module"], answer: "Shortcut for loops" },

{ question: "Which module supports asynchronous programming?", choices: ["thread", "asyncio", "parallel", "sync"], answer: "asyncio" },

{ question: "Which function finds maximum value?", choices: ["maximum()", "top()", "max()", "largest()"], answer: "max()" },

{ question: "What is the output type of type([])?", choices: ["list", "<class 'list'>", "array", "[]"], answer: "<class 'list'>" },

{ question: "Which loop does NOT exist in Python?", choices: ["for", "while", "foreach", "do-while"], answer: "do-while" },

{ question: "Which symbol is used for slicing?", choices: ["#", "::", ":", "/"], answer: ":" },

{ question: "What is a dictionary in Python?", choices: ["List", "Tuple", "Key-value pairs", "Set"], answer: "Key-value pairs" },

{ question: "What is indentation used for?", choices: ["Comments", "Loops", "Defining code blocks", "Printing"], answer: "Defining code blocks" }

]
  },

  "C++": {
    "Easy": [

{ question: "Which is used for input in C++?", choices: ["cout", "cin", "scanf", "print"], answer: "cin" },

{ question: "What is the extension of C++ files?", choices: [".c", ".cpp", ".java", ".cs"], answer: ".cpp" },

{ question: "Which keyword creates a class?", choices: ["define", "class", "object", "struct"], answer: "class" },

{ question: "Which symbol comments a line?", choices: ["#", "//", "--", "/*"], answer: "//" },

{ question: "Which keyword defines constants?", choices: ["static", "final", "const", "fixed"], answer: "const" },

{ question: "Which loop runs at least once?", choices: ["for", "while", "do-while", "foreach"], answer: "do-while" },

{ question: "What does cout do?", choices: ["Input", "Output", "Loop", "Class"], answer: "Output" },

{ question: "Which header file includes cin and cout?", choices: ["stdio.h", "iostream", "stream.h", "conio.h"], answer: "iostream" },

{ question: "What is the output of 5 / 2?", choices: ["2", "2.5", "3", "Error"], answer: "2" },

{ question: "Which operator gives address of variable?", choices: ["*", "&", "#", "$"], answer: "&" }

],

"Medium": [

{ question: "What is a pointer?", choices: ["Stores address", "Stores value", "Function", "Loop"], answer: "Stores address" },

{ question: "Which container stores unique values?", choices: ["vector", "map", "set", "list"], answer: "set" },

{ question: "What does STL stand for?", choices: ["System Template Library", "Standard Template Library", "Static Template Logic", "Standard Type Library"], answer: "Standard Template Library" },

{ question: "Which keyword allocates memory dynamically?", choices: ["malloc", "alloc", "new", "create"], answer: "new" },

{ question: "Which structure uses FIFO?", choices: ["stack", "queue", "list", "vector"], answer: "queue" },

{ question: "Which structure uses LIFO?", choices: ["queue", "stack", "vector", "set"], answer: "stack" },

{ question: "Which keyword is used for exception handling?", choices: ["catch", "throw", "try-catch", "error"], answer: "try-catch" },

{ question: "What does NULL represent?", choices: ["0", "No value", "Void", "Undefined"], answer: "No value" },

{ question: "Which operator is overloaded for output?", choices: [">>", "<<", "::", "**"], answer: "<<" },

{ question: "Which data type does not exist?", choices: ["float", "real", "bool", "int"], answer: "real" }

],

"Hard": [

{ question: "Which keyword supports polymorphism?", choices: ["virtual", "class", "public", "override"], answer: "virtual" },

{ question: "Which keyword prevents overriding?", choices: ["const", "static", "final", "protected"], answer: "final" },

{ question: "Which function terminates a program?", choices: ["stop()", "terminate()", "exit()", "end()"], answer: "exit()" },

{ question: "What is sizeof(char)?", choices: ["1", "2", "4", "8"], answer: "1" },

{ question: "What is inheritance?", choices: ["Using parent class", "Looping", "Error handling", "Printing"], answer: "Using parent class" },

{ question: "Which access specifier allows public access?", choices: ["private", "protected", "public", "friend"], answer: "public" },

{ question: "Which keyword is used in inheritance?", choices: ["extends", "base", "public", "inherits"], answer: "public" },

{ question: "What is encapsulation?", choices: ["Data hiding", "Looping", "Inheritance", "Output"], answer: "Data hiding" },

{ question: "Which loop checks condition after execution?", choices: ["for", "while", "do-while", "switch"], answer: "do-while" },

{ question: "Which function returns multiple values?", choices: ["vector", "tuple", "array", "map"], answer: "tuple" }

]
  },

  "Java": {
    "Easy": [

{ question: "Which keyword defines a class?", choices: ["define", "class", "struct", "object"], answer: "class" },

{ question: "Which method is the entry point?", choices: ["start()", "main()", "run()", "init()"], answer: "main()" },

{ question: "Which symbol comments one line?", choices: ["#", "//", "/* */", "--"], answer: "//" },

{ question: "Which keyword creates objects?", choices: ["alloc", "malloc", "new", "make"], answer: "new" },

{ question: "What is JVM?", choices: ["Java Variable Method", "Java Virtual Machine", "Java Version Manager", "Java Vendor Memory"], answer: "Java Virtual Machine" },

{ question: "Which type is NOT primitive?", choices: ["int", "float", "String", "boolean"], answer: "String" },

{ question: "What is 10 % 3?", choices: ["0", "1", "3", "10"], answer: "1" },

{ question: "Which keyword handles inheritance?", choices: ["extends", "inherits", "super", "base"], answer: "extends" },

{ question: "Which keyword defines interfaces?", choices: ["interface", "class", "abstract", "struct"], answer: "interface" },

{ question: "Which loop executes at least once?", choices: ["for", "while", "do-while", "switch"], answer: "do-while" }

],

"Medium": [

{ question: "What is encapsulation?", choices: ["Hiding data", "Looping", "Inheritance", "Sorting"], answer: "Hiding data" },

{ question: "Which collection stores unique items?", choices: ["List", "Set", "Array", "Map"], answer: "Set" },

{ question: "Which method compares strings?", choices: ["==", "match()", "equals()", "compare()"], answer: "equals()" },

{ question: "Which collection maps keys to values?", choices: ["List", "Array", "Map", "Set"], answer: "Map" },

{ question: "Which keyword throws exceptions?", choices: ["throw", "throws", "catch", "error"], answer: "throw" },

{ question: "What is abstraction?", choices: ["Hiding implementation", "Looping", "Inheritance", "Sorting"], answer: "Hiding implementation" },

{ question: "Which class is parent of all classes?", choices: ["Root", "Base", "Object", "Main"], answer: "Object" },

{ question: "What is method overloading?", choices: ["Multiple methods same name", "Looping", "Inheritance", "Overriding"], answer: "Multiple methods same name" },

{ question: "What is default boolean value?", choices: ["true", "false", "null", "0"], answer: "false" },

{ question: "What is a package?", choices: ["Loop", "Array", "Group of classes", "Method"], answer: "Group of classes" }

],

"Hard": [

{ question: "Which keyword prevents inheritance?", choices: ["static", "sealed", "const", "final"], answer: "final" },

{ question: "What does 'this' keyword refer to?", choices: ["Parent object", "Current object", "Class", "Method"], answer: "Current object" },

{ question: "What is polymorphism?", choices: ["Many forms", "Looping", "Data hiding", "Sorting"], answer: "Many forms" },

{ question: "Which access modifier restricts access within class?", choices: ["public", "private", "protected", "default"], answer: "private" },

{ question: "Which exception occurs when object is null?", choices: ["IOException", "NullPointerException", "ClassNotFoundException", "RuntimeException"], answer: "NullPointerException" },

{ question: "What is bytecode extension?", choices: [".java", ".exe", ".class", ".obj"], answer: ".class" },

{ question: "What is inheritance?", choices: ["Using parent class", "Looping", "Error handling", "Data storage"], answer: "Using parent class" },

{ question: "Which operator compares values?", choices: ["=", "==", "!=", ">="], answer: "==" },

{ question: "Which keyword is used for abstraction?", choices: ["abstract", "virtual", "interface", "extends"], answer: "abstract" },

{ question: "Which keyword is used for overriding?", choices: ["override", "virtual", "@Override", "extends"], answer: "@Override" }

]
  }
};

let currentQuestions =
  questionBank[selectedLanguage][selectedDifficulty];

const positionCoordinates = (() => {

  const coords = {};
  const size = 50;

  for (let i = 1; i <= 100; i++) {

    let row = Math.floor((i - 1) / 10);

    let col =
      row % 2 === 0
        ? (i - 1) % 10
        : 9 - ((i - 1) % 10);

    coords[i] = {
      left: col * size + 10,
      top: (9 - row) * size + 10
    };
  }

  return coords;
})();

function movePiece(position, piece) {

  if (position === 0) {

    piece.style.left = '-100px';
    piece.style.top = '500px';

    return;
  }

  const coord = positionCoordinates[position];

  piece.style.left = coord.left + 'px';
  piece.style.top = coord.top + 'px';
}

function showPopup(messageText, duration = 2000) {

  popup.innerText = messageText;

  popup.style.display = 'block';

  setTimeout(() => {

    popup.style.display = 'none';

  }, duration);
}

function askQuestion() {

  rollButton.disabled = true;

  questionAnswered = false;

  attemptCount = 0;

  currentQuestions =
    questionBank[selectedLanguage][selectedDifficulty];

  const q =
    currentQuestions[
      currentQuestionIndex % currentQuestions.length
    ];

  currentQuestionIndex++;

  questionElement.innerText = q.question;

  choicesDiv.innerHTML = '';

  q.choices.forEach(choice => {

  const label = document.createElement('label');

  label.innerHTML =
    `<input type="radio" name="mcq" value="${choice}"> ${choice}`;

  label.style.display = "block";
  label.style.marginBottom = "4px";

  choicesDiv.appendChild(label);
});

  submitAnswerButton.onclick = () => checkAnswer(q.answer);

  questionContainer.style.display = 'block';
}

function checkAnswer(correctAnswer) {

  const selected =
    document.querySelector('input[name="mcq"]:checked');

  if (!selected) {

    message.innerText =
      "⚠️ Please select an answer.";

    return;
  }

  if (selected.value === correctAnswer) {

    message.innerText =
      "✅ Correct! You may roll the dice.";

    questionAnswered = true;

    rollButton.disabled = false;

    questionContainer.style.display = 'none';

  } else {

    attemptCount++;

    if (attemptCount < 3) {

      message.innerText =
        `❌ Incorrect. Try again. (${3 - attemptCount} attempt(s) left)`;

    } else {

      message.innerText =
        "❌ All attempts used. Turn skipped.";

      questionContainer.style.display = 'none';

      setTimeout(aiTurn, 1500);
    }
  }
}

function rollDice() {

  if (!questionAnswered) {

    message.innerText =
      "❗ Please answer the question first!";

    return;
  }

  rollButton.disabled = true;

  questionAnswered = false;

  diceDisplay.classList.add("rolling");

  let count = 0;

  const rolling = setInterval(() => {

    const randomFace =
      Math.floor(Math.random() * 6);

    diceDisplay.innerText =
      diceFaces[randomFace];

    count++;

    if (count >= 12) {

      clearInterval(rolling);

      diceDisplay.classList.remove("rolling");

      const dice =
        Math.floor(Math.random() * 6) + 1;

      diceDisplay.innerText =
        diceFaces[dice - 1];

      message.innerText =
        `🎲 You rolled a ${dice}`;

      if (playerPosition + dice <= 100) {

        playerPosition += dice;

        if (snakes[playerPosition]) {

          playerPosition =
            snakes[playerPosition];

          showPopup(
            "😨 Oops! You landed on a snake!"
          );

        }

        else if (ladders[playerPosition]) {

          playerPosition =
            ladders[playerPosition];

          showPopup(
            "🎉 You climbed a ladder!"
          );
        }
      }

      movePiece(playerPosition, playerPiece);

      if (playerPosition === 100) {

        showPopup("🎉 You win!");

        message.innerText +=
          `\n🎉 You win!`;

        showReplayButton("You");

        return;
      }

      setTimeout(aiTurn, 1200);
    }

  }, 100);
}
function aiTurn() {

  diceDisplay.classList.add("rolling");

  let count = 0;

  const rolling = setInterval(() => {

    const randomFace =
      Math.floor(Math.random() * 6);

    diceDisplay.innerText =
      diceFaces[randomFace];

    count++;

    if (count >= 12) {

      clearInterval(rolling);

      diceDisplay.classList.remove("rolling");

      const dice =
        Math.floor(Math.random() * 6) + 1;

      diceDisplay.innerText =
        diceFaces[dice - 1];

      message.innerText +=
        `\n🤖 AI rolled a ${dice}`;

      if (aiPosition + dice <= 100) {

        aiPosition += dice;

        if (snakes[aiPosition]) {

          aiPosition =
            snakes[aiPosition];

          showPopup(
            "😈 AI landed on a snake!"
          );

        }

        else if (ladders[aiPosition]) {

          aiPosition =
            ladders[aiPosition];

          showPopup(
            "🤖 AI climbed a ladder!"
          );
        }
      }

      movePiece(aiPosition, aiPiece);

      if (aiPosition === 100) {

        showPopup("💻 AI wins!");

        message.innerText +=
          `\n💻 AI wins!`;

        showReplayButton("AI");

        return;
      }

      setTimeout(askQuestion, 1000);
    }

  }, 100);
}
function showReplayButton(winner) {

  const btn =
    document.createElement("button");

  btn.textContent = "🔁 Play Again";

  btn.style.marginTop = "15px";
  btn.style.padding = "10px 20px";
  btn.style.fontSize = "16px";
  btn.style.borderRadius = "10px";
  btn.style.backgroundColor = "#8dd9ff";
  btn.style.border = "none";
  btn.style.cursor = "pointer";

  btn.onclick = () => location.reload();

  message.appendChild(document.createElement("br"));

  message.appendChild(btn);

  showPopup(`${winner} wins the game! 🎉`, 4000);
}

languageSelect.addEventListener('change', () => {

  selectedLanguage = languageSelect.value;

  currentQuestionIndex = 0;

  askQuestion();
});

difficultySelect.addEventListener('change', () => {

  selectedDifficulty = difficultySelect.value;

  currentQuestionIndex = 0;

  askQuestion();
});

movePiece(playerPosition, playerPiece);
movePiece(aiPosition, aiPiece);

askQuestion();

rollButton.onclick = rollDice;