

document.addEventListener("DOMContentLoaded", function () {
  const cellBtns = document.querySelectorAll('.cell-stock-btn');



  const popup = document.getElementById('popup');
  const overlay = document.getElementById('overlay');







  cellBtns.forEach(button => {
    button.addEventListener('click', () => {
      overlay.style.display = 'block';
      popup.style.display = 'block';
      const cellData = JSON.parse(button.dataset.item)
      let stock_qty = cellData.stock_qty;
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
      // popPnTitle.appendChild(popStockTitle);

      poplabelContainer.appendChild(popPnTitle);
      poplabelContainer.appendChild(popStockTitle);
      popup.appendChild(poplabelContainer);



      // 収容数操作部
      const stockContainer = document.createElement('div');
      stockContainer.className = "stock-container"

      const minusBtn = document.createElement('div');
      minusBtn.className = "stock-btn";
      minusBtn.id = "stock-btn";
      minusBtn.innerHTML = `<i class="stock-btn-icon bi bi-dash-lg"></i>`

      const gaugeContainer = document.createElement('div');
      gaugeContainer.className = "gauge-container";

      for (let i = 0; i < 3; i++) {
        const block = document.createElement("div");
        block.className = "gauge-block";
        gaugeContainer.appendChild(block);
      }

      const plusBtn = document.createElement('div');
      plusBtn.className = "stock-btn";
      plusBtn.id = "stock-btn";
      plusBtn.innerHTML = `<i class="stock-btn-icon bi bi-plus-lg"></i>`


      stockContainer.appendChild(minusBtn);
      stockContainer.appendChild(gaugeContainer);
      stockContainer.appendChild(plusBtn);

      const closeContainer = document.createElement('div');
      closeContainer.className = "close-container";

      const saveContainer = document.createElement('div');
      saveContainer.className = "save-container";

      const saveBtn = document.createElement('button');
      saveBtn.className = "close-popup-btn";
      saveBtn.id = "close-popup-btn";
      saveBtn.textContent = "SAVE";


      saveContainer.appendChild(saveBtn);

      const cancelContainer = document.createElement('div');
      cancelContainer.className = "cancel-container";

      const cancelBtn = document.createElement('button');
      cancelBtn.className = "close-popup-btn";
      cancelBtn.textContent = "Cancel"
      cancelContainer.appendChild(cancelBtn);
      
      closeContainer.appendChild(saveContainer);
      closeContainer.appendChild(cancelContainer);

      stockContainer.appendChild(closeContainer);

      popup.appendChild(stockContainer);

      const closeBtn = document.getElementById('close-popup-btn');
      // ※要検討 OK と Cancel どっちもポップアップクローズさせる処理が必要
      const closeBtns = document.querySelectorAll('.close-popup-btn');


      const blocks = document.querySelectorAll('.gauge-block');
      const qty = Number(stock_qty) || 0; // undefined や null の場合 0 にする

      if (qty >= 1 && qty <= blocks.length) {
        blocks[qty - 1].classList.add('active');
      }

      cancelBtn.addEventListener('click', () => {
        overlay.style.display = 'none';
        popup.style.display = 'none';
      });
      saveBtn.addEventListener('click', () => {
        overlay.style.display = 'none';
        popup.style.display = 'none';
      });


      // closeBtns.forEach(btn => {
      //   btn.addEventListener('click', () => {
      //     overlay.style.display = 'none';
      //     popup.style.display = 'none';
      //   });
      // });

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

