import { createPnListElm, createPopupPnlist,displayPnlistElm } from "./pn_list.js";


export function onSearchButtonClick(pn_list, pnListElm) {
    //検索ボタン処理
    document.getElementById("search-button").addEventListener("click", function () {
        const getValueOrNull = (id) => {
            const element = document.getElementById(id);
            return element ? element.value.trim() : null;
        };

        const serialValue = getValueOrNull("serial-search");
        const lengthValue = getValueOrNull("particalMatch");
        const rangeStart = getValueOrNull("rangeStart");
        const rangeEnd = getValueOrNull("rangeEnd");
        const filterPnList = serial_and_length_search(pn_list, serialValue, lengthValue, rangeStart, rangeEnd)

        // 空なら全件表示　/ 検索値あればフィルタリング
        if (!filterPnList) {
            displayPnlistElm(pn_list, pnListElm);

        } else {
            displayPnlistElm(filterPnList, pnListElm);
        }
    });


}


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


export function serial_and_length_search(pn_list, serial, length, rangeStart, rangeEnd) {


    let filterList = pn_list;

    if (serial) {
        filterList = pn_list.filter(pn =>
            pn.serial_no && pn.serial_no.includes(serial));
    }

    if (length) {
        filterList = filterList.filter(pn =>
            pn.long_length && String(pn.long_length).includes(length)
        );
    } else if (rangeStart || rangeEnd) {
        filterList = filterList.filter(pn => {
            const isStartValid = rangeStart ? pn.long_length >= rangeStart : true;
            const isEndValid = rangeEnd ? pn.long_length <= rangeEnd : true;
            return isStartValid && isEndValid;
        });
    }
    console.log(filterList);
    return filterList;
}





// export function serial_no_search(searchValue, pnListElm) {
//     const filterList = pn_list.filter(pn =>
//         pn.serial_no && pn.serial_no.includes(searchValue));
//     createPnListElm(filterList, pnListElm);
// }

export function pop_serial_no_search(searchValue, table) {
    const filterList = pn_list.filter(pn =>
        pn.serial_no && pn.serial_no.includes(searchValue));

    // 既存のポップアップ内容をクリア
    table.innerHTML = "";

    // ポップアップに新しいPNリストを作成
    createPopupPnlist(filterList, table);
}

// 共通機能はこのモジュール内で作成して、ページで別れる場合は、そのページだけの処理を呼び出す