export function createDisplayName(pn_list,pn_id){
    const pnItem =pn_list.filter(pnItem=>pnItem.pn_id = pn_id);
    const displayValue = (val) => (val === null || val === "" || val === -1.0 ? "***" : val);
        const unionvalue = [
            displayValue(pnItem.serial_no),
            displayValue(pnItem.material),
            displayValue(pnItem.material_thickness),
            displayValue(pnItem.cut_length),
        ].join(" / ");

    return unionvalue
}