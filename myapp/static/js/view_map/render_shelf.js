import { stackGaugeCreate } from "../common/stack_gauge.js";
import { reload_shelf_data } from "../common/reload_shelf_data.js"

export function render_shelf(renderInfo) {
    if (renderInfo.shelfGridElm.hasChildNodes()) {
        const pageName = 'view_map';
        const timeStampLabel = renderInfo.mainHeader.querySelector(".timeStamp");
        timeStampLabel.textContent = `更新時間：${renderInfo.reloadCellStockData.time_stamp}`;
        reload_shelf_data(renderInfo.shelf_list, renderInfo.shelfGridElm, renderInfo.reloadCellStockData, pageName)

    } else {
        console.log("初期描画処理");
        // mainセクションのヘッダー情報描画
        const mainTitle = document.createElement("div");
        mainTitle.textContent = "マップ確認画面";
        const movebutton = document.createElement("button");
        movebutton.textContent = "入出庫ログ確認"
        movebutton.className = "movebutton"
        movebutton.setAttribute("onclick",`window.location.href="${logviewUrl}"`)


        const timeStampLabel = document.createElement("div");
        timeStampLabel.className = "timeStamp"
        timeStampLabel.textContent = `更新時間：${renderInfo.reloadCellStockData.time_stamp}`;
        renderInfo.mainHeader.appendChild(mainTitle);
        renderInfo.mainHeader.appendChild(movebutton);
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
                const stock_cell = renderInfo.reloadCellStockData && renderInfo.reloadCellStockData.cell_stock_statuses
                    ? renderInfo.reloadCellStockData.cell_stock_statuses.find(stock => stock.cell_id == cell.id)
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
                    pnLenLbl.textContent = product_number.long_length== -1.0 ? "" : product_number.long_length;
                    pnLenLbl.className = "length-lbl btn-pn-stock"
                    // cellDiv.dataset.displayname = displayName;

                } else {

                    pnSNLbl.className = "serial-lbl bi bi-box-arrow-in-down";
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

let change_cellData = new Map();

// 配列をマップオブジェクトへ
function createMapByCellId(arr) {
    const map = new Map();
    arr.forEach(item => {
        map.set(item.cell_id, item);
    });
    return map;
}

function findDomCellById(domCells, cell_id) {
    for (const cell of domCells) {
        if (cell.getAttribute("data-cell-id") === String(cell_id)) {
            return cell;
        }
    }
    return null;
}


export function updateChangeCellData(nowData, prevData) {
    const nowMap = createMapByCellId(nowData.cell_stock_statuses);
    const prevMap = createMapByCellId(prevData.cell_stock_statuses);
    const domCells = document.querySelectorAll(".cell");
    // すべてのcell_idを洗い出す
    const allCellIds = new Set([...nowMap.keys(), ...prevMap.keys()]);

    allCellIds.forEach(cell_id => {
        const domcell = findDomCellById(domCells, cell_id);
        const nowItem = nowMap.get(cell_id);
        const prevItem = prevMap.get(cell_id);
        // ページ新規描画時
        if (!prevItem && nowItem) {
            // 新規追加
            // flash_countを30にセット
            change_cellData.set(cell_id, { ...nowItem, flash_count: 30, is_deleted: false, type: "blink-new-in" });
            domcell.className = 'cell blink-new-in';

            // 削除：prevにはあってnowにはない
        } else if (prevItem && !nowItem) {
            // 削除
            // すでにchange_cellDataにあればflash_countをリセット、なければ新規に追加
            const existing = change_cellData.get(cell_id);
            if (existing) {
                change_cellData.set(cell_id, { ...existing, flash_count: 30, is_deleted: true, type: "blink-out" });
                domcell.className ='cell blink-out';
            } else {
                change_cellData.set(cell_id, { cell_id: cell_id, flash_count: 30, is_deleted: true, type: "blink-out" });
                domcell.className ='cell blink-out';
            }
            // nowもprevもある:入りだし描画の更新
        } else if (nowItem && prevItem) {
            // 両方に存在 → プロパティが異なるかチェック
            const isDifferent = nowItem.pn_id !== prevItem.pn_id || nowItem.stock_qty !== prevItem.stock_qty;
            if (isDifferent) {
                // 変更あり
                const existing = change_cellData.get(cell_id);
                // flash_countは既存があればリセット、なければ30にセット
                const flash_count = existing ? 30 : 30;
                if (nowItem.stock_qty > prevItem.stock_qty) {
                    change_cellData.set(cell_id, { ...nowItem, flash_count, is_deleted: false, type: "blink-in" });
                    domcell.className ='cell blink-in';
                } else {
                    change_cellData.set(cell_id, { ...nowItem, flash_count, is_deleted: false, type: "blink-out" });
                    domcell.className ='cell blink-out';
                }
            }
        }
        // 変更なしの場合は何もしない
    });
}


// setintervalで1秒間間隔で実行
export function decrementFlashCount() {
    const cells = document.querySelectorAll(".cell");

    for (const [cell_id, data] of change_cellData.entries()) {
        if (data.flash_count > 0) {
            data.flash_count--;

            //   カウントが0でクラスをリセット
            if (data.flash_count === 0) {
                change_cellData.delete(cell_id);
                cells.forEach(cell => {
                    if (cell.getAttribute("data-cell-id") === String(cell_id)) {
                        cell.className = 'cell';
                    }
                }
                )
            } else {
                change_cellData.set(cell_id, data);
            }
        }
    }
}



