// Select our dino element from the DOM.
const dino = document.getElementById("dino");

// Variables to control the jump.
let isJumping = false;
let position = 0;        // Current vertical position (in pixels)
const jumpHeight = 150;  // Maximum height of the jump
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

// Also add support for mobile: a tap anywhere triggers a jump.
document.addEventListener("click", jump);