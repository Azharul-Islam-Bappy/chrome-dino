// Select dino and cactus element from the DOM.
const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");

// cactus images
const cactusImages = [
  "assets/cactus1.png",
  "assets/cactus2.png",
  "assets/cactus3.png"
];
let isGameOver = false;

// Variables to control the jump.
let isJumping = false;
let position = 0;        // Current vertical position (in pixels)
const jumpHeight = 140;  // Maximum height of the jump
const increment = 5;     // How many pixels to move every frame
const frameRate = 20;    // Milliseconds between frames

// Jump function that handles both upward and downward movement.
function jump() {
  if (isJumping) return; // Prevent double jumps

  isJumping = true;
  let upInterval = setInterval(() => {
    // If we've reached or exceeded the jumpHeight, start falling down
    if (position >= jumpHeight) {
      clearInterval(upInterval);
      // Set up downward motion
      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= increment;
          dino.style.bottom = position + "px";
        }
      }, frameRate);
    } else {
      // Jumping up
      position += increment;
      dino.style.bottom = position + "px";
    }
  }, frameRate);
}

// Listen for the spacebar press to trigger a jump.
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    jump();
  }
});

// Listen for touch in mobile
document.addEventListener("touchstart", jump);

// Optional: for mouse clicks on desktop.
document.addEventListener("click", jump);

// cactus randomizer
cactus.addEventListener("animationiteration", () => {
  const randomIndex = Math.floor(Math.random() * cactusImages.length);
  cactus.src = cactusImages[randomIndex];
});

// function to check collision between dino and cactus
function checkCollision() {
  const dinoRect = dino.getBoundingClientRect();
  const cactusRect = cactus.getBoundingClientRect();
  
  if (dinoRect.left < cactusRect.right && dinoRect.right > cactusRect.left && dinoRect.bottom > cactusRect.top && dinoRect.top < cactusRect.bottom) {
    gameOver();
  }
}

function gameOver() {
  isGameOver = true;
  
  // changing dino and cactus animationPlayState
  cactus.style.animationPlayState = "paused";
  dino.style.animationPlayState = "paused";
  
  alert("Game Over");
}

let collisionCheck = setInterval(() => {
  if (!isGameOver) {
    checkCollision();
  }
}, 10);