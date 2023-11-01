const doc = document;

let oldPos = {y: window.scrollY, x: window.scrollX};
let isCtrl = false;

doc.addEventListener('keyup', (e) => {
  return;
  e.key === "Control" ? isCtrl = true : null;
});
doc.addEventListener('keydown', (e) => {
  return;
  e.key === "Control" ? isCtrl = false : null;
});

doc.addEventListener("scroll", () => {
  return;
  const currentPos = {y: window.scrollY, x: window.scrollX};
  const direction = {
    y: currentPos.y > oldPos.y ? "DOWN" : "UP",
    x: currentPos.x > oldPos.x ? "RIGHT" : "LEFT",
  }
  oldPos = currentPos;

  console.log(direction);
})
