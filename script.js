
function showMessage() {
  const msg = document.getElementById("secretMessage");
  msg.classList.remove("hidden");
}

// Fireworks animation
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];

function Firework() {
  this.x = Math.random() * canvas.width;
  this.y = canvas.height;
  this.radius = Math.random() * 2 + 1;
  this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
  this.vx = (Math.random() - 0.5) * 5;
  this.vy = Math.random() * -15 - 5;
  this.alpha = 1;

  this.update = function () {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.2;
    this.alpha -= 0.01;
  };

  this.draw = function () {
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  };
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (Math.random() < 0.2) {
    for (let i = 0; i < 20; i++) {
      fireworks.push(new Firework());
    }
  }

  fireworks.forEach((f, i) => {
    f.update();
    f.draw();
    if (f.alpha <= 0) fireworks.splice(i, 1);
  });

  requestAnimationFrame(animate);
}

animate();
