

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


      // 品番リストの表示
      const inputContainer = document.createElement("div");
      inputContainer.className = "scroll-box";
      inputContainer.id = "input-container";

      const table = document.createElement("table");
      table.className = "pn-table";

      let input_pn = [];
      // 全品番許可と個別品番許可の場合の処理
      cellData.is_all_pn_allowed

      if (cellData.is_all_pn_allowed) {
        input_pn = pn_list
      } else {
        allow_pn = allow_storage_list.filter(item => item.cell_id === cellData.cell_id);
        allow_pn.forEach(pn =>{
          input_pn = pn_list.filter(item => item.id === pn.pn_id)
        })
      }

      input_pn.forEach(pn => {
        const newRow = document.createElement("tr");
        newRow.className = "pn-row";
        newRow.dataset.id = pn.id;

        const pnCell = document.createElement("td");
        pnCell.className = "pn-cell"
        pnCell.textContent = pn.product_no;
        pnCell.dataset.id = pn.id; // データセットにIDを設定

        const radioBtn = document.createElement("input");
        radioBtn.className = "radio-btn";
        radioBtn.type = "radio";
        radioBtn.name = "choice";
        radioBtn.value = true;

        const check_pn = allow_storage_list.filter(item => item.pn_id === pn.id);

        if (check_pn.length > 0) {
          radioBtn.checked = true;
        };

        radioBtn.addEventListener("change", function () {
          if (radioBtn.checked) {
            newRow.dataset.allow_storage = true;
          } else {
            delete newRow.dataset.allow_storage;
          }
        });

        newRow.appendChild(pnCell);
        newRow.appendChild(radioBtn);
        table.appendChild(newRow);
        inputContainer.appendChild(table);
        popup.appendChild(inputContainer);
      });




      // 収容数操作部
      const stockContainer = document.createElement('div');
      stockContainer.className = "stock-container"

      const minusBtn = document.createElement('button');
      minusBtn.className = "stock-btn";
      minusBtn.id = "stock-btn";
      const minusIcon = document.createElement('i');
      minusIcon.className = "stock-btn-icon bi bi-dash-lg";
      minusBtn.appendChild(minusIcon);


      const gaugeContainer = document.createElement('div');
      gaugeContainer.className = "gauge-container";

      for (let i = 0; i < 3; i++) {
        const block = document.createElement("div");
        block.className = "gauge-block";
        gaugeContainer.appendChild(block);
      }

      const plusBtn = document.createElement('button');
      plusBtn.className = "stock-btn";
      plusBtn.id = "stock-btn";
      const plusIcon = document.createElement('i');
      plusIcon.className = "stock-btn-icon bi bi-plus-lg";
      plusBtn.appendChild(plusIcon);


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



      popup.appendChild(stockContainer);
      popup.appendChild(closeContainer);

      const closeBtn = document.getElementById('close-popup-btn');
      // ※要検討 OK と Cancel どっちもポップアップクローズさせる処理が必要
      const closeBtns = document.querySelectorAll('.close-popup-btn');


      const blocks = document.querySelectorAll('.gauge-block');
      const qty = Number(stock_qty) || 0; // undefined や null の場合 0 にする

      if (qty >= 1 && qty <= blocks.length) {
        for(let i =0; i<=qty;i++)
        blocks[i].classList.add('active');
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
          popStockLabel.textContent = stock_qty;
        }
      });

      minusBtn.addEventListener('click', () => {
        if (stock_qty > 0) {
          stock_qty--;
          blocks[stock_qty].classList.remove('active');
          popStockLabel.textContent = stock_qty;
        }
      });


    });







  });




});

