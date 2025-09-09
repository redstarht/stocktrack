export const pageSettings = {
    // cellElm : 各棚のcellE一意に特定するための変数
    // stock_cell : 各棚単位のパイプ格納情報
    // product_number : 品番情報

    inout_map: {
        // 情報をリロードする関数
        // cellに格納品番が存在した場合に実行
        reload_exist_cellElm: function (cellElm, stock_cell, product_number) {
            const cellStockBtn = cellElm.querySelector('.cell-stock-btn');
            const cellData = JSON.parse(cellStockBtn.dataset.item);
            // button要素 data-item更新
            cellData.stock_qty = stock_cell.stock_qty;
            cellData.pn_id = stock_cell.pn_id;
            cellData.serial_no = product_number.serial_no;
            cellData.stock_fraction = stock_cell.stock_fraction;
            cellStockBtn.dataset.item = JSON.stringify(cellData);

            
            // i要素 ラベル命名

            const pnSNLbl = cellStockBtn.querySelector('.serial-lbl');
            pnSNLbl.className = "serial-lbl btn-pn-stock";
            pnSNLbl.textContent = product_number.serial_no;
            const pnLenLbl = cellStockBtn.querySelector('.length-lbl')

            // .length-lblチェック※あれば既に格納要素の情報を変更
            if (pnLenLbl) {
                pnLenLbl.className = "length-lbl btn-pn-stock";
                pnLenLbl.textContent = product_number.long_length;
            } else {
                pnLenLbl = document.createElement('i');
                pnLenLbl.className = "length-lbl btn-pn-stock";
                pnLenLbl.textContent = product_number.long_length;
                cellStockBtn.appendChild(pnLenLbl);
            };
            // ハイライト用にcellにdata-pnをセット
            cellElm.dataset.pn = stock_cell.pn_id;


        },
        // cellに格納品番がない場合に実行
        reload_none_cellElm: function (cellElm) {
            const cellStockBtn = cellElm.querySelector('.cell-stock-btn');
            const cellData = JSON.parse(cellStockBtn.dataset.item);
            cellData.stock_qty = 0;
            cellData.pn_id = "";
            cellData.serial_no = "";
            cellData.stock_fraction = "";
            cellStockBtn.dataset.item = JSON.stringify(cellData);
            cellElm.removeAttribute("data-pn");

            // ハイライト解除
            if (cellElm.classList.contains("highlight")) {
                cellElm.classList.
                    remove("highlight");
            }
            const pnSNLbl = cellStockBtn.querySelector('.serial-lbl');
            pnSNLbl.className = "serial-lbl bi bi-box-arrow-in-down";
            pnSNLbl.textContent = null;
            const pnLenLbl = cellStockBtn.querySelector('.length-lbl')
            // .length-lblチェック※あれば既に格納要素の情報を変更
            if (pnLenLbl) {
                const pnLenLbl = cellStockBtn.querySelector('.length-lbl')
                cellStockBtn.removeChild(pnLenLbl);
            } else {
                const pnLenLbl = document.createElement('i');
                pnLenLbl.className = "length-lbl btn-pn-stock";
                pnLenLbl.textContent = product_number.long_length;
                cellStockBtn.appendChild(pnLenLbl);
            };

        }
    },
    view_map: {

        // cellに格納品番が存在した場合に実行
        reload_exist_cellElm: function (cellElm, stock_cell, product_number) {
            const divIcon = cellElm.querySelector('i');
            divIcon.textContent = product_number.serial_no;
            divIcon.className = "serial-lbl btn-pn-stock";

            const pnLenLbl = cellStockBtn.querySelector('.length-lbl');
            pnLenLbl.className = "length-lbl btn-pn-stock";
            pnLenLbl.textContent = product_number.long_length;
        },

        // cellに格納品番がない場合に実行
        reload_none_cellElm: function (cellElm) {
            const divIcon = cellElm.querySelector('i');
            divIcon.textContent = "";
            divIcon.className = "bi bi-box-arrow-in-down";

        }

    }
};