let gridSize = 20;
dx = gridSize;
dy = 0;

$(function () {
  // ========== Form-select-option ========== //
  $(".step_1").on("click", function () {
    $(".step_1").removeClass("active");
    $(this).addClass("active");
  });
  $(".step_2").on("click", function () {
    $(".step_2").removeClass("active");
    $(this).addClass("active");
  });
  $(".step_3").on("click", function () {
    $(".step_3").removeClass("active");
    $(this).addClass("active");
  });
  $(".step_4").on("click", function () {
    $(".step_4").removeClass("active");
    $(this).addClass("active");
  });
});

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("multisteps_form_panel");
  if (!x[n]) return; // ✅ prevent crash
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == x.length - 1) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next Question";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n);
}

var currentTab = 0; // Current tab is set to be the first tab (0)

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("multisteps_form_panel");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    evaluateQuizAndShowResult();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
  vibrate();
}

function validateForm() {
  // This function deals with validation of the form fields
  var x,
    y,
    i,
    valid = true;
  x = document.getElementsByClassName("multisteps_form_panel");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i,
    x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}

function move() {
  var elem = document.getElementById("myBar");
  var width = parseInt(elem.innerHTML);
  var aim = width + 25;
  var id = setInterval(frame, 25);

  function frame() {
    if (width >= aim) {
      clearInterval(id);
    } else if (width >= 100) {
      width = 0;
      aim = 25;
      elem.style.width = width + "%";
      elem.innerHTML = width * 1 + "%";
    } else {
      width++;
      elem.style.width = width + "%";
      elem.innerHTML = width * 1 + "%";
    }
  }
}

let timeLeft = 60;
let countdown = null;

function startTimer(onFinish = timeUpAction) {
  const timerDisplay = document.getElementById("timer");
  if (!timerDisplay) return;

  bgMusic.play();
  bgMusic.volume = 0.5;

  if (countdown) clearInterval(countdown);

  timeLeft = 60;
  timerDisplay.textContent = timeLeft;

  countdown = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;

    if (timeLeft === 3) {
      warningSound.play();
    }

    if (timeLeft <= 0) {
      clearInterval(countdown);
      onFinish();
    }
  }, 1000);
}

function timeUpAction() {
  evaluateQuizAndShowResult();
}

const questions = [
  {
    question: "Which paper size is used most in offices worldwide?",
    options: ["A3", "A4", "Letter"],
    correct: 1,
  },
  {
    question: "Which color mode do printers use?",
    options: ["CMYK", "RGB", "Monochrome"],
    correct: 0,
  },
  {
    question: "What does CMYK in printing refers to ?",
    options: [
      "Cyan, Magenta, Yellow, and Black",
      "Personalized cutting boards",
      "Contrast, Matte, Yellow, and Kaleidoscope",
    ],
    correct: 0,
  },
  {
    question:
      "In branding, what do we call a short, catchy phrase used to communicate a brand’s message?",
    options: ["Hashtag", "Logo", "Slogan"],
    correct: 2,
  },
  {
    question: "What is Malik's Slogan?",
    options: ["Mahluli", "We've got it all!", "Read. Learn. Grow"],
    correct: 0,
  },
  {
    question: "Which of the following can be printed on at Malik's?",
    options: ["Face masks", "Keychains", "Both A and B"],
    correct: 2,
  },
  {
    question: "Does Malik’s have TikTok?",
    options: [
      "No, they only use Instagram and Facebook",
      "Yes, their handle is @malikslebanon",
      "Yes, their handle is @malikbooks",
    ],
    correct: 1,
  },
  {
    question: "What is Malik’s page name on Instagram?",
    options: ["@malikbooks", "@malikslebanon", "@malik.bookshop"],
    correct: 1,
  },
  {
    question: "Which baby items can be customized at Malik's?",
    options: ["Baby bottles", "Baby bibs", "Both A and B"],
    correct: 2,
  },
  {
    question: "Does Malik’s have Twitter?",
    options: [
      "Yes, @MalikBooks",
      "Yes, @MaliksLebanon",
      "Yes, @Malik_Bookshop",
      "No, they only use Instagram and Facebook",
    ],
    correct: 1,
  },
  {
    question: "What fashion items can be personalized through Malik's?",
    options: ["T-shirts", "Caps", "Both A and B"],
    correct: 2,
  },
  {
    question: "Complete the following sentence: منطبع كل شي",
    options: ["إلا الحبر", "إلا الكذب", "عكل شي"],
    correct: 2,
  },
  {
    question: "When did Malik’s first launch?",
    options: ["1995", "1988", "2000"],
    correct: 1,
  },
  {
    question:
      "Which of the following printing services do we offer for businesses?",
    options: [
      "Business card printing",
      "Brochure and flyer printing",
      "Large format printing (banners, posters)",
      "All of the above",
    ],
    correct: 3,
  },
  {
    question: "We offer custom printing solutions for:",
    options: [
      "Personalized gifts",
      "Corporate materials (brochures, letterheads)",
      "Event materials (banners, posters)",
      "All of the above",
    ],
    correct: 3,
  },
  {
    question: "We can help you design and print:",
    options: [
      "Custom t-shirts and merchandise",
      "Custom banners for events",
      "High-quality brochures for marketing",
      "All of the above",
    ],
    correct: 3,
  },
  {
    question:
      "We specialize in printing high-quality marketing materials like:",
    options: [
      "Flyers and brochures",
      "Business cards and stationery",
      "Event signage and posters",
      "All of the above",
    ],
    correct: 3,
  },
  {
    question: "What makes our printing service stand out?",
    options: [
      "Fast turnaround and excellent customer service",
      "High quality print materials and options",
      "Custom designs for any project",
      "All of the above",
    ],
    correct: 3,
  },
  {
    question: "We offer custom printing for which of the following?",
    options: ["Invitations", "Calendars", "Posters", "All of the above"],
    correct: 3,
  },
  {
    question: "Do we offer eco-friendly printing options?",
    options: [
      "Yes, we offer recycled paper and eco-friendly inks",
      "No, all of our materials are traditional",
      "We do not focus on eco-friendly options",
      "We do not focus on eco-friendly options",
    ],
    correct: 0,
  },
  {
    question: "What is the most popular use for our vinyl printing?",
    options: [
      "Custom stickers and decals",
      "Large outdoor banners",
      "Vehicle wraps",
      "All of the above",
    ],
    correct: 3,
  },
  {
    question:
      "Do we provide stamp printing services for businesses and personal use?",
    options: [
      "Yes, we create custom rubber stamps",
      "No, we only focus on paper-based printing",
      "Yes, but only for corporate clients",
      "All of the above",
    ],
    correct: 3,
  },
];

function renderQuestions() {
  const selected = getRandomQuestions();
  const container = document.getElementById("dynamic_questions");
  container.innerHTML = "";

  selected.forEach((q, index) => {
    const progress = (index + 1) * 25;
    const stepClass = `step_${index + 1}`;
    const nameAttr = `question_${index}`;

    const optionsHTML = q.options
      .map((opt, i) => {
        const inputId = `${nameAttr}_opt${i}`;
        const isCorrect = i === q.correct ? "correct-answer" : "";
        return `
        <div class="form-check position-relative mb-3">
          <input class="form-check-input visually-hidden" type="radio" id="${inputId}" name="${nameAttr}" value="${i}">
          <label for="${inputId}"
            class="${stepClass} custom-radio-label rounded-pill text-start text-white d-block py-2 px-4 ${isCorrect}">
            ${opt}
          </label>
        </div>
      `;
      })
      .join("");

    const stepHTML = `
      <div class="multisteps_form_panel step" style="display:none">
        <div class="col-md-6 m-auto">
          <div class="content_box py-5 ps-5 position-relative">

            <div class="step_progress_bar mb-3">
              <div class="progress rounded-pill">
                <span><i class="far fa-clock"></i></span>
                <div class="progress-bar mx-2 rounded-pill" role="progressbar"
                  style="width: ${progress}%" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100">
                </div>
              </div>
            </div>

            <div class="question_number text-capitalize">
              <span class="text-white">question ${index + 1} / 4</span>
              <p class="pt-3">--------------------------------------------------------------------------------------------------------------------</p>
            </div>

            <div class="question_title py-3">
              <h1 class="text-white">${q.question}</h1>
            </div>

            <div class="form_items">
              ${optionsHTML}
            </div>

          </div>
        </div>
      </div>
    `;

    container.innerHTML += stepHTML;
  });

  // 👉 Highlight the selected answer
  document
    .querySelectorAll(".form_items input[type=radio]")
    .forEach((radio) => {
      radio.addEventListener("change", function () {
        vibrate();

        const name = this.name;
        document.querySelectorAll(`input[name='${name}']`).forEach((r) => {
          r.nextElementSibling?.classList?.remove("active");
        });

        const label = document.querySelector(`label[for='${this.id}']`);
        if (label) label.classList.add("active");
      });

      // 🔧 iPad Fix: manually fire the change event
      radio.addEventListener("touchstart", function () {
        this.click();
      });
    });
}

// 🔥 Activate .active styling on click
document.querySelectorAll(".form_items input[type=radio]").forEach((radio) => {
  radio.addEventListener("change", function () {
    vibrate();
    // Remove .active from siblings
    const name = this.name;
    document.querySelectorAll(`input[name='${name}']`).forEach((r) => {
      r.nextElementSibling?.classList?.remove("active");
    });

    // Add .active to selected
    const label = document.querySelector(`label[for='${this.id}']`);
    if (label) label.classList.add("active");
  });
});

function getRandomQuestions(count = 4) {
  const shuffled = questions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function evaluateQuizAndShowResult() {
  const panels = document.querySelectorAll(".multisteps_form_panel");
  let score = 0;

  panels.forEach((panel, index) => {
    // Get all radio buttons for this question
    const radios = panel.querySelectorAll(`input[name="question_${index}"]`);

    // Find the correct one (based on its parent label having 'correct-answer')
    let correctValue = null;
    radios.forEach((radio) => {
      const label = document.querySelector(`label[for="${radio.id}"]`);
      if (label && label.classList.contains("correct-answer")) {
        correctValue = radio.value;
      }
    });

    // Find which option was selected
    const selected = panel.querySelector(
      `input[name="question_${index}"]:checked`
    );

    if (selected && selected.value === correctValue) {
      score++;
    }
  });

  // Hide quiz & timer
  document.getElementById("quiz_wrapper").style.display = "none";
  document.querySelector(".question_timer").style.display = "none";

  // Show result
  const resultScreen = document.getElementById("result_screen");
  resultScreen.style.display = "block";
  document.getElementById(
    "score_display"
  ).textContent = `You scored ${score} out of 4`;

  const title = document.getElementById("result_title");
  const reward = document.getElementById("reward_message");

  if (score >= 3) {
    title.textContent = "🎉 Congratulations!";
    reward.textContent = "You won a gift! 🎁";
    bgMusic.pause();
    winSound.play(); // 🔥 play win
    triggerConfetti();
  } else {
    title.textContent = "😢 Better luck next time!";
    reward.textContent = "Try again to win a gift!";
    bgMusic.pause();
    failSound.play(); // 😢 play fail
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function triggerConfetti() {
  const duration = 3 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

// Get audio elements
const bgMusic = document.getElementById("bgMusic");
const clickSound = document.getElementById("clickSound");
const warningSound = document.getElementById("warningSound");
const winSound = document.getElementById("winSound");
const failSound = document.getElementById("failSound");
const eatSound = document.getElementById("eatSound");

// 🔊 Click sound on answer/select
document.addEventListener("click", function (e) {
  if (e.target.tagName === "LABEL" || e.target.tagName === "BUTTON") {
    clickSound.currentTime = 0;
    clickSound.play();
  }
});

function vibrate(duration = 50) {
  if ("vibrate" in navigator) {
    navigator.vibrate(duration);
  }
}

function startGame(mode) {
  document.getElementById("select_mode_screen").style.display = "none";

  if (mode === "kids") {
    document.getElementById("select_mode_screen").style.display = "none";
    document.getElementById("result_screen").style.display = "none";

    // Start the memory game using Phaser
    document.getElementById("memory_game_screen").style.display = "block";

    // Restart timer for memory game
    startTimer(() => {
      document.getElementById("memory_game_screen").style.display = "none";
      document.getElementById("result_screen").style.display = "block";
      document.getElementById("result_title").textContent = "⏱ Time's Up!";
      document.getElementById("score_display").textContent =
        "You ran out of time!";
      document.getElementById("reward_message").textContent =
        "Try again to match all the cards!";
      bgMusic.pause();
      failSound.play();
    });
  } else if (mode === "teen") {
    startTimer(() => showTeenResult());
    startTeenGame();
  } else if (mode === "adult") {
    renderQuestions();
    document.getElementById("quiz_wrapper").style.display = "block";
    document.querySelector(".question_timer").style.display = "block"; // ✅ Add this
    showTab(currentTab);
    vibrate();
    startTimer(() => evaluateQuizAndShowResult());
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("invoiceModal");
  const input = document.getElementById("invoiceInput");

  modal.style.display = "flex";

  // Use requestAnimationFrame for guaranteed next render cycle
  requestAnimationFrame(() => {
    setTimeout(() => {
      input.focus();
      input.select();
    }, 50); // small delay to ensure modal is visible
  });
});

function submitInvoice() {
  const input = document.getElementById("invoiceInput");
  const invoice = input.value.trim();

  if (invoice === "") {
    input.classList.add("is-invalid");
    input.focus();
    return;
  }

  input.classList.remove("is-invalid");
  document.getElementById("invoiceModal").style.display = "none";
  document.getElementById("select_mode_screen").style.display = "block";

  // 🎵 Start background music on first real interaction
  try {
    bgMusic.currentTime = 0;
    bgMusic.volume = 0.5;
    bgMusic.play().catch(() => {
      console.log("Music play blocked — will retry on next interaction.");
    });
  } catch (e) {
    console.log("Music error:", e);
  }
}

const teenQuestions = [
  {
    image: "./assets/images/products/product1.jpg",
    question: "How much does this Porodo transparent mechanical keyboard cost?",
    options: ["$350", "$47", "$600", "$790"],
    correct: 1,
    material: "Porodo Transparent Mechanical Keyboard",
  },
  {
    image: "./assets/images/products/product2.jpg",
    question:
      "How much does it cost to get an International Driving License at Maliks?",
    options: ["$450", "$60", "$750", "$1000"],
    correct: 1,
    material: "International Driving License Service",
  },
  {
    image: "./assets/images/products/product3.jpg",
    question:
      "How much does it cost to print 1000 double-sided business cards at Maliks (before VAT)?",
    options: ["$2900", "$39", "$4900", "$590"],
    correct: 1,
    material: "1000 Recto Verso Business Cards",
  },
  {
    image: "./assets/images/products/product5.jpg",
    question: "How much does this neck massager cost at Maliks?",
    options: ["$405", "$550", "$65", "$75"],
    correct: 2,
    material: "Electric Neck Massager",
  },
  {
    image: "./assets/images/products/product6.jpg",
    question: "How much does this 3D Name Flip cost at Maliks?",
    options: ["$190.99", "$24.24", "$290.99", "$34.99"],
    correct: 1,
    material: "3D Printed Name Flip",
  },
  {
    image: "./assets/images/products/product7.jpg",
    question: "How much does an A4-sized 2D Mini Me cost at Maliks?",
    options: ["$190.99", "$220.50", "$27.15", "Free"],
    correct: 2,
    material: "2D Mini Me – A4 Size",
  },
  {
    image: "./assets/images/products/product8.jpg",
    question:
      "How much does it cost to print 8 passport-sized photos at Maliks?",
    options: ["$3.99", "$4.50", "$5.40", "$6.99"],
    correct: 2,
    material: "Passport Photos – 8 pcs",
  },
  {
    image: "./assets/images/products/product4.jpg",
    question: "How much does it cost to customize a car mug at Maliks?",
    options: ["$250.00", "$290.99", "$33.74", "$39.00"],
    correct: 2,
    material: "Customizable Car Mug",
  },
  {
    image: "./assets/images/products/product9.jpg",
    question: "Can you get a personalized door mat at Maliks?",
    options: ["No", "Yes, only with text", "Yes, with text and size options"],
    correct: 2,
    material: "Custom Door Mat – Price Varies by Size",
  },
  {
    image: "./assets/images/products/product10.jpg",
    question:
      "How much does it cost to print an A3-sized custom wall calendar at Maliks?",
    options: ["$290.99", "$340.50", "$40.26", "$45.00"],
    correct: 2,
    material: "A3 Wall Calendar",
  },
];

function startTeenGame() {
  const selected = getRandomTeenQuestions();
  let currentTeenIndex = 0;
  let teenScore = 0;
  let teenTimeLeft = 60;
  let teenCountdown;

  const quizContainer = document.getElementById("quiz_wrapper");
  const timerBox = document.querySelector(".question_timer");
  const timerEl = document.getElementById("timer");

  // 🎵 Music and UI reset
  bgMusic.currentTime = 0;
  bgMusic.volume = 0.5;
  bgMusic.play();
  failSound.pause();
  winSound.pause();
  warningSound.pause();

  document.getElementById("select_mode_screen").style.display = "none";
  document.getElementById("result_screen").style.display = "none";
  quizContainer.style.display = "block";
  timerBox.style.display = "block";
  timerEl.style.display = "inline"; // 🔥 Make sure timer is visible

  timerEl.textContent = teenTimeLeft;

  // Timer logic
  if (teenCountdown) clearInterval(teenCountdown);
  teenCountdown = setInterval(() => {
    teenTimeLeft--;
    timerEl.textContent = teenTimeLeft;

    if (teenTimeLeft === 3) warningSound.play();

    if (teenTimeLeft <= 0) {
      clearInterval(teenCountdown);
      endTeenGame();
    }
  }, 1000);

  showTeenQuestion();

  function showTeenQuestion() {
    const q = selected[currentTeenIndex];

    quizContainer.innerHTML = `
    <div class="text-center py-4">
      <img src="${
        q.image
      }" class="img-fluid mb-4 rounded shadow" style="max-height: 300px;" />
  
      <h2 class="text-white mb-2">${q.question}</h2>
      <p class="text-warning fs-5 mb-3">${q.material}</p>
  
      <div class="d-flex flex-wrap justify-content-center gap-3">
        ${q.options
          .map(
            (opt, i) => `
            <button
              class="f_btn rounded-pill text-white animate__animated animate__fadeInUp"
              style="margin-top: 0 !important; background-color: #b30000; border: 3px solid white; padding: 1rem 2rem; font-size: 1.2rem;"
              onclick="submitTeenAnswer(${i})"
            >
              ${opt}
            </button>
          `
          )
          .join("")}
      </div>
    </div>
  `;
  }

  window.submitTeenAnswer = function (selectedIndex) {
    const q = selected[currentTeenIndex];
    clickSound.currentTime = 0;
    clickSound.play();

    if (selectedIndex === q.correct) teenScore++;

    currentTeenIndex++;
    if (currentTeenIndex >= selected.length) {
      clearInterval(teenCountdown);
      endTeenGame();
    } else {
      showTeenQuestion();
    }
  };

  function endTeenGame() {
    quizContainer.style.display = "none";
    timerBox.style.display = "none";

    const resultScreen = document.getElementById("result_screen");
    resultScreen.style.display = "block";

    document.getElementById(
      "score_display"
    ).textContent = `You scored ${teenScore} out of ${selected.length}`;

    const title = document.getElementById("result_title");
    const reward = document.getElementById("reward_message");

    if (teenScore >= 3) {
      title.textContent = "🎉 Great job!";
      reward.textContent = "You won a gift! 🎁";
      bgMusic.pause();
      winSound.play();
      triggerConfetti();
    } else {
      title.textContent = "😢 Not quite!";
      reward.textContent = "Try again for a prize!";
      bgMusic.pause();
      failSound.play();
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function getRandomTeenQuestions(count = 4) {
  // Deep copy the array
  const questionsCopy = [...teenQuestions];

  // Fisher-Yates shuffle
  for (let i = questionsCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questionsCopy[i], questionsCopy[j]] = [questionsCopy[j], questionsCopy[i]];
  }

  return questionsCopy.slice(0, count);
}

// Matching Game using Phaser.js
const config = {
  type: Phaser.AUTO,
  width: 700,
  height: 750,
  parent: "memory_game_screen",
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
  backgroundColor: "#000000",
  scale: {
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

const game = new Phaser.Game(config);

let cards = [];
let flippedCards = [];
let matchedPairs = 0;
let canFlip = true;
const cardValues = [1, 2, 3, 4, 5, 6]; // 6 pairs

function preload() {
  this.load.audio("flipSound", "./assets/audio/flip.mp3");
  this.load.audio("matchSound", "./assets/audio/match.mp3");
  this.load.image("card_back", "./assets/images/card_back.png");
  this.load.audio("winSound", "./assets/audio/win.mp3");
  for (let i = 1; i <= 6; i++) {
    this.load.image(`card_${i}`, `./assets/images/card_${i}.png`);
  }
}

let cardBackTexture = "card_back";
let flipSound, matchSound;
let winPhaserSound;

function create() {
  const canvasWidth = this.sys.game.canvas.width;
  const canvasHeight = this.sys.game.canvas.height;
  winPhaserSound = this.sound.add("winSound");

  let isTablet = window.innerWidth <= 1024;

  const rows = 3;
  const cols = 4;
  const cardWidth = isTablet ? 80 : 100;
  const cardHeight = isTablet ? 110 : 130;
  const spacingX = 170;
  const spacingY = 170;
  const startX = (700 - (cols - 1) * spacingX) / 2;
  const startY = (550 - (rows - 1) * spacingY) / 2;

  let values = [...cardValues, ...cardValues];
  Phaser.Utils.Array.Shuffle(values);

  for (let i = 0; i < values.length; i++) {
    const row = Math.floor(i / cols);
    const col = i % cols;

    const x = startX + col * spacingX;
    const y = startY + row * spacingY;

    flipSound = this.sound.add("flipSound", { volume: 1 });
    matchSound = this.sound.add("matchSound", { volume: 1 });

    let card = this.add.image(x, y, cardBackTexture).setInteractive();
    card.setDisplaySize(cardWidth, cardHeight); // 😍 clean card size

    card.value = values[i];
    card.isFlipped = false;
    card.isMatched = false;
    card.frontTexture = "card_" + values[i];
    const cardScale = Math.min(
      this.scale.width / 1000,
      this.scale.height / 800
    ); // responsive scale
    card.setScale(cardScale); // 👈 apply this to each card after creation

    card.on("pointerdown", () => {
      if (!canFlip || card.isFlipped || card.isMatched) return;
      flipSound.play();

      card.setTexture(card.frontTexture);
      card.isFlipped = true;
      flippedCards.push(card);

      if (flippedCards.length === 2) {
        canFlip = false;
        checkMatch.call(this); // 👈 this line is important!
      }
    });

    cards.push(card);
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.value === card2.value) {
    card1.isMatched = true;
    card2.isMatched = true;
    matchSound.play();
    matchedPairs++;
    flippedCards = [];
    canFlip = true;

    if (matchedPairs === cardValues.length) {
      try {
        bgMusic.pause();
        winPhaserSound.play();
      } catch (e) {
        console.log("Win sound failed to play:", e);
      }

      setTimeout(() => {
        document.getElementById("memory_game_screen").style.display = "none"; // ✅ Hide canvas
        document.getElementById("result_screen").style.display = "block";
        document.getElementById("score_display").textContent =
          "You matched all cards!";
        document.getElementById("result_title").textContent = "🎉 Well Done!";
        document.getElementById("reward_message").textContent =
          "You won a gift! 🎁";
        triggerConfetti();
      }, 600);
    }
  } else {
    this.time.delayedCall(800, () => {
      card1.setTexture("card_back");
      card2.setTexture("card_back");
      card1.isFlipped = false;
      card2.isFlipped = false;
      flippedCards = [];
      canFlip = true;
    });
  }
}

function update() {
  // Optional logic
}
