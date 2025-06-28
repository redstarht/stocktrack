import { createPnListElm } from "./pn_list.js";
export function serial_no_search(serialNo, pnListElm) {
 pnListElm.innerHTML = ""; 

    const filterList = pn_list.filter(pn =>
        pn.serial_no && pn.serial_no.includes(serialNo));
    createPnListElm(filterList, pnListElm);
}