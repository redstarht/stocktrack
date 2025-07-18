function stock_ctrl(cell_id, product_number, max_qty, stock_qty) {

  const maxBlocks = max_qty;
  let currentBlocks = stock_qty ?? 0;

  const blocks = document.querySelectorAll('.gauge-block');
  const plusBtn = document.getElementById('plus-btn');
  const minusBtn = document.getElementById('minus-btn');


  const popup = document.getElementById('popup');

  const poplabelContainer = document.createElement('div');
  poplabelContainer.className = "pop-label-container";

  const popPnTitle = document.createElement("div");
  if (Array.isArray(product_number)) {
    popPnTitle.textContent = "格納する品番を選んでください";
  }

  else {
    popPnTitle.textContent = product_number.product_no;
  }



  const popStockTitle = document.createElement('div');
  popStockTitle.className = "pop-stock-title";
  

  const popStockLabel = document.createElement('div');
  popStockLabel.className = "pop-stock-label";
  popStockLabel.textContent = currentBlocks;

  const popStockMax = document.createElement('div');
  popStockMax.className = "pop-stock-max";
  popStockMax.textContent = maxBlocks;


  popStockTitle.appendChild(popStockLabel);
  popStockTitle.textContent = "/";
  popPnTitle.appendChild(popStockMax);

  poplabelContainer.appendChild(popPnTitle);
  poplabelContainer.appendChild(popStockTitle);
  popup.appendChild(poplabelContainer);



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





}

