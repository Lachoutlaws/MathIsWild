// Function to get CSS variable value from a specific theme
function getColorsForTheme(theme) {
    // Temporarily apply the theme class
    document.documentElement.classList = theme;
    console.log(`classlist: ${document.documentElement.classList}`);
    const colors = {
        // Get the computed value of --color-bg-2 for the current theme
        colorBackground: getComputedStyle(document.documentElement).getPropertyValue('--color-background').trim(),
        colorBg2: getComputedStyle(document.documentElement).getPropertyValue('--color-bg-2').trim(),
        colorBg3: getComputedStyle(document.documentElement).getPropertyValue('--color-bg-3').trim(),
        gareth: getComputedStyle(document.documentElement).getPropertyValue('--color-gareth').trim(),
        garethson: getComputedStyle(document.documentElement).getPropertyValue('--color-garethson').trim(),
        harold: getComputedStyle(document.documentElement).getPropertyValue('--color-harold').trim(),
        haroldson: getComputedStyle(document.documentElement).getPropertyValue('--color-haroldson').trim(),

    };
    // Remove the theme class after fetching the value
    document.documentElement.classList.remove(theme);
    return colors;
}

// function to find the children (colours) and set their backgrounds inline
function displayPalette(p, c) {
    for (const key in c) {
        console.log(`key: ${key}, value: ${c[key]}`);
        const colourSpan = document.createElement('span');
        colourSpan.classList.add('colour');
        colourSpan.classList.add(`${key}`);
        colourSpan.style.backgroundColor = c[key];
        p.appendChild(colourSpan);
    }
}

// get the "palette" containers
const paletteLight = document.querySelector('.palette.light');
const paletteDark = document.querySelector('.palette.dark');

// Get colors for both themes
const lightColors = getColorsForTheme('theme-light');
const darkColors = getColorsForTheme('theme-dark');
// fix the theme back to normal as soon as we're done
applySavedTheme(); // assumes this is declare/defined elsewhere

// Now you can apply these colors dynamically
displayPalette(paletteLight, lightColors);
displayPalette(paletteDark, darkColors);