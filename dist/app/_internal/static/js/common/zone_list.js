export function createZoneListElm(zone_list,zoneListElm) {
    zone_list.forEach(zoneItem => {
        const zoneBtn = document.createElement("button");
        zoneBtn.className = "zone-item btn btn-outline-secondary";
        zoneBtn.dataset.zone_id = zoneItem.id;
        zoneBtn.textContent = zoneItem.name;
        zoneListElm.appendChild(zoneBtn);
    })
}