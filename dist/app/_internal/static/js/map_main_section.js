import { createPopup } from "./popup.js";
import { stackGaugeCreate } from "./common/stack_gauge.js";
import { initPnHighlight } from "./common/pn_highlight.js";
import { initZoneSort } from "./common/zone_sort.js";
import { createDisplayName } from "./common/displayname.js";

document.addEventListener("DOMContentLoaded", function () {
    const shelfGridElm = document.getElementById("shelfGrid");

    shelf_list.forEach(shelfItem => {
        // shelfContainerにcellが入る
        const shelfContainer = document.createElement("div");
        const shelfLabel = document.createElement("div");
        const shelfTitle = document.createElement("div");

        shelfTitle.textContent = shelfItem.name;
        shelfTitle.className = "shelf-title"
        shelfContainer.className = "shelf";
        shelfContainer.dataset.shelf = shelfItem.name;
        shelfContainer.dataset.zone_id = shelfItem.zone_id;


        shelfLabel.appendChild(shelfTitle);
        shelfContainer.appendChild(shelfLabel);


        const shelf_cells = cell_list.filter(cell => cell.shelf_id === shelfItem.id);


        const cellGridElm = document.createElement("div");
        cellGridElm.className = shelfItem.column_class;


        // 対象の棚にあるセルを描画
        for (let i = 0; i < shelf_cells.length; i++) {

            const cell = shelf_cells[i];
            const max_qty = cell.max_qty;

            // cell_stock_statusからcell.idでフィルターして
            // 該当のcellに所属している品番が存在しないかを見るロジック必要
            // 

            const cellElm = document.createElement("div");
            const cellLabel = document.createElement("div");
            const stack = document.createElement("div");
            const cellBtn = document.createElement("button");
            const pnSNLbl = document.createElement("i");
            const pnLenLbl = document.createElement('i');

            cellElm.className = "cell";
            cellElm.dataset.cellId = cell.id;


            // ストック状態テーブルから該当のセルIDに品番があるか確認
            const stock_cell = cell_stock_list.find(stock => stock.cell_id == cell.id);

            // 品番テーブルから街灯品番を抽出
            // 格納品番が存在した場合は該当セルに情報を描画

            let product_number = null;

            if (stock_cell) {

                const { pnItem, displayName } = createDisplayName(pn_list, stock_cell.pn_id);
                // product_number = pn_list.find(pnItem => pnItem.id == stock_cell.pn_id)

                product_number = pnItem;
                cellElm.dataset.pn = stock_cell.pn_id;

                // マップへのスタックゲージの表示
                stackGaugeCreate(max_qty, stock_cell.stock_qty, stack);

                pnSNLbl.textContent = pnItem.serial_no;
                pnSNLbl.className = "serial-lbl btn-pn-stock"
                cellBtn.dataset.displayname = displayName;
                pnLenLbl.textContent = pnItem.long_length == -1.0 ? "" : pnItem.long_length;
                pnLenLbl.className="length-lbl btn-pn-stock" 



            } else {

                pnSNLbl.className = "serial-lbl bi bi-box-arrow-in-down";
            }
            cellLabel.className = "cell-label";
            stack.className = "stack";
            cellBtn.className = shelfItem.row_class;

            // セルボタンのデータまとめ用（データがない場合は空文字)
            const dataObj = {
                cell_id: cell.id,
                is_all_pn_allowed: cell.is_all_pn_allowed,
                max_qty: max_qty ?? '',
                pn_id: stock_cell?.pn_id ?? '',
                serial_no: product_number?.serial_no ?? '',
                stock_qty: stock_cell?.stock_qty ?? 0,
                stock_fraction: stock_cell?.stock_fraction ?? '',
            }
            cellBtn.dataset.item = JSON.stringify(dataObj);




            cellBtn.appendChild(pnSNLbl);
            cellBtn.appendChild(pnLenLbl);
            cellLabel.appendChild(stack);
            cellLabel.appendChild(cellBtn);
            cellElm.appendChild(cellLabel);
            cellGridElm.appendChild(cellElm);
        }

        shelfContainer.appendChild(cellGridElm);
        shelfGridElm.appendChild(shelfContainer);

    });

    createPopup();
    initPnHighlight();
    initZoneSort();

});