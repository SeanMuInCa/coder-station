export function getRandomHexColor() {
    const hex = Math.floor(Math.random() * 16777215).toString(16); // Random hex value
    return `#${hex.padStart(6, '0')}`; // Ensure the string is 6 characters long
}