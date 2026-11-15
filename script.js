
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
// INTRO HEART DRAWING ANIMATION
// =================================

const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

const loveText = document.getElementById("loveText");
const openMemories = document.getElementById("openMemories");
const heartIntro = document.getElementById("heartIntro");

const heartPoints = [];

for (let i = 0; i <= 360; i++) {

    const t = i * Math.PI / 180;

    const x = 16 * Math.pow(Math.sin(t), 3);

    const y =
        13 * Math.cos(t)
        - 5 * Math.cos(2 * t)
        - 2 * Math.cos(3 * t)
        - Math.cos(4 * t);

    heartPoints.push({
        x: 300 + x * 12,
        y: 250 - y * 12
    });
}

let currentPoint = 0;

const neonColors = [
    "#ff00ff",
    "#ff1493",
    "#00ffff",
    "#9400ff"
];

let colorIndex = 0;


// Draw heart gradually
function drawHeart() {

    if (currentPoint >= heartPoints.length) {

        // Heart completed
        loveText.classList.add("show");

        setTimeout(() => {
            openMemories.classList.add("show");
        }, 2000);

        return;
    }

    const point = heartPoints[currentPoint];

    ctx.beginPath();

    ctx.moveTo(
        heartPoints[Math.max(0, currentPoint - 1)].x,
        heartPoints[Math.max(0, currentPoint - 1)].y
    );

    ctx.lineTo(point.x, point.y);

    ctx.strokeStyle = "#ff1493";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";

    ctx.shadowBlur = 20;
    ctx.shadowColor = "#ff00ff";

    ctx.stroke();

    currentPoint++;

    requestAnimationFrame(drawHeart);
}


// Start drawing
drawHeart();


// Blinking neon colors after completion
setInterval(() => {

    if (currentPoint < heartPoints.length) return;

    colorIndex = (colorIndex + 1) % neonColors.length;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();

    heartPoints.forEach((point, index) => {

        if (index === 0) {
            ctx.moveTo(point.x, point.y);
        } else {
            ctx.lineTo(point.x, point.y);
        }

    });

    ctx.closePath();

    ctx.strokeStyle = neonColors[colorIndex];
    ctx.lineWidth = 5;
    ctx.shadowBlur = 25;
    ctx.shadowColor = neonColors[colorIndex];

    ctx.stroke();

}, 500);


// Open existing website
openMemories.addEventListener("click", () => {

    heartIntro.style.display = "none";

    document.querySelector(".container").style.display = "block";

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });

});
