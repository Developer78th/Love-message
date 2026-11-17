
const nextBtn = document.getElementById("nextBtn");

nextBtn.addEventListener("click", function () {

  const gallery = document.getElementById("gallerySection");
  const message = document.getElementById("messageSection");

  gallery.hidden = true;
  message.hidden = false;

  window.scrollTo({
    top: 0,
    behavior: "instant"
  });

});

// Full Screen Image Gallery

const galleryImages = document.querySelectorAll(".image-gallery img");

const imageViewer = document.getElementById("imageViewer");
const fullImage = document.getElementById("fullImage");

const closeViewer = document.getElementById("closeViewer");
const prevImage = document.getElementById("prevImage");
const nextImage = document.getElementById("nextImage");

let currentImage = 0;

function showImage(index) {
  currentImage =
    (index + galleryImages.length) % galleryImages.length;

  fullImage.src = galleryImages[currentImage].src;

  imageViewer.classList.add("active");
}

galleryImages.forEach((img, index) => {
  img.addEventListener("click", () => {
    showImage(index);
  });
});

// Close image
closeViewer.addEventListener("click", () => {
  imageViewer.classList.remove("active");
});

// Previous image
prevImage.addEventListener("click", () => {
  showImage(currentImage - 1);
});

// Next image
nextImage.addEventListener("click", () => {
  showImage(currentImage + 1);
});

// Close with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    imageViewer.classList.remove("active");
  }

  if (imageViewer.classList.contains("active")) {
    if (e.key === "ArrowRight") {
      showImage(currentImage + 1);
    }

    if (e.key === "ArrowLeft") {
      showImage(currentImage - 1);
    }
  }
});

// =================================
// THIRD PAGE NAVIGATION
// =================================

const nextToQuestions = document.getElementById("nextToQuestions");

const questionsSection = document.getElementById("questionsSection");

const messageSection = document.getElementById("messageSection");

const backBtn = document.getElementById("backBtn");

const questionsForm = document.getElementById("questionsForm");

const thankYou = document.getElementById("thankYou");

const answerSummary = document.getElementById("answerSummary");

// Open Questions Page

nextToQuestions.addEventListener("click", function () {

    messageSection.hidden = true;
    questionsSection.hidden = false;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

// Back to Message Page

backBtn.addEventListener("click", function () {

    questionsSection.hidden = true;
    messageSection.hidden = false;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// =================================
// SUBMIT AND SHOW ANSWERS
// =================================

const questionTitles = {
    q1: "1. Website kaisi lagi?",
    q2: "2. Favourite memory?",
    q3: "3. Message parh kar kaisa laga?",
    q4: "4. Future mein baat karna chahein gi?",
    q5: "5. Baat karne ka comfortable tareeqa?",
    q6: "6. Achhe rishte mein zaroori cheezein?",
    q7: "7. Kya meri kisi baat se takleef hui?",
    q7detail: "7. Additional detail",
    q8: "8. Future ke liye kya chahti hain?",
    q9: "9. Aap kya kehna chahein gi?",
    q10: "10. Aakhri paighaam",
    q11: "Do you want to be my girlfriend? 💍",
  q12: "Tumhare paon choom kar kahun tum se mohabbat hai to kya jawab do gi?",
  q13: "Kya tum mujhe 5 minutes ka time do gi?",
  q14: "Tum mujhe kab time do gi?",
  q15: "Kya tum kisi aur larka se baat karna chaho gi?",
  q16: "Kya main tumhare liye naya Hijaab la sakta hoon?",
  q17: "Kya tum apne Bhai ko mere baare mein batana chaho gi?",
  q18: "Agar tumhein kisi cheez ki zaroorat ho to kya mujhe bataogi?"
};

questionsForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const formData = new FormData(questionsForm);

    const groupedAnswers = {};

    // Collect all answers

    for (const [name, value] of formData.entries()) {

        if (value.trim() === "") continue;

        if (!groupedAnswers[name]) {
            groupedAnswers[name] = [];
        }

        groupedAnswers[name].push(value);

    }

    // Clear old summary

    answerSummary.replaceChildren();

    // Show answers safely

    Object.keys(questionTitles).forEach(function (key) {

        const values = groupedAnswers[key];

        if (!values || values.length === 0) return;

        const item = document.createElement("div");
        item.className = "answer-item";

        const heading = document.createElement("strong");
        heading.textContent = questionTitles[key];

        const answer = document.createElement("p");
        answer.textContent = values.join(", ");

        item.appendChild(heading);
        item.appendChild(answer);

        answerSummary.appendChild(item);

    });

    // Hide form and show thank you

    questionsForm.hidden = true;
    thankYou.hidden = false;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});
