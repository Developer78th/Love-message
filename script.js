
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
