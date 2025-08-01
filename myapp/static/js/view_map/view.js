import { stackGaugeCreate } from "../common/stack_gauge.js";
import { initPnHighlight } from "../common/pn_highlight.js";
import { initZoneSort } from "../common/zone_sort.js";
import { createDisplayName } from "../common/displayname.js";
import { get_cell_status_data } from "./data_fetch.js"
import { render_shelf } from "./render_shelf.js";

document.addEventListener("DOMContentLoaded", async function () {
    const shelfGridElm = document.getElementById("shelfGrid");
    shelfGridElm.innerHTML = "";
    let reloadCellStockData = null;
    let cellGridElm = null;

    const renderInfo = {
        shelf_list: shelf_list, //棚データ
        shelfGridElm: shelfGridElm, //shelf の DOM
        reloadCellStockData: reloadCellStockData,//cellの最新格納ステータス
        cellGridElm: cellGridElm//cellのDOM
    }

    //描画情報更新 
    async function reloadData(renderInfo) {
        try {
            reloadCellStockData = await get_cell_status_data();
            render_shelf(renderInfo, reloadCellStockData);

        } catch (error) {
            console.log(error)
        } finally {
            // 2秒後に再度データを取得
            setTimeout(() => reloadData(renderInfo), 2000);

        }
    }

    await reloadData(renderInfo)






    // shelf_list.forEach(shelfItem => {
    //     // shelfContainerにcellが入る
    //     const shelfContainer = document.createElement("div");
    //     const shelfLabel = document.createElement("div");
    //     const shelfTitle = document.createElement("div");

    //     shelfTitle.textContent = shelfItem.name;
    //     shelfTitle.className = "shelf-title"
    //     shelfContainer.className = "shelf";
    //     shelfContainer.dataset.shelf = shelfItem.name;
    //     shelfContainer.dataset.zone_id = shelfItem.zone_id;


    //     shelfLabel.appendChild(shelfTitle);
    //     shelfContainer.appendChild(shelfLabel);


    //     const shelf_cells = cell_list.filter(cell => cell.shelf_id === shelfItem.id);


    //     cellGridElm = document.createElement("div");
    //     cellGridElm.className = shelfItem.css_class;


    //     // 対象の棚にあるセルを描画
    //     for (let i = 0; i < shelf_cells.length; i++) {

    //         const cell = shelf_cells[i];
    //         const max_qty = cell.max_qty;

    //         // cell_stock_statusからcell.idでフィルターして
    //         // 該当のcellに所属している品番が存在しないかを見るロジック必要
    //         // 

    //         const cellElm = document.createElement("div");
    //         const cellLabel = document.createElement("div");
    //         const stack = document.createElement("div");
    //         const cellDiv = document.createElement("div");
    //         const divIcon = document.createElement("i");

    //         cellElm.className = "cell";

    //         // stock_cellを取得する前に存在確認
    //         const stock_cell = reloadCellStockData && reloadCellStockData.cell_stock_statuses
    //             ? reloadCellStockData.cell_stock_statuses.find(stock => stock.cell_id == cell.id)
    //             : null;

    //         // 品番テーブルから街灯品番を抽出
    //         // 格納品番が存在した場合は該当セルに情報を描画

    //         let product_number = null;

    //         if (stock_cell) {

    //             const { pnItem, displayName } = createDisplayName(pn_list, stock_cell.pn_id);
    //             product_number = pn_list.find(pnItem => pnItem.id == stock_cell.pn_id)

    //             product_number = pnItem;
    //             cellElm.dataset.pn = stock_cell.pn_id;

    //             // マップへのスタックゲージの表示
    //             stackGaugeCreate(max_qty, stock_cell.stock_qty, stack);

    //             divIcon.textContent = pnItem.serial_no;
    //             divIcon.className = "btn-pn-stock"
    //             cellDiv.dataset.displayname = displayName;



    //         } else {

    //             divIcon.className = "bi bi-box-arrow-in-down";
    //         }
    //         cellLabel.className = "cell-label";
    //         stack.className = "stack";
    //         cellDiv.className = "cell-stock-btn";




    //         cellDiv.appendChild(divIcon);
    //         cellLabel.appendChild(stack);
    //         cellLabel.appendChild(cellDiv);
    //         cellElm.appendChild(cellLabel);
    //         cellGridElm.appendChild(cellElm);
    //     }

    //     shelfContainer.appendChild(cellGridElm);
    //     shelfGridElm.appendChild(shelfContainer);

    // });

    initPnHighlight();
    initZoneSort();

});