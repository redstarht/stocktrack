import { stackGaugeCreate } from "../common/stack_gauge.js";
import { pageSettings } from "../common/settings.js"

export function reload_shelf_data(shelf_list, shelfGridElm, reloadCellStockData,pageName) {
    shelf_list.forEach(shelfItem => {
        const shelf_cells = cell_list.filter(cell => cell.shelf_id === shelfItem.id);
        shelf_cells.forEach(cell => {
            // reloadCellStockDataが存在し、cell_stock_statusesが定義されているかを確認
            // 条件が真の場合、cell_stock_statusesからcell.idに一致するcell_idを持つ
            // 在庫データを検索し、最初に見つかった要素をstock_cellに代入
            // 条件が偽の場合は、stock_cellにnullを代入
            const stock_cell = reloadCellStockData && reloadCellStockData.cell_stock_statuses
                ? reloadCellStockData.cell_stock_statuses.find(stock => stock.cell_id == cell.id)
                : null;

            // cellElmをdata属性を使って取得
            const cellElm = shelfGridElm.querySelector(`[data-cell-id="${cell.id}"]`);


            if (cellElm) {
                // stock_cellが存在する場合
                /*
                条件分岐
                1：スタックゲージそのまま
                2：スタックゲージの増減
                3：空➡スタックゲージ表示
                4：スタックゲージ➡空

                現状描画されている情報(Class名から)
                上記1~4パターンを判定

                */
            //    共通化部★
                if (stock_cell) {

                    // セルに格納されている品番情報を取得
                    const prod_num = pn_list.find(pnItem => pnItem.id == stock_cell.pn_id);
                    cellElm.dataset.pn = stock_cell.pn_id;

                    // スタックゲージの更新
                    const stack = cellElm.querySelector('.stack');
                    stackGaugeCreate(cell.max_qty, stock_cell.stock_qty, stack);

                    pageSettings[pageName].reload_exist_cellElm(cellElm,stock_cell,prod_num);

                    // const divIcon = cellElm.querySelector('i');
                    // divIcon.textContent = product_number.serial_no;
                    // divIcon.className = "btn-pn-stock";
                } else {
                    // stock_cellが存在しない場合の処理
                    const stack = cellElm.querySelector('.stack');
                    stack.innerHTML = "";
                    pageSettings[pageName].reload_none_cellElm(cellElm);
                    // const divIcon = cellElm.querySelector('i');
                    // divIcon.textContent = "";
                    // divIcon.className = "bi bi-box-arrow-in-down";
                }
            }

        }
    )
}
)
}
