export function createPnListElm(pn_list,pnListElm) {

pn_list.forEach(pnItem => {
        const pnBtn = document.createElement("button");
        pnBtn.className ="pn-item btn btn-outline-secondary";
        pnBtn.dataset.pn = pnItem.id;

        const displayValue = (val) => (val === null || val === "" || val === -1.0 ? "***" : val);
        const unionvalue = [
            displayValue(pnItem.serial_no),
            displayValue(pnItem.material),
            displayValue(pnItem.material_thickness),
            displayValue(pnItem.cut_length),   
        ].join(" / ");
        console.log(unionvalue);
        pnBtn.textContent = unionvalue;
        pnListElm.appendChild(pnBtn);
    });

}