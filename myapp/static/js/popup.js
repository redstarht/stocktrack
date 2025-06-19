

document.addEventListener("DOMContentLoaded", function () {
  const cellBtns = document.querySelectorAll('.cell-stock-btn');



  const popup = document.getElementById('popup');
  const overlay = document.getElementById('overlay');







  cellBtns.forEach(button => {
    button.addEventListener('click', () => {
      overlay.style.display = 'block';
      popup.style.display = 'block';
      const cellData = JSON.parse(button.dataset.item)
      let stock_qty =cellData.stock_qty;
      const max_qty = cellData.max_qty;

      console.log(cellData);

      popup.innerHTML = "";

      const poplabelContainer = document.createElement('div');
      poplabelContainer.className = "pop-label-container";

      const popPnTitle = document.createElement("div");
      if (cellData.pn_id) {
        popPnTitle.textContent = cellData.product_no;

      }

      else {
        popPnTitle.textContent = "格納する品番を選んでください";
      }



      const popStockTitle = document.createElement('div');
      popStockTitle.className = "pop-stock-title";


      const popStockLabel = document.createElement('div');
      popStockLabel.className = "pop-stock-label";
      popStockLabel.textContent = stock_qty;

      const popStockMax = document.createElement('div');
      popStockMax.className = "pop-stock-max";
      popStockMax.textContent = ` / ${max_qty}`;


      popStockTitle.appendChild(popStockLabel);
      popStockTitle.appendChild(popStockMax);
      popPnTitle.appendChild(popStockTitle);

      poplabelContainer.appendChild(popPnTitle);
      poplabelContainer.appendChild(popStockTitle);
      popup.appendChild(poplabelContainer);




      const tempDiv = document.createElement('div');  // 一時的な親要素
      tempDiv.innerHTML = `
    <div class="stock-container">
        <button id="minus-btn" class="stock-btn"><i class="stock-btn-icon bi bi-dash-lg"></i></button>
        <div class="gauge-container">
            <div class="gauge-block"></div>
            <div class="gauge-block"></div>
            <div class="gauge-block"></div>
        </div>
        <button id="plus-btn" class="stock-btn"><i class="stock-btn-icon bi bi-plus-lg"></i></button>
    </div>
    <div class="close-container">
        <div>
            <button id="close-popup-btn" class="close-popup-btn">SAVE</button>
        </div>
        <div>
            <button class="close-popup-btn">Cancel</button>
        </div>
    </div>
`;

      Array.from(tempDiv.children).forEach(child => {
        popup.appendChild(child);
      });


      const closeBtn = document.getElementById('close-popup-btn');
      // ※要検討 OK と Cancel どっちもポップアップクローズさせる処理が必要
      const closeBtns = document.querySelectorAll('.close-popup-btn');


      const blocks = document.querySelectorAll('.gauge-block');
      const plusBtn = document.getElementById('plus-btn');
      const minusBtn = document.getElementById('minus-btn');
      blocks[stock_qty-1].classList.add('active');

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

      plusBtn.addEventListener('click', () => {
        if (stock_qty < max_qty) {
          blocks[stock_qty].classList.add('active');
          stock_qty++;
        }
      });

      minusBtn.addEventListener('click', () => {
        if (stock_qty > 0) {
          stock_qty--;
          blocks[stock_qty].classList.remove('active');
        }
      });


    });







  });




});

