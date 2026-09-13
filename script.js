const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let w = 0;
let h = 0;
let stars = [];

function generateStars() {
  const count = Math.min(260, Math.floor((w * h) / 10000));
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.1 + 0.25,
    base: Math.random() * 0.45 + 0.15,
    amp: Math.random() * 0.35,
    speed: Math.random() * 0.01 + 0.003,
    phase: Math.random() * Math.PI * 2
  }));
}

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = Math.max(document.body.scrollHeight, window.innerHeight);
  canvas.style.height = `${h}px`;
  generateStars();
}

function draw(t) {
  ctx.clearRect(0, 0, w, h);
  for (const s of stars) {
    const alpha = s.base + s.amp * Math.sin((t || 0) * s.speed + s.phase);
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(224, 242, 254, ${Math.max(0, Math.min(1, alpha))})`;
    ctx.fill();
  }
  requestAnimationFrame(draw);
}

const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");

menuBtn.addEventListener("click", () => {
  mobileNav.classList.toggle("open");
});

mobileNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => mobileNav.classList.remove("open"));
});

document.getElementById("year").textContent = new Date().getFullYear();

window.addEventListener("resize", resize);
window.addEventListener("load", () => {
  resize();
  requestAnimationFrame(draw);
});
