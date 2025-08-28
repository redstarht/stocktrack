export function createDisplayName(pn_list, pn_id) {
    const pnItem = pn_list.find(pnItem => pnItem.id == pn_id);
    console.log(pn_list,pn_id);
    const displayValue = (val) => (val === null || val === "" || val === -1.0 ? "***" : val);
    const unionvalue = [
        displayValue(pnItem.serial_no),
        displayValue(pnItem.material),
        displayValue(pnItem.material_thickness),
        displayValue(pnItem.cut_length),
    ].join(" / ");

    return {
        pnItem: pnItem,
        displayName: unionvalue
    }
}

export function searchShelfName(shelf_list,cell_list,cell_id){
    const cellItem = cell_list.find(cellItem => cellItem.id = cell_id);
    const shelfItem = shelf_list.find(shelfItem => shelfItem.id == cellItem.shelf_id);
    return shelfItem.name;
}

export function createAlertDisplayName(pnItem) {
    const displayValue = (val) => (val === null || val === "" || val === -1.0 ? "***" : val);
    const unionvalue = [
        displayValue(pnItem.serial_no),
        displayValue(pnItem.material),
        displayValue(pnItem.material_thickness),
        displayValue(pnItem.cut_length),
    ].join(" / ");
    console.log("✅DisplayNameが読み込まれました!",unionvalue);

    return unionvalue
}