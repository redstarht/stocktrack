document.addEventListener("DOMContentLoaded", function() {
    const zoneListElm = document.getElementById("zonelist");
    const pnListElem = document.getElementById("pnlist");

    zone_list.forEach(zoneItem =>{
        const zoneBtn = document.createElement("button");
        zoneBtn.className = "zone-item btn btn-outline-secondary";
        zoneBtn.dataset.zone_id = zoneItem.id;
        zoneBtn.textContent = zoneItem.name;
        zoneListElm.appendChild(zoneBtn);
    })

    pn_list.forEach(pnItem => {
        const pnBtn = document.createElement("button");
        pnBtn.className ="pn-item btn btn-outline-secondary";
        pnBtn.dataset.pn = pnItem.id;
        pnBtn.textContent = pnItem.product_no;
        pnListElem.appendChild(pnBtn);
    });
});