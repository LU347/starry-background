const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

let stars = [];
const numberOfStars = 300;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createStars(); // Regenerate stars on resize
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createStars() {
    stars = [];
    for (let i = 0; i < numberOfStars; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5,
            alpha: 1,
            speedX: Math.random() * 0.05 + 0.1, // Slower random horizontal speed
            speedY: Math.random() * 0.05 + 0.1  // Slower random vertical speed
        });
    }
}

createStars();

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();

        // Update the position
        star.x += star.speedX;
        star.y += star.speedY;

        // Reset the position if it goes out of bounds
        if (star.x > canvas.width) {
            star.x = 0; // Reset to the left side of the canvas
        }
        if (star.y > canvas.height) {
            star.y = 0; // Reset to the top side of the canvas
        }
    });
}

function animate() {
    drawStars();
    requestAnimationFrame(animate);
}

animate();
