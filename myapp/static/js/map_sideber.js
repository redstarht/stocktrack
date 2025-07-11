import { createZoneListElm } from "./common/zone_list.js";
import { createPnListElm } from "./common/pn_list.js";
import { serial_no_search } from "./common/serial_no_search.js";
import  { initPnHighlight } from "./common/pn_highlight.js";



document.addEventListener("DOMContentLoaded", function () {
    const zoneListElm = document.getElementById("zonelist");
    const pnListElm = document.getElementById("pnlist");


    // 初期ロード時
    createZoneListElm(zone_list, zoneListElm);
    createPnListElm(pn_list, pnListElm);

    //検索ボタン処理
    document.getElementById("search-button").addEventListener("click", function () {
        const searchValue = document.getElementById("serial-search").value.trim();

        // 空なら全件表示　/ 検索値あればフィルタリング
        if (!searchValue) {
            pnListElm.innerHTML='';
            createPnListElm(pn_list, pnListElm);

        }else{
            serial_no_search(searchValue, pnListElm);
        }
        initPnHighlight();
        
    });



});