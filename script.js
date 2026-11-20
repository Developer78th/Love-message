
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-firestore.js";

// =================================
// FIREBASE CONFIGURATION
// =================================

const firebaseConfig = {
  apiKey: "AIzaSyAs2JiYIa-pOrx1zfeiaqnvrLbNu-R5t2o",
  authDomain: "my-lovewebsite.firebaseapp.com",
  projectId: "my-lovewebsite",
  storageBucket: "my-lovewebsite.firebasestorage.app",
  messagingSenderId: "395841165621",
  appId: "1:395841165621:web:246145d108e4f4551fd47c",
  measurementId: "G-77453HVHLK"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// =================================
// GALLERY TO MESSAGE NAVIGATION
// =================================

const nextBtn = document.getElementById("nextBtn");

nextBtn.addEventListener("click", function () {
  const gallery = document.getElementById("gallerySection");
  const message = document.getElementById("messageSection");

  gallery.hidden = true;
  message.hidden = false;

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// =================================
// FULL SCREEN IMAGE GALLERY
// =================================

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

// Keyboard controls
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
// QUESTION TITLES
// =================================

const questionTitles = {
  q1: "1. Website kaisi lagi?",
  q2: "2. Favourite memory?",
  q3: "3. Message parh kar kaisa laga?",
  q4: "4. Future mein baat karna chahein gi?",
  q5: "5. Baat karne ka comfortable tareeqa?",
  q6: "6. Aap ko koi tang krta ha?",
  q7: "7. Kya meri kisi baat se takleef hui?",
  q7detail: "7. Additional detail",
  q8: "8. Future ke liye kya chahti hain?",
  q9: "9. Do you want to be my girlfriend? 💍",
  q10: "10. Tumhare paon choom kar kahun tum se mohabbat hai to kya jawab do gi?",
  q11: "11. Kya tum mujhe 5 minutes ka time do gi?",
  q12: "12. Tum mujhe kab time do gi?",
  q13: "13. Kya tum kisi aur larka se baat karna chaho gi?",
  q14: "14. Kya main tumhare liye naya Hijaab khareed sakta hoon?",
  q15: "15. Kya tum apne Bhai ko mere baare mein batana chaho gi?",
  q16: "16. Agar tumhein kisi cheez ki zaroorat ho to kya mujhe bataogi?",
  q17: "17. Which class do you study in?",
  q18: "18. Aakhri paighaam",
  q19: "19. time bata do kab aao gi",
  q20: "20. miss krti ho ya nahi",
   q21: "21. Tum mary saath kya khana pasand kro gi?",
  q21detail: "21. Additional detail",
  q22: "22. Ab kabhi jhoot to nhi bolo gi?",
  q23: "23. Letters waapis kro gi?, kab?",
  q23detail: "23. Additional detail",
  q24: "24. Mary saath Bike pr school kab jao gi? Trust me kuch ni ho ga.🥺",
  q24detail: "24. Additional detail",
    q25: "25. bracelet kab bana kr do gi? 🥺"

};

// =================================
// SUBMIT ANSWERS TO FIREBASE
// =================================

questionsForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(questionsForm);
  const groupedAnswers = {};

  // Collect all answers
  for (const [name, value] of formData.entries()) {
    if (typeof value !== "string" || value.trim() === "") {
      continue;
    }

    if (!groupedAnswers[name]) {
      groupedAnswers[name] = [];
    }

    groupedAnswers[name].push(value.trim());
  }

  // Prevent duplicate submissions while saving
  const submitBtn = questionsForm.querySelector(
    'button[type="submit"], input[type="submit"]'
  );

  if (submitBtn) {
    submitBtn.disabled = true;
  }

  try {
    // Save answers to Firestore
    await addDoc(collection(db, "answers"), {
      answers: groupedAnswers,
      submittedAt: serverTimestamp()
    });

    // Show answers on website
    answerSummary.replaceChildren();

    Object.keys(questionTitles).forEach(function (key) {
      const values = groupedAnswers[key];

      if (!values || values.length === 0) {
        return;
      }

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

  } catch (error) {
    console.error("Firebase save error:", error);

    alert(
      "Answers save nahi ho sake. Please dobara try karein."
    );

  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
    }
  }
});
