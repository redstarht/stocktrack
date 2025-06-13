document.addEventListener("DOMContentLoaded", function () {
    const shelfGridElm = document.getElementById("shelfGrid");

    shelf_list.forEach(shelfItem => {
        // shelfContainerにcellが入る
        const shelfContainer = document.createElement("div");
        const shelfLabel = document.createElement("div");
        const shelfTitle = document.createElement("div");

        shelfTitle.textContent = shelfItem.name;
        shelfTitle.className = "shelf-title"
        shelfContainer.className = "shelf";
        shelfContainer.dataset.shelf = shelfItem.name;
        shelfContainer.dataset.zone_id = shelfItem.zone_id;


        shelfLabel.appendChild(shelfTitle);
        shelfContainer.appendChild(shelfLabel);
        
        

        
        const cellGridElm = document.createElement("div");
        cellGridElm.className = shelfItem.css_class;

        for (let i =1 ;i<=(shelfItem.row * shelfItem.column) ; i++){
            const cellElm =document.createElement("div");
            const cellLabel = document.createElement("div");
            const pnName = document.createElement("div");
            const cellBtn = document.createElement("button");
            const btnIcon = document.createElement("i");
            
            cellElm.className ="cell";
            cellElm.dataset.pn = "00000-00000";

            cellLabel.className = "cell-label";

            pnName.className ="pn-name";
            pnName.textContent ="000000-00000";
            
            cellBtn.className ="cell-stock-btn";

            btnIcon.className="bi bi-box-arrow-in-down";

            cellBtn.appendChild(btnIcon);
            cellLabel.appendChild(pnName);
            cellLabel.appendChild(cellBtn);
            cellElm.appendChild(cellLabel);
            cellGridElm.appendChild(cellElm);
        }

        shelfContainer.appendChild(cellGridElm);
        shelfGridElm.appendChild(shelfContainer);

    });



    


});