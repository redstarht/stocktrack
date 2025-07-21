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
    console.log("✅選択した品番",pnItem)
    console.log("✅DisplayNameが読み込まれました!",unionvalue);

    return {
        pnItem: pnItem,
        displayName: unionvalue
    }
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