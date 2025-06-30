export function createPnListElm(pn_list, pnListElm) {

    pn_list.forEach(pnItem => {
        const pnBtn = document.createElement("button");
        pnBtn.className = "pn-item btn btn-outline-secondary";
        pnBtn.dataset.pn = pnItem.id;

        const displayValue = (val) => (val === null || val === "" || val === -1.0 ? "***" : val);
        const unionvalue = [
            displayValue(pnItem.serial_no),
            displayValue(pnItem.material),
            displayValue(pnItem.material_thickness),
            displayValue(pnItem.cut_length),
        ].join(" / ");
        pnBtn.textContent = unionvalue;
        pnListElm.appendChild(pnBtn);
    });

}

export function createPopupPnlist(input_pn,table) {
    input_pn.forEach(pn => {
        const newRow = document.createElement("tr");
        newRow.className = "pn-row";
        newRow.dataset.id = pn.id;

        const pnCell = document.createElement("td");
        pnCell.className = "pn-cell";
        const displayValue = (val) => (val === null || val === "" || val === -1.0 ? "***" : val);
        const unionvalue = [
            displayValue(pn.serial_no),
            displayValue(pn.material),
            displayValue(pn.material_thickness),
            displayValue(pn.cut_length),
        ].join(" / ");

        pnCell.textContent = unionvalue;
        pnCell.dataset.id = pn.id; // データセットにIDを設定

        const radioBtn = document.createElement("input");
        radioBtn.className = "radio-btn";
        radioBtn.type = "radio";
        radioBtn.name = "choice";
        radioBtn.value = true;

        const check_pn = allow_storage_list.filter(item => item.pn_id === pn.id);

        if (check_pn.length > 0) {
            radioBtn.checked = true;
        };

        radioBtn.addEventListener("change", function () {
            if (radioBtn.checked) {
                newRow.dataset.allow_storage = true;
            } else {
                delete newRow.dataset.allow_storage;
            }
        });



        newRow.appendChild(pnCell);
        newRow.appendChild(radioBtn);
        table.appendChild(newRow);
        
    })
    return table;
}