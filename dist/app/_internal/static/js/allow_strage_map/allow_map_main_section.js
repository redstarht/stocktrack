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


        const shelf_cells = cell_list.filter(cell => cell.shelf_id === shelfItem.id);


        const cellGridElm = document.createElement("div");
        cellGridElm.className = shelfItem.column_class;


        // 対象の棚にあるセルを描画
        for (let i = 0; i < shelf_cells.length; i++) {

            const cell = shelf_cells[i];

            // cell_stock_statusからcell.idでフィルターして
            // 該当のcellに所属している品番が存在しないかを見るロジック必要
            // 

            const cellElm = document.createElement("div");
            const cellLabel = document.createElement("div");
            // const pnName = document.createElement("div");
            const cellBtn = document.createElement("button");
            const btnIcon = document.createElement("i");

            cellElm.className = "cell";
            cellElm.dataset.pn = shelf_cells[i].is_all_pn_allowed;


            cellLabel.className = "cell-label";


            cellBtn.className = "cell-stock-btn";
            // セルボタンにデータ属性（セルID）をもたせる
            cellBtn.dataset.cell_id = cell.id;
            cellBtn.addEventListener("click", function () {
                const cell_id = cell.id;
                window.location.href = `/cell_permission?cell_id=${cell_id}`;

            })




            btnIcon.className = "bi bi-list";

            cellBtn.appendChild(btnIcon);
            // cellLabel.appendChild(pnName);
            cellLabel.appendChild(cellBtn);
            cellElm.appendChild(cellLabel);
            cellGridElm.appendChild(cellElm);
        }

        shelfContainer.appendChild(cellGridElm);
        shelfGridElm.appendChild(shelfContainer);

    });






});