export function createDisplayName(pn_list, pn_id) {
    const pnItem = pn_list.find(pnItem => pnItem.id == pn_id);
    const displayValue = (val) => (val === null || val === "" || val === -1.0 ? "***" : val);
    const unionvalue = [
        displayValue(pnItem.serial_no),
        displayValue(pnItem.material),
        displayValue(pnItem.outer_diam),
        displayValue(pnItem.material_thickness),
        displayValue(pnItem.cut_length),
        displayValue(pnItem.long_length)
    ].join(" / ");

    return {
        pnItem: pnItem,
        displayName: unionvalue
    }
}

export function logDisplayName(shelf_list, cell_list, pn_list, logItem) {
    const shelfName = searchShelfName(logItem.cell_id);
    const pnItem = searchPN(pn_list, logItem.pn_id);
    let logInout_type = null;
    if (logItem.inout_type === "in") {
        logInout_type = "入庫";
    } else if (logItem.inout_type === "out") {
        logInout_type = "出庫";
    } else {
        logInout_type = "エラー";
    }
    return {
        id: logItem.id,
        timestamp: logItem.processed_at,
        shelfName: shelfName,
        product_no: pnItem.product_no,
        serial_no: pnItem.serial_no,
        material: pnItem.material,
        outer_diam: pnItem.outer_diam,
        material_thickness: pnItem.material_thickness,
        cut_length: pnItem.cut_length,
        long_length: pnItem.long_length,
        inout_type: logInout_type,
        change_qty: logItem.change_qty,
        stock_after: logItem.stock_after
    }


}



export function searchShelfName(cell_id) {
    const cellItem = cell_list.find(cellItem => cellItem.id === cell_id);
    const shelfItem = shelf_list.find(shelfItem => shelfItem.id === cellItem.shelf_id);
    return shelfItem.name;
}


function searchPN(pn_list, pn_id) {
    const pnItem = pn_list.find(pnItem => pnItem.id === pn_id);
    return pnItem;

}
export function createAlertDisplayName(pnItem) {
    const displayValue = (val) => (val === null || val === "" || val === -1.0 ? "***" : val);
    const unionvalue = [
        displayValue(pnItem.serial_no),
        displayValue(pnItem.material),
        displayValue(pnItem.outer_diam),
        displayValue(pnItem.material_thickness),
        displayValue(pnItem.cut_length),
        displayValue(pnItem.long_length)
    ].join(" / ");

    return unionvalue
}

export function createToastifyLogName(logItem) {
    const displayValue = (val) => (val === null || val === "" || val === -1.0 ? "***" : val);
    const unionvalue = [
        displayValue(logItem.timestamp),
        "棚：" + displayValue(logItem.shelfName),
        "背番号：" + displayValue(logItem.serial_no),
        "長尺長さ：" + displayValue(logItem.long_length),
        logItem.inout_type,
        "変更数：" + logItem.change_qty
    ].join(" ");

    return unionvalue
}