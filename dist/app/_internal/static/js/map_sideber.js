import { createZoneListElm } from "./common/zone_list.js";
import { createPnListElm } from "./common/pn_list.js";
import { onSearchButtonClick,clearInput } from "./common/serial_no_search.js";
import { initPnHighlight } from "./common/pn_highlight.js";
import { load_localStorage, setupSearchBox,changeSearchBox } from "./common/change_select_search.js"



document.addEventListener("DOMContentLoaded", function () {
    const zoneListElm = document.getElementById("zonelist");
    const pnListElm = document.getElementById("pnlist");
    // ローカルストレージから選択されたラジオボタンのIDを取得
    const selectedRadioId = localStorage.getItem('selectedRadio');
    const lengthSearchBox = document.getElementById('length-search-box');
    

    // 初期ロード時
    createZoneListElm(zone_list, zoneListElm);
    createPnListElm(pn_list, pnListElm);
    load_localStorage(selectedRadioId);
    setupSearchBox(lengthSearchBox,selectedRadioId);
    changeSearchBox(lengthSearchBox);
    clearInput();
    onSearchButtonClick(pn_list,pnListElm);
    initPnHighlight();


    



});