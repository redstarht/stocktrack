import { stackGaugeCreate } from "../common/stack_gauge.js";
import { reload_shelf_data } from "../common/reload_shelf_data.js"

export function render_shelf(renderInfo, reloadCellStockData) {
    if (renderInfo.shelfGridElm.hasChildNodes()) {
        console.log("リロード処理:", reloadCellStockData);
        const pageName = 'view_map';
        const timeStampLabel = renderInfo.mainHeader.querySelector(".timeStamp");
        timeStampLabel.textContent = `更新時間：${reloadCellStockData.time_stamp}`;
        reload_shelf_data(renderInfo.shelf_list,renderInfo.shelfGridElm,reloadCellStockData,pageName)
    
    } else {
        console.log("初期描画処理");
        // mainセクションのヘッダー情報描画
        const mainTitle = document.createElement("div");
        mainTitle.textContent = "マップ確認画面";
        const timeStampLabel = document.createElement("div");
        timeStampLabel.className = "timeStamp"
        timeStampLabel.textContent = `更新時間：${reloadCellStockData.time_stamp}`;
        renderInfo.mainHeader.appendChild(mainTitle);
        renderInfo.mainHeader.appendChild(timeStampLabel)

        renderInfo.shelf_list.forEach(shelfItem => {
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


            renderInfo.cellGridElm = document.createElement("div");
            renderInfo.cellGridElm.className = shelfItem.column_class;


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
                const cellDiv = document.createElement("div");
                const pnSNLbl = document.createElement("i");
                const pnLenLbl = document.createElement("i");

                cellElm.className = "cell";
                cellElm.dataset.cellId = cell.id;


                // stock_cell_statusの情報
                // stock_cellを取得する前に存在確認
                const stock_cell = reloadCellStockData && reloadCellStockData.cell_stock_statuses
                    ? reloadCellStockData.cell_stock_statuses.find(stock => stock.cell_id == cell.id)
                    : false;

                // 品番テーブルから街灯品番を抽出
                // 格納品番が存在した場合は該当セルに情報を描画



                if (stock_cell) {
                    /*
                    stock_cellにレコードがあった場合は
                    stackGaugeCreateからゲージDOM要素を作成
                    pnSNLbl
                    
                    */
                    let product_number = null;

                    // const { pnItem, displayName } = createDisplayName(pn_list, stock_cell.pn_id);
                    product_number = pn_list.find(pnItem => pnItem.id == stock_cell.pn_id)

                    // product_number = pnItem;
                    cellElm.dataset.pn = stock_cell.pn_id;

                    // マップへのスタックゲージの表示
                    stackGaugeCreate(max_qty, stock_cell.stock_qty, stack);

                    pnSNLbl.textContent = product_number.serial_no;
                    pnSNLbl.className = "serial-lbl btn-pn-stock"
                    pnLenLbl.textContent =product_number.long_length;
                    pnLenLbl.className ="length-lbl btn-pn-stock"
                    // cellDiv.dataset.displayname = displayName;

                } else {

                    pnSNLbl.className = "bi bi-box-arrow-in-down";
                }
                cellLabel.className = "cell-label";
                stack.className = "stack";
                cellDiv.className = shelfItem.row_class;


                cellDiv.appendChild(pnSNLbl);
                cellDiv.appendChild(pnLenLbl);
                cellLabel.appendChild(stack);
                cellLabel.appendChild(cellDiv);
                cellElm.appendChild(cellLabel);
                renderInfo.cellGridElm.appendChild(cellElm);
            }

            shelfContainer.appendChild(renderInfo.cellGridElm);
            renderInfo.shelfGridElm.appendChild(shelfContainer);



        });
    }


}