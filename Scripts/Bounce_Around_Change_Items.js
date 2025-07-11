const item = document.querySelector("#Change_Items");
const container = document.querySelector(".AllPMCards");

let x = 0;
let y = 0;
let dx = 2;
let dy = 2;

const itemWidth = item.offsetWidth;
const itemHeight = item.offsetHeight;
const containerWidth = container.clientWidth;
const containerHeight = container.clientHeight;

function animate() {
  x += dx;
  y += dy;

  // Bounce on X axis
  if (x + itemWidth >= containerWidth || x <= 0) dx *= -1;
  // Bounce on Y axis
  if (y + itemHeight >= containerHeight || y <= 0) dy *= -1;

  item.style.transform = `translate(${x}px, ${y}px)`;

  requestAnimationFrame(animate);
}

animate();
