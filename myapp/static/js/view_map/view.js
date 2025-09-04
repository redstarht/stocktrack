import { stackGaugeCreate } from "../common/stack_gauge.js";
import { initPnHighlight } from "../common/pn_highlight.js";
import { initZoneSort,cycleZone } from "../common/zone_sort.js";
import { createDisplayName } from "../common/displayname.js";
import { get_cell_status_data } from "../common/data_fetch.js"
import { render_shelf } from "./render_shelf.js";

document.addEventListener("DOMContentLoaded", async function () {
    const pageId = viewmap;

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
        pageId:pageId
    }

    //描画情報更新 
    async function reloadData(renderInfo) {
        try {
            reloadCellStockData = await get_cell_status_data();
            render_shelf(renderInfo, reloadCellStockData);


        } catch (error) {
            console.log(error)
        } finally {
            // １秒後に再度データを取得
            setTimeout(() => reloadData(renderInfo), 1000);

        }
    }

    await reloadData(renderInfo)


    initPnHighlight();
    initZoneSort();


    // Zoneボタンの自動切換
    cycleZone();



});