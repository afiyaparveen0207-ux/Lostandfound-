// ---------- Question bank (multiple categories) ----------
const quizData = {
  "General Knowledge": {
    icon: "🌍",
    questions: [
      { q: "What is the capital of India?", options: ["Mumbai", "New Delhi", "Chennai", "Kolkata"], answer: 1 },
      { q: "Which planet is known as the Red Planet?", options: ["Venus", "Jupiter", "Mars", "Saturn"], answer: 2 },
      { q: "How many continents are there on Earth?", options: ["5", "6", "7", "8"], answer: 2 },
      { q: "Who wrote the national anthem of India?", options: ["Bankim Chandra", "Rabindranath Tagore", "Sarojini Naidu", "Gandhi"], answer: 1 },
      { q: "Which is the largest ocean?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: 3 },
      { q: "Which gas do plants absorb from the air?", options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"], answer: 2 },
      { q: "Which is the national animal of India?", options: ["Lion", "Tiger", "Elephant", "Leopard"], answer: 1 },
      { q: "How many days are there in a leap year?", options: ["365", "366", "364", "367"], answer: 1 },
      { q: "Which river is the longest in India?", options: ["Yamuna", "Godavari", "Ganga", "Krishna"], answer: 2 },
      { q: "Who is known as the Father of the Nation in India?", options: ["Nehru", "Mahatma Gandhi", "Patel", "Ambedkar"], answer: 1 }
    ]
  },
  "Web Development": {
    icon: "💻",
    questions: [
      { q: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Text Machine Language", "Hyper Tool Multi Language", "Home Text Markup Language"], answer: 0 },
      { q: "Which tag is used for the largest heading?", options: ["<h6>", "<head>", "<h1>", "<heading>"], answer: 2 },
      { q: "Which language is used to style web pages?", options: ["HTML", "CSS", "Python", "SQL"], answer: 1 },
      { q: "Which symbol is used for an ID selector in CSS?", options: [".", "#", "*", "&"], answer: 1 },
      { q: "Which method adds an element to the end of an array in JavaScript?", options: ["push()", "pop()", "shift()", "add()"], answer: 0 },
      { q: "Which HTML tag is used to link a JavaScript file?", options: ["<link>", "<style>", "<script>", "<js>"], answer: 2 },
      { q: "Which CSS property changes the text colour?", options: ["font-color", "text-style", "color", "background"], answer: 2 },
      { q: "Which storage keeps data in the browser even after closing it?", options: ["Local Storage", "Variables", "Console", "Cookies only"], answer: 0 },
      { q: "Which keyword declares a constant in JavaScript?", options: ["var", "let", "const", "static"], answer: 2 },
      { q: "Which function is used to select an element by its ID?", options: ["getElementById()", "querySelectorAll()", "getElementsByTag()", "findId()"], answer: 0 }
    ]
  },
  "Science": {
    icon: "🔬",
    questions: [
      { q: "What is the chemical symbol for water?", options: ["O2", "H2O", "CO2", "HO"], answer: 1 },
      { q: "Which part of the cell contains DNA?", options: ["Nucleus", "Ribosome", "Membrane", "Vacuole"], answer: 0 },
      { q: "What is the speed of light approximately?", options: ["3 x 10^8 m/s", "3 x 10^6 m/s", "3 x 10^5 m/s", "3 x 10^10 m/s"], answer: 0 },
      { q: "Which vitamin is produced by sunlight?", options: ["Vitamin A", "Vitamin B", "Vitamin C", "Vitamin D"], answer: 3 },
      { q: "What is the hardest natural substance?", options: ["Gold", "Iron", "Diamond", "Quartz"], answer: 2 },
      { q: "Which gas is most abundant in the atmosphere?", options: ["Oxygen", "Nitrogen", "Argon", "Hydrogen"], answer: 1 },
      { q: "How many bones are in an adult human body?", options: ["206", "208", "212", "300"], answer: 0 },
      { q: "Which planet is closest to the Sun?", options: ["Venus", "Earth", "Mercury", "Mars"], answer: 2 },
      { q: "What force pulls objects towards Earth?", options: ["Magnetism", "Gravity", "Friction", "Inertia"], answer: 1 },
      { q: "Which blood cells fight infection?", options: ["Red blood cells", "Platelets", "White blood cells", "Plasma"], answer: 2 }
    ]
  },
  "Artificial Intelligence": {
    icon: "🤖",
    questions: [
      { q: "What does AI stand for?", options: ["Automated Internet", "Artificial Intelligence", "Applied Input", "Advanced Interface"], answer: 1 },
      { q: "Which language is most popular for AI and machine learning?", options: ["Python", "HTML", "CSS", "SQL"], answer: 0 },
      { q: "Machine Learning is a subset of?", options: ["Networking", "Artificial Intelligence", "Databases", "Web Design"], answer: 1 },
      { q: "Which of these is a chatbot?", options: ["Excel", "ChatGPT", "Photoshop", "Notepad"], answer: 1 },
      { q: "What is used to train a machine learning model?", options: ["Data", "Cables", "Keyboard", "Printer"], answer: 0 },
      { q: "Who is called the Father of Artificial Intelligence?", options: ["Alan Turing", "John McCarthy", "Bill Gates", "Tim Berners-Lee"], answer: 1 },
      { q: "NLP stands for?", options: ["Natural Language Processing", "New Logic Program", "Network Level Protocol", "Neural Link Program"], answer: 0 },
      { q: "Which technique is inspired by the human brain?", options: ["Neural Networks", "Sorting", "Hashing", "Compiling"], answer: 0 },
      { q: "Face recognition belongs to which field?", options: ["Computer Vision", "Networking", "Accounting", "Typography"], answer: 0 },
      { q: "Supervised learning uses what kind of data?", options: ["Labelled data", "No data", "Random noise", "Only images"], answer: 0 }
    ]
  }
};

const QUESTIONS_PER_QUIZ = 10;
const TIME_LIMIT = 60; // seconds

// ---------- State ----------
let currentCategory = "";
let questions = [];
let userAnswers = [];
let currentIndex = 0;
let timeLeft = TIME_LIMIT;
let timerId = null;

// ---------- Elements ----------
const $ = (id) => document.getElementById(id);
const startScreen = $("startScreen");
const quizScreen = $("quizScreen");
const resultScreen = $("resultScreen");

// ---------- Helpers ----------
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function showScreen(screen) {
  [startScreen, quizScreen, resultScreen].forEach((s) => s.classList.add("hidden"));
  screen.classList.remove("hidden");
}

function formatTime(sec) {
  const m = String(Math.floor(sec / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return m + ":" + s;
}

// ---------- Local Storage (best score) ----------
function getBest(category) {
  const data = JSON.parse(localStorage.getItem("quizBestScores") || "{}");
  return data[category] || null;
}

function saveBest(category, score, total, percent) {
  const data = JSON.parse(localStorage.getItem("quizBestScores") || "{}");
  const old = data[category];
  if (!old || percent > old.percent) {
    data[category] = { score, total, percent };
    localStorage.setItem("quizBestScores", JSON.stringify(data));
    return true;
  }
  return false;
}

function overallBest() {
  const data = JSON.parse(localStorage.getItem("quizBestScores") || "{}");
  let best = null;
  Object.keys(data).forEach((k) => {
    if (!best || data[k].percent > best.percent) best = data[k];
  });
  return best;
}

function updateBestBadge() {
  const b = overallBest();
  $("bestBadge").textContent = b ? "Best Score: " + b.score + "/" + b.total + " (" + b.percent + "%)" : "Best Score: --";
}

// ---------- Category screen ----------
function renderCategories() {
  const box = $("categoryList");
  box.innerHTML = "";
  Object.keys(quizData).forEach((name) => {
    const best = getBest(name);
    const card = document.createElement("div");
    card.className = "category-card";
    card.innerHTML =
      '<span class="icon">' + quizData[name].icon + "</span><strong>" + name + "</strong>" +
      '<div class="best">' + (best ? "Best: " + best.score + "/" + best.total : "Not attempted") + "</div>";
    card.addEventListener("click", () => startQuiz(name));
    box.appendChild(card);
  });
  updateBestBadge();
  showScreen(startScreen);
}

// ---------- Quiz ----------
function startQuiz(category) {
  currentCategory = category;
  // Randomise question order for every attempt
  questions = shuffle(quizData[category].questions).slice(0, QUESTIONS_PER_QUIZ);
  userAnswers = new Array(questions.length).fill(null);
  currentIndex = 0;
  timeLeft = TIME_LIMIT;
  $("categoryName").textContent = category;
  showScreen(quizScreen);
  renderQuestion();
  startTimer();
}

function renderQuestion() {
  const q = questions[currentIndex];
  $("questionText").textContent = (currentIndex + 1) + ". " + q.q;
  $("progressText").textContent = "Question " + (currentIndex + 1) + " / " + questions.length;
  $("progressBar").style.width = ((currentIndex + 1) / questions.length) * 100 + "%";

  const box = $("options");
  box.innerHTML = "";
  q.options.forEach((opt, i) => {
    const div = document.createElement("div");
    div.className = "option" + (userAnswers[currentIndex] === i ? " selected" : "");
    div.textContent = String.fromCharCode(65 + i) + ". " + opt;
    div.addEventListener("click", () => {
      userAnswers[currentIndex] = i;
      renderQuestion();
    });
    box.appendChild(div);
  });

  $("prevBtn").disabled = currentIndex === 0;
  const last = currentIndex === questions.length - 1;
  $("nextBtn").classList.toggle("hidden", last);
  $("submitBtn").classList.toggle("hidden", !last);
}

function startTimer() {
  clearInterval(timerId);
  $("timer").textContent = formatTime(timeLeft);
  $("timer").classList.remove("warning");
  timerId = setInterval(() => {
    timeLeft--;
    $("timer").textContent = formatTime(timeLeft);
    if (timeLeft <= 10) $("timer").classList.add("warning");
    if (timeLeft <= 0) {
      clearInterval(timerId);
      submitQuiz(); // auto submit when time is over
    }
  }, 1000);
}

// ---------- Submit and result ----------
function submitQuiz() {
  clearInterval(timerId);
  let correct = 0, attempted = 0;
  questions.forEach((q, i) => {
    if (userAnswers[i] !== null) {
      attempted++;
      if (userAnswers[i] === q.answer) correct++;
    }
  });
  const total = questions.length;
  const wrong = attempted - correct;
  const percent = Math.round((correct / total) * 100);

  $("percentText").textContent = percent + "%";
  $("scoreText").textContent = "You scored " + correct + " out of " + total + " in " + currentCategory;
  $("sTotal").textContent = total;
  $("sAttempted").textContent = attempted;
  $("sCorrect").textContent = correct;
  $("sWrong").textContent = wrong;

  const isNewBest = saveBest(currentCategory, correct, total, percent);
  const best = getBest(currentCategory);
  $("bestMsg").textContent = isNewBest
    ? "New Best Score for this category!"
    : "Best score: " + best.score + "/" + best.total + " (" + best.percent + "%)";

  renderReview();
  updateBestBadge();
  showScreen(resultScreen);
}

function renderReview() {
  const box = $("review");
  box.innerHTML = "";
  questions.forEach((q, i) => {
    const u = userAnswers[i];
    let status = "skipped", label = "Not answered";
    if (u !== null) {
      status = u === q.answer ? "correct" : "wrong";
      label = u === q.answer ? "Correct" : "Incorrect";
    }
    const item = document.createElement("div");
    item.className = "review-item " + status;
    // Use textContent so options like <h1> are shown as text, not parsed as HTML tags
    const title = document.createElement("strong");
    title.textContent = (i + 1) + ". " + q.q;
    const yours = document.createElement("p");
    yours.textContent = "Your answer: " + (u !== null ? q.options[u] : "-") + " (" + label + ")";
    const right = document.createElement("p");
    right.textContent = "Correct answer: " + q.options[q.answer];
    item.append(title, yours, right);
    box.appendChild(item);
  });
}

// ---------- Events ----------
$("nextBtn").addEventListener("click", () => { currentIndex++; renderQuestion(); });
$("prevBtn").addEventListener("click", () => { currentIndex--; renderQuestion(); });
$("submitBtn").addEventListener("click", submitQuiz);
$("restartBtn").addEventListener("click", () => startQuiz(currentCategory));
$("categoryBtn").addEventListener("click", renderCategories);

renderCategories();
