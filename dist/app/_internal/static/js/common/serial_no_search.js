import { createPnListElm, createPopupPnlist } from "./pn_list.js";
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