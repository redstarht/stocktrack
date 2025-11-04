import { stackGaugeCreate } from "../common/stack_gauge.js";
import { initPnHighlight } from "../common/pn_highlight.js";
import { initZoneSort, cycleZone } from "../common/zone_sort.js";
import { get_cell_status_data } from "../common/data_fetch.js"
import { render_shelf, updateChangeCellData, decrementFlashCount } from "./render_shelf.js";

document.addEventListener("DOMContentLoaded", async function () {
    const pageId = "viewmap";

    const shelfGridElm = document.getElementById("shelfGrid");
    const mainHeader = document.getElementById("mainheader");
    shelfGridElm.innerHTML = "";
    let reloadCellStockData = null;
    let cellGridElm = null;

    const renderInfo = {
        shelf_list: shelf_list, //棚データ
        shelfGridElm: shelfGridElm, //shelf の DOM
        reloadCellStockData: reloadCellStockData,//cellの最新格納ステータス
        cellGridElm: cellGridElm,//cellのDOM
        mainHeader: mainHeader,
        pageId: pageId
    }

    let prev_reloadCellStockData = null;
    let now_reloadCellStockData = null;

    //描画情報更新 
    async function reloadData(renderInfo) {
        try {
            now_reloadCellStockData = await get_cell_status_data();
            renderInfo.reloadCellStockData = now_reloadCellStockData;

            // 入出時のハイライト処理
            if (prev_reloadCellStockData) {
                updateChangeCellData(now_reloadCellStockData,prev_reloadCellStockData);
                decrementFlashCount();
            }

            render_shelf(renderInfo);
        } catch (error) {
            console.log(error)
        } finally {
            // １秒後に再度データを取得しprevにデータを格納
            prev_reloadCellStockData = now_reloadCellStockData;
            setTimeout(() => reloadData(renderInfo), 1000);

        }
    }

    await reloadData(renderInfo)


    initPnHighlight();
    initZoneSort();


    // Zoneボタンの自動切換
    cycleZone();



});