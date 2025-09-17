import { createPnListElm, createPopupPnlist } from "./pn_list.js";

export function clearInput() {
    const clearBtn = document.getElementById('clear-button');
    clearBtn.addEventListener("click", function () {
        const cells = document.querySelectorAll(".cell");
        // 全セルの強調をリセット
        cells.forEach(cell => {
            cell.classList.remove("highlight");
            
        });
        const serialSearch = document.getElementById('serial-search');
        serialSearch.value = '';
        const selectedRadio = document.querySelector('input[name="length-search-select"]:checked');
        // 値を取得
        if (selectedRadio.id == 'range-select') {
            const rangeSearchStart = document.getElementById('rangeStart');
            const rangeSearchEnd = document.getElementById('rangeEnd');
            rangeSearchStart.value = '';
            rangeSearchEnd.value = '';
        } else {
            const particalMatch = document.getElementById('particalMatch');
            particalMatch.value = '';
        }
    })



}


export function serial_no_search(searchValue, pnListElm) {
    pnListElm.innerHTML = "";

    const filterList = pn_list.filter(pn =>
        pn.serial_no && pn.serial_no.includes(searchValue));
    createPnListElm(filterList, pnListElm);
}

export function pop_serial_no_search(searchValue, table) {
    const filterList = pn_list.filter(pn =>
        pn.serial_no && pn.serial_no.includes(searchValue));

    // 既存のポップアップ内容をクリア
    table.innerHTML = "";

    // ポップアップに新しいPNリストを作成
    createPopupPnlist(filterList, table);
}

// 共通機能はこのモジュール内で作成して、ページで別れる場合は、そのページだけの処理を呼び出す