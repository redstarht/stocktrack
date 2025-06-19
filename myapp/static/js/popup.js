

document.addEventListener("DOMContentLoaded",function(){
const openBtns = document.querySelectorAll('.cell-stock-btn');
const closeBtn = document.getElementById('close-popup-btn');
// ※要検討 OK と Cancel どっちもポップアップクローズさせる処理が必要
const closeBtns = document.querySelectorAll('.close-popup-btn');

const popup = document.getElementById('popup');
const overlay = document.getElementById('overlay');


openBtns.forEach(button => {
    button.addEventListener('click', () => {
        overlay.style.display = 'block';
        popup.style.display = 'block';
    });
});


closeBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
    popup.style.display = 'none';
});


closeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    overlay.style.display = 'none';
    popup.style.display = 'none';
  });
});
});