const playButton = document.querySelector(".playButton");                    
const letters = [".L", ".A", ".C", ".H", ".I", ".E"];
const interval = 500; // 0.5 seconds delay between letters

playButton.addEventListener("click", () => {
    // Immediately make letters disappear
    letters.forEach((selector) => {
        const letter = document.querySelector(selector);
        if (letter) {
            letter.style.opacity = "0";
            letter.style.transform = "translateY(-30px)";
            letter.style.transition = "none"; // Remove animation for instant disappearance
        }
    });
    
    // Re-apply animation after 1s
    setTimeout(() => {
        letters.forEach((selector, index) => {
            setTimeout(() => {
                const letter = document.querySelector(selector);
                if (letter) {
                    letter.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out"; // Restore animation
                    letter.style.opacity = "1";
                    letter.style.transform = "translateY(0)"; // Move into position
                }
            }, index * interval);
        });
    }, 500); // Starts animation again
});
