const canvas = document.getElementById('circleCanvas');
const ctx = canvas.getContext('2d');
const resetButton = document.getElementById('resetButton');
const predictionDisplay = document.getElementById('prediction');

// Circle parameters
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = 200;
let isDrawing = false;
let drawnArea = 0;

// Draw an empty circle initially
function drawCircle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI); // Draw the circle outline
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 5;
    ctx.stroke();
}

// Calculate the percentage of the circle drawn
function calculatePercentage() {
    const fullCircle = Math.PI * radius * radius; // Full area of the circle
    const drawnCircle = drawnArea; // The area of the circle that was drawn
    const percentage = (drawnCircle / fullCircle) * 100; // Calculate the percentage
    predictionDisplay.textContent = `Percentage: ${Math.min(Math.round(percentage), 100)}%`;
}

// Start drawing when mouse is pressed
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    const mouseX = e.offsetX;
    const mouseY = e.offsetY;

    // Start from the mouse position and draw a small circle
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'blue';
    ctx.fill();

    // Update the drawn area
    const distance = Math.hypot(mouseX - centerX, mouseY - centerY);
    if (distance <= radius) {
        drawnArea += Math.PI * 5 * 5; // Small increment for the drawn area
    }

    calculatePercentage();
});

// Continue drawing when the mouse is moved
canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;

    const mouseX = e.offsetX;
    const mouseY = e.offsetY;

    // Draw a small circle at the mouse position if within the boundary of the circle
    const distance = Math.hypot(mouseX - centerX, mouseY - centerY);
    if (distance <= radius) {
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 5, 0, 2 * Math.PI);
        ctx.fillStyle = 'blue';
        ctx.fill();
        
        // Update the drawn area
        drawnArea += Math.PI * 5 * 5; // Small increment for the drawn area
        calculatePercentage();
    }
});

// Stop drawing when the mouse is released
canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

// Reset button to reset the drawing
resetButton.addEventListener('click', () => {
    drawnArea = 0;
    drawCircle();
    predictionDisplay.textContent = 'Percentage: 0%';
});

// Initial setup
drawCircle();
