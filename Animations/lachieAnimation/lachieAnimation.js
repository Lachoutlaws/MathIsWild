const playButton = document.querySelector(".playButton");
const textInput = document.getElementById("textInput");
const textBox = document.querySelector(".textBox");
const letterSelector = document.querySelector(".letterSelector");
const letterDisplay = document.querySelector(".letterDisplay"); // Box to show selected letter
const rotateSlider = document.getElementById("rotateValue");

const letterSpan = []; // Store letter spans in order
const interval = 500; // 0.5 seconds delay between letters
let selectedRotation = {}; // Store rotation values per letter

// Function to update textBox with new spans
function updateTextBox() {
    const text = textInput.value.trim(); // Get text from input
    textBox.innerHTML = ''; // Clear existing content
    letterSpan.length = 0; // Reset array
    selectedRotation = {}; // Reset stored rotations

    text.split("").forEach((letter, index) => {
        const span = document.createElement("span");
        span.textContent = letter;
        span.classList.add("Lachie", `span-${index + 1}`); // Adds "Lachie" and span index
        textBox.appendChild(span);
        
        letterSpan.push(span); // Store the actual span element
        selectedRotation[index] = "rotate(0deg)"; // Default rotation for each letter
    });

    updateLetterSelector(); // Refresh the dropdown with new letters
}

// Function to populate the letter selector dropdown
function updateLetterSelector() {
    letterSelector.innerHTML = ''; // Clear previous options
    letterSpan.forEach((span, i) => {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `Letter ${i + 1}: "${span.textContent}"`;
        letterSelector.appendChild(option);
    });

    // Auto-select first letter if available
    if (letterSpan.length > 0) {
        letterSelector.value = 0;
        updateLetterDisplay(); // Update display immediately
    } else {
        letterDisplay.textContent = ''; // Clear if no letters
    }
}

// Function to update the displayed letter
function updateLetterDisplay() {
    const selectedIndex = letterSelector.value;
    if (letterSpan[selectedIndex]) {
        letterDisplay.innerHTML = `<span class="rotatingLetter">${letterSpan[selectedIndex].textContent}</span>`;
    } else {
        letterDisplay.innerHTML = ''; // Clear if no selection
    }
}

// Rotate only the displayed letter inside letterDisplay
rotateSlider.addEventListener("input", () => {
    const rotatingLetter = document.querySelector(".rotatingLetter");
    if (rotatingLetter) {
        rotatingLetter.style.display = "inline-block";
        rotatingLetter.style.transform = `rotate(${rotateSlider.value}deg)`;
    }
});

// When clicking letterDisplay, store the rotation for the **selected** letter
letterDisplay.addEventListener("click", () => {
    const selectedIndex = letterSelector.value;
    const rotatingLetter = document.querySelector(".rotatingLetter");
    if (rotatingLetter) {
        const transformValue = getComputedStyle(rotatingLetter).transform;
        selectedRotation[selectedIndex] = transformValue; // Store the current rotation only for this letter
    }
});

// Play button applies the stored rotation **only to the selected letter** in the animation
playButton.addEventListener("click", () => {
    if (letterSpan.length === 0) return; // Prevents running animation if there's no text

    playButton.disabled = true; // Disable button
    playButton.classList.add("disabled");

    // Immediately make letters disappear
    letterSpan.forEach((letter) => {
        letter.style.opacity = "0";
        letter.style.transform = "translateX(30px)";
        letter.style.transition = "none";
    });

    // Re-apply animation after 1s with **only the stored rotation for selected letter**
    setTimeout(() => {
        letterSpan.forEach((letter, index) => {
            setTimeout(() => {
                letter.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out";
                letter.style.opacity = "1";

                // Apply stored rotation **only if it exists for this letter**
                if (selectedRotation[index]) {
                    letter.style.transform = `translateX(0) ${selectedRotation[index]}`;
                } else {
                    letter.style.transform = "translateX(0)";
                }

                // Enable button after the last letter animates
                if (index === letterSpan.length - 1) {
                    setTimeout(() => {
                        playButton.disabled = false;
                        playButton.classList.remove("disabled");
                    }, 500);
                }
            }, index * interval);
        });
    }, 500);
});

// Listen for text input changes and update textBox + dropdown
textInput.addEventListener("input", updateTextBox);
letterSelector.addEventListener("change", updateLetterDisplay); // Update display when selection changes
