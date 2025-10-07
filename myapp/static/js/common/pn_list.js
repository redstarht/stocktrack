export function createPnListElm(input_pn, pnListElm) {
    pnListElm.innerHTML = "";
    input_pn.forEach(pnItem => {
        const pnBtn = document.createElement("button");
        pnBtn.className = "pn-item btn btn-outline-secondary";
        pnBtn.dataset.pn = pnItem.id;

        const displayValue = (val) => (val === null || val === "" || val === -1.0 ? "***" : val);
        const unionvalue = [
            displayValue(pnItem.serial_no),
            displayValue(pnItem.material),
            displayValue(pnItem.outer_diam),
            displayValue(pnItem.material_thickness),
            displayValue(pnItem.cut_length),
            displayValue(pnItem.long_length)
        ].join(" / ");
        pnBtn.textContent = unionvalue;
        pnListElm.appendChild(pnBtn);
    });
}

export function displayPnlistElm(input_pn, pnListElm) {
    const buttons = pnListElm.querySelectorAll('button');
    buttons.forEach(button => {
        const dataId = parseInt(button.dataset.pn);
        if (input_pn.some(pn => pn.id === dataId)) {
            button.style.display = "block";
        } else {
            button.style.display = "none";
        }

    })
}

export function createPopupPnlist(input_pn, table) {
    table.innerHTML='';
    input_pn.forEach(pn => {
        const newRow = document.createElement("tr");
        newRow.className = "pn-row";
        newRow.dataset.id = pn.id;
        newRow.dataset.serial_no = pn.serial_no;

        const pnCell = document.createElement("td");
        const pnLabel = document.createElement("label");
        const pnrec = document.createElement("div");
        pnrec.className = "pnrec"
        pnCell.className = "pn-cell";
        const displayValue = (val) => (val === null || val === "" || val === -1.0 ? "***" : val);
        const unionvalue = [
            displayValue(pn.serial_no),
            displayValue(pn.material),
            displayValue(pn.outer_diam),
            displayValue(pn.material_thickness),
            displayValue(pn.cut_length),
            displayValue(pn.long_length)
        ].join(" / ");

        pnCell.dataset.id = pn.id; // データセットにIDを設定
        pnCell.dataset.serial_no = pn.serial_no;
        pnCell.dataset.long_length = pn.long_length;
        pnLabel.textContent = unionvalue;
        pnLabel.className = "pn-label"
        pnLabel.htmlFor = pn.id;

        const radioBtn = document.createElement("input");
        radioBtn.dataset.id = pn.id;
        radioBtn.className = "radio-btn";
        radioBtn.type = "radio";
        radioBtn.name = "choice";
        radioBtn.value = true;
        radioBtn.id = pn.id;

        const check_pn = cell_stock_list.filter(item => item.pn_id === pn.id && item.cell_id === table.dataset.cell_id);

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


        pnrec.appendChild(radioBtn);
        pnrec.appendChild(pnLabel);
        pnCell.appendChild(pnrec);
        newRow.appendChild(pnCell);
        table.appendChild(newRow);

    })
    return table;
}