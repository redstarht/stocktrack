export const pageSettings = {
    inout_map: {
        // 情報をリロードする関数
        reload_exist_cellElm: function (cellElm,stock_cell,product_number) {
            const cellStockBtn = cellElm.querySelector('.cell-stock-btn');
            const cellData = JSON.parse(cellStockBtn.dataset.item);
            // HTMLデータ属性更新
            cellData.stock_qty = stock_cell.stock_qty;
            cellData.pn_id = stock_cell.pn_id;
            cellData.serial_no = serial_no;
            cellData.stock_fraction = stock_fraction;
            cellStockBtn.dataset.item = JSON.stringify(cellData);
        },
        reload_none_cellElm: function (cellElm) {
            // 取り出した時のマップ描画処理  / 送信データ処理(格納０個時にしたときの処理)
            if (new_stock_qty == 0) {
                console.log("✅全ストック取り出し時の処理", new_stock_qty)
                btnIcon.className = "bi bi-box-arrow-in-down";
                btnIcon.textContent = null;
                cell.removeAttribute("data-pn");
                // セルデータの処理
                cellData.pn_id = null;
                cellData.serial_no = null;
                button.dataset.item = JSON.stringify(cellData);
                // button.removeAttribute("data-item");
                button.removeAttribute("data-displayname");
                if (cell.classList.contains("highlight")) {
                    cell.classList.remove("highlight");
                }


            } else {
                console.log("✅新規または部分取り出し字の処理", new_stock_qty)
                btnIcon.className = "btn-pn-stock";
                btnIcon.textContent = serial_no;
                // ハイライト用にcellにdata-pnをセット
                cell.dataset.pn = pn_id;
            }

        }
    },
    view_map: {

        // cellに格納品番が存在した場合に実行
        reload_exist_cellElm: function (cellElm,stock_cell,product_number) {
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