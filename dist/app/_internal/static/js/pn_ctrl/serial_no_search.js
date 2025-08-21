import { existPnListCreate } from "./existPnListCreate.js"
export function serial_no_search(serialNo, inputTable) {
    const rowsToDelete = inputTable.querySelectorAll('.row-input');

    rowsToDelete.forEach(row => {
        row.remove();
    });

    const filterList = pn_list.filter(pn =>
        pn.serial_no && pn.serial_no.includes(serialNo));
    existPnListCreate(filterList, inputTable);
}