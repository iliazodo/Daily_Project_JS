import confetti from "https://cdn.skypack.dev/canvas-confetti";

const button = document.getElementById("myButton");

let scalar = 5;
let myShape = confetti.shapeFromText({ text: "*", scalar });

button.addEventListener("click", () => {
  const rect = button.getBoundingClientRect();
  const x = (rect.left + rect.width / 2) / window.innerWidth;
  const y = (rect.top + rect.height / 2) / window.innerHeight;

  confetti({
    shapes: [myShape],
    scalar,
    origin: { x, y },
  });
});
