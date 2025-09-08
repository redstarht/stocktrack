import { stackGaugeCreate } from "../common/stack_gauge.js";
import { createDisplayName } from "../common/displayname.js";

export function render_shelf(renderInfo, reloadCellStockData) {
    if (renderInfo.shelfGridElm.hasChildNodes()) {
        console.log("リロード処理:", reloadCellStockData);
        const timeStampLabel = renderInfo.mainHeader.querySelector(".timeStamp");
        timeStampLabel.textContent = `更新時間：${reloadCellStockData.time_stamp}`;

        renderInfo.shelf_list.forEach(shelfItem => {
            const shelf_cells = cell_list.filter(cell => cell.shelf_id === shelfItem.id);
            shelf_cells.forEach(cell => {
                const stock_cell = reloadCellStockData && reloadCellStockData.cell_stock_statuses
                    ? reloadCellStockData.cell_stock_statuses.find(stock => stock.cell_id == cell.id)
                    : null;
                // cellElmをdata属性を使って取得
                const cellElm = renderInfo.shelfGridElm.querySelector(`[data-cell-id="${cell.id}"]`);


                if (cellElm) {
                    // stock_cellが存在する場合
                    /*
                    条件分岐
                    1.スタックゲージそのまま
                    2.スタックゲージの増減
                    3.空➡スタックゲージ表示
                    4.スタックゲージ➡空

                    現状描画されている情報(Class名から)
                    上記1~4パターンを判定

                    */
                    if (stock_cell) {
                        /*
                        div.classname = stack DOMの状態を更新
                        div.classname = cell-stock-btn DOMの状態を更新
                        // レコードあるとき
                        <i class="btn-pn-stock">004</i>

                        // レコードないとき
                        bi bi-box-arrow-in-down"                   
                
                        */
                        let product_number = pn_list.find(pnItem => pnItem.id == stock_cell.pn_id);
                        cellElm.dataset.pn = stock_cell.pn_id;

                        // スタックゲージの更新
                        const stack = cellElm.querySelector('.stack');
                        stackGaugeCreate(cell.max_qty, stock_cell.stock_qty, stack);

                        const divIcon = cellElm.querySelector('i');
                        divIcon.textContent = product_number.serial_no;
                        divIcon.className = "btn-pn-stock";
                    } else {
                        // stock_cellが存在しない場合の処理
                        const stack = cellElm.querySelector('.stack');
                        stack.innerHTML = "";
                        const divIcon = cellElm.querySelector('i');
                        divIcon.textContent = "";
                        divIcon.className = "bi bi-box-arrow-in-down";
                    }
                }

            })


        })
        // renderInfo.shelfGridElm= null;
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
                const divIcon = document.createElement("i");

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
                    divIcon
                    
                    */
                    let product_number = null;

                    // const { pnItem, displayName } = createDisplayName(pn_list, stock_cell.pn_id);
                    product_number = pn_list.find(pnItem => pnItem.id == stock_cell.pn_id)

                    // product_number = pnItem;
                    cellElm.dataset.pn = stock_cell.pn_id;

                    // マップへのスタックゲージの表示
                    stackGaugeCreate(max_qty, stock_cell.stock_qty, stack);

                    divIcon.textContent = product_number.serial_no;
                    divIcon.className = "btn-pn-stock"
                    // cellDiv.dataset.displayname = displayName;

                } else {

                    divIcon.className = "bi bi-box-arrow-in-down";
                }
                cellLabel.className = "cell-label";
                stack.className = "stack";
                cellDiv.className = "cell-stock-btn";


                cellDiv.appendChild(divIcon);
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