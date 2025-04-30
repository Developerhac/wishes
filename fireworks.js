const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');

let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createFirework() {
    const colors = ['#ff3f81', '#ffc93c', '#ffffff', '#00e5ff', '#7cffcb'];
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height / 2;
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    for (let i = 0; i < 50; i++) {
        particles.push({
            x: x,
            y: y,
            angle: Math.random() * 2 * Math.PI,
            speed: Math.random() * 4 + 1,
            radius: Math.random() * 2 + 1,
            color: color,
            life: 100
        });
    }
}

function animateFireworks() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, index) => {
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        p.life--;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        if (p.life <= 0) {
            particles.splice(index, 1);
        }
    });

    requestAnimationFrame(animateFireworks);
}

setInterval(createFirework, 1000);
animateFireworks();
