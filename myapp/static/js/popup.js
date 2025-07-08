import { createPopupPnlist } from "./common/pn_list.js";
import { pop_serial_no_search } from "./common/serial_no_search.js";
import { saveCheckedData } from "./popup/save_inout.js";

export function createPopup() {

  const cellBtns = document.querySelectorAll('.cell-stock-btn');

  const overlay = document.getElementById('overlay');
  const popup = document.getElementById('popup');




  // 未格納セルは inputContainerはnullのまま
  let inputContainer = null;

  // input_pnをモジュール内スコープ変数として宣言 (popup終了処理時に都度初期化)
  let input_pn = [];

  cellBtns.forEach(button => {
    button.addEventListener('click', () => {
      overlay.style.display = 'block';
      popup.style.display = 'block';
      const cellData = JSON.parse(button.dataset.item)
      let stock_qty = cellData.stock_qty;
      const max_qty = cellData.max_qty;
      const displayName = button.dataset.displayname;

      // 収容数操作部
      const stockContainer = document.createElement('div');
      stockContainer.className = "pop-stock-container"
      const closeContainer = document.createElement('div');
      closeContainer.className = "close-container";

      // stockContainer構造定義
      const minusBtn = document.createElement('button');
      minusBtn.className = "stock-btn";
      minusBtn.classList.add("minus-btn");
      minusBtn.id = "stock-btn";
      const minusIcon = document.createElement('i');
      minusIcon.className = "stock-btn-icon bi bi-dash-lg";
      minusBtn.appendChild(minusIcon);
        // ゲージコンテナの定義
      const gaugeContainer = document.createElement('div');
      gaugeContainer.className = "gauge-container";

      for (let i = 0; i < max_qty; i++) {
        const block = document.createElement("div");
        block.className = "gauge-block";
        gaugeContainer.appendChild(block);
      }

      const plusBtn = document.createElement('button');
      plusBtn.className = "stock-btn";
      plusBtn.classList.add("plus-btn");
      plusBtn.id = "stock-btn";
      const plusIcon = document.createElement('i');
      plusIcon.className = "stock-btn-icon bi bi-plus-lg";
      plusBtn.appendChild(plusIcon);


      stockContainer.appendChild(minusBtn);
      stockContainer.appendChild(gaugeContainer);
      stockContainer.appendChild(plusBtn);



      // 前回クリック時のinnerHTMLの初期化
      popup.innerHTML = "";

      const poplabelContainer = document.createElement('div');
      poplabelContainer.className = "pop-label-container";

      const popPnTitle = document.createElement("div");

      // 既存格納製品と新規格納製品かでHTML構造を変更
      if (cellData.pn_id) {
        popPnTitle.textContent = displayName;
        // 既存格納製品の入出時はPOPUPのCSSを変更
        popup.classList.add("popup-resize");
        poplabelContainer.classList.add("popLblCont-resize");
        stockContainer.classList.add("popStkCont-resize");
        closeContainer.classList.add("clcCont-resize");


      }

      else {
        popup.classList.remove("popup-resize");
        poplabelContainer.classList.remove("popLblCont-resize");
        stockContainer.classList.remove("popStkCont-resize");
        closeContainer.classList.remove("clcCont-resize");
        popPnTitle.textContent = "格納する背番号を選んでください";

        const searchContainer = document.createElement('div');
        searchContainer.className = "pop-search-container";



        const searchInput = document.createElement('input');
        searchInput.type = "search";
        searchInput.id = "pop-serial-search";
        searchInput.placeholder = "背番号検索";
        searchInput.name = "pop-serial_no";

        const searchBtn = document.createElement('button');
        searchBtn.textContent = "検索";
        searchBtn.className = "pop-search-button";
        searchBtn.id = "pop-serial-search-btn";

        searchContainer.appendChild(searchInput);
        searchContainer.appendChild(searchBtn);
        poplabelContainer.appendChild(searchContainer);


        // 品番リストの表示（未格納セルのみ）
        inputContainer = document.createElement("div");
        inputContainer.className = "scroll-box";
        inputContainer.id = "input-container";

        const table = document.createElement("table");
        table.dataset.cell_id = cellData.cell_id;
        table.className = "pn-table";



        // 全品番許可と個別品番許可の場合の処理
        if (cellData.is_all_pn_allowed) {
          input_pn = pn_list
        } else {
          // 許可品番のみ抽出
          console.log("許可品番リスト", allow_storage_list);

          let allow_pn = allow_storage_list.filter(item => item.cell_id === cellData.cell_id);
          console.log("許可品番", allow_pn);
          allow_pn.forEach(pn => {
            input_pn.push(...pn_list.filter(item => item.id === pn.pn_id));
            console.log("抽出された品番", input_pn);
          })
        }

        // 絞り込みボタンの処理
        searchBtn.addEventListener('click', () => {
          const searchInput = document.getElementById('pop-serial-search');
          const searchValue = searchInput.value.trim();
          if (!searchValue) {
            createPopupPnlist(input_pn, table);
          }
          pop_serial_no_search(searchValue, table);
        });


        // ポップアップ初期表示
        // 品番リストの表示
        console.log("ポップアップ表示用品番リスト", input_pn);
        const newtable = createPopupPnlist(input_pn, table);
        inputContainer.appendChild(newtable);

      }


      // 格納されている在庫数の表示（共通 何も格納されてなければ0）
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

      poplabelContainer.appendChild(popPnTitle);
      poplabelContainer.appendChild(popStockTitle);
      popup.appendChild(poplabelContainer);
      if (inputContainer !== null) {
        popup.appendChild(inputContainer);
      };











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


      // 格納されている収容数のブロック描画
      if (qty >= 1 && qty <= blocks.length) {
        for (let i = 0; i < qty; i++) {
          blocks[i].classList.add('active');
        }
      }


      // プラスボタンの処理
      plusBtn.addEventListener('click', () => {
        if (stock_qty < max_qty) {
          blocks[stock_qty].classList.add('active');
          stock_qty++;
          popStockLabel.textContent = stock_qty;
        }
      });

      // マイナスボタンの処理
      minusBtn.addEventListener('click', () => {
        if (stock_qty > 0) {
          stock_qty--;
          blocks[stock_qty].classList.remove('active');
          popStockLabel.textContent = stock_qty;
        }
      });

      // キャンセルボタンの処理
      cancelBtn.addEventListener('click', () => {
        overlay.style.display = 'none';
        popup.style.display = 'none';
        // モジュール内変数の初期化
        input_pn = [];
        inputContainer = null;
      });

      // SAVEボタンの処理
      saveBtn.addEventListener('click', () => {
        overlay.style.display = 'none';
        popup.style.display = 'none';
        // データ格納・保存処理
        saveCheckedData(button, cellData, stock_qty);
        // モジュール内変数の初期化
        input_pn = [];
        inputContainer = null;

      });

    });
  });
};

