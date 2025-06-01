const maxBlocks = 6;
let currentBlocks = 0;

const blocks = document.querySelectorAll('.gauge-block');
const plusBtn = document.getElementById('plus-btn');
const minusBtn = document.getElementById('minus-btn');

plusBtn.addEventListener('click', () => {
  if (currentBlocks < maxBlocks) {
    blocks[currentBlocks].classList.add('active');
    currentBlocks++;
  }
});

minusBtn.addEventListener('click', () => {
  if (currentBlocks > 0) {
    currentBlocks--;
    blocks[currentBlocks].classList.remove('active');
  }
});
