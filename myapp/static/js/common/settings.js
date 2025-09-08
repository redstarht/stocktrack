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

        }
    },
    view_map: {

        // cellに格納品番が存在した場合に実行
        reload_exist_cellElm: function (cellElm, stock_cell, product_number) {
            const divIcon = cellElm.querySelector('i');
            divIcon.textContent = product_number.serial_no;
            divIcon.className = "btn-pn-stock";
        },

        // cellに格納品番がない場合に実行
        reload_none_cellElm: function (cellElm) {
            const divIcon = cellElm.querySelector('i');
            divIcon.textContent = "";
            divIcon.className = "bi bi-box-arrow-in-down";

        }

    }
};