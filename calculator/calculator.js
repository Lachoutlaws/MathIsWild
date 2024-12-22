
// Calculator Starts ________________________________________________________________________

const calculatorNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const N = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const calculatorOperates = ["+", "-", "*", "/", "=", "C"];
const timesTablesResults = document.querySelector(".timesTablesResults");
const calcButtons = document.querySelector(".calcButtons");
const calcScreen = document.querySelector(".calcScreen");

calculatorNumbers.forEach(num => {
    calcButtons.innerHTML += `<div class="numButton">${num}</div>`;
});

calculatorOperates.forEach(op => {
    calcButtons.innerHTML += `<div class="opButton">${op}</div>`;
});

let currentInput = "";
let expression = "";
let result = null;

const updateScreen = (value) => {
    calcScreen.textContent = value || "0";
};

const updateTimesTables = (value) => {
    if (value !== null) {
        timesTablesResults.innerHTML = "";
        N.forEach(number => {
            if (value % number === 0) {
                const quotient = value / number;
                timesTablesResults.innerHTML += `<div class="timesTable">${number} x ${quotient} = ${value}</div>`;
            }
        });
    } else {
        timesTablesResults.innerHTML = "<div class='timesTable'>No result to display</div>";
    }
};

// Handle number button clicks
const numButtons = document.querySelectorAll(".numButton");
const opButtons = document.querySelectorAll(".opButton");

numButtons.forEach(button => {
    button.addEventListener("click", () => {
        // Append the number to the current input
        currentInput += button.textContent;
        updateScreen(expression + currentInput); // Show the full expression with the current number
    });
});

opButtons.forEach(button => {
    button.addEventListener("click", () => {
        const operation = button.textContent;

        if (operation === "C") {
            // Reset everything for "Clear" button
            currentInput = "";
            expression = "";
            result = null;
            updateScreen("0");
            updateTimesTables(null); // Clear times tables results
        } else if (operation === "=") {
            // Finalize and evaluate the expression
            if (currentInput) {
                expression += currentInput; // Add the last number to the expression
            }
            try {
                result = eval(expression); // Use eval carefully!
                updateScreen(result); // Display the result
                updateTimesTables(result); // Update times tables with the result
                currentInput = result.toString(); // Carry over the result
                expression = ""; // Reset the expression for the next calculation
            } catch (error) {
                updateScreen("Error"); // Display error message
                currentInput = "";
                expression = "";
                result = null;
                updateTimesTables(null); // Clear times tables results
            }
        } else {
            // Append the operator to the expression
            if (result !== null && !expression) {
                // Start new calculation with the last result if there's no active expression
                expression = result + operation;
            } else if (currentInput) {
                // Add the current input and operator to the expression
                expression += currentInput + operation;
            }
            currentInput = ""; // Reset current input for the next number
            updateScreen(expression); // Show the updated expression
        }
    });
});

// Calculator Ends ________________________________________________________________________



