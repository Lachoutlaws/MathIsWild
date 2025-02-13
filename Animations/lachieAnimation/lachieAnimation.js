const playButton = document.querySelector(".playButton");
const textInput = document.getElementById("textInput");
const textBox = document.querySelector(".textBox");
const letterSelector = document.querySelector(".letterSelector");
const letterDisplay = document.querySelector(".letterDisplay"); // Box to show selected letter

const letterSpan = []; // Store letter spans in order
const interval = 500; // 0.5 seconds delay between letters

// Function to update textBox with new spans
function updateTextBox() {
    const text = textInput.value.trim(); // Get text from input
    textBox.innerHTML = ''; // Clear existing content
    letterSpan.length = 0; // Reset array

    text.split("").forEach((letter, index) => {
        const span = document.createElement("span");
        span.textContent = letter;
        span.classList.add("Lachie", `span-${index + 1}`); // Adds "Lachie" and span index
        textBox.appendChild(span);
        
        letterSpan.push(span); // Store the actual span element
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
        letterDisplay.textContent = `${letterSpan[selectedIndex].textContent}`;
    } else {
        letterDisplay.textContent = '';
    }
}

// Listen for text input changes and update textBox + dropdown
textInput.addEventListener("input", updateTextBox);
letterSelector.addEventListener("change", updateLetterDisplay); // Update display when selection changes

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

    // Re-apply animation after 1s
    setTimeout(() => {
        letterSpan.forEach((letter, index) => {
            setTimeout(() => {
                letter.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out";
                letter.style.opacity = "1";
                letter.style.transform = "translateX(0)";

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
