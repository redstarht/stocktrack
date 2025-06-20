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
        cellGridElm.className = shelfItem.css_class;


        // 対象の棚にあるセルを描画
        for (let i = 0; i < shelf_cells.length; i++) {

            const cell = shelf_cells[i];
            const max_qty = cell.max_qty;

            // cell_stock_statusからcell.idでフィルターして
            // 該当のcellに所属している品番が存在しないかを見るロジック必要
            // 

            const cellElm = document.createElement("div");
            const cellLabel = document.createElement("div");
            const pnName = document.createElement("div");
            const cellBtn = document.createElement("button");
            const btnIcon = document.createElement("i");

            cellElm.className = "cell";

            // ストック状態テーブルから該当のセルIDに品番があるか確認
            const stock_cell = cell_stock_list.find(stock => stock.cell_id == cell.id);

            // 品番テーブルから街灯品番を抽出


            // IFで中にわける必要あり


            let product_number = null;
            if (stock_cell) {
                product_number = pn_list.find(pnItem => pnItem.id == stock_cell.pn_id)
                cellElm.dataset.pn = stock_cell.pn_id;
                pnName.textContent = product_number.product_no;
                btnIcon.textContent = stock_cell.stock_qty;
                btnIcon.className = "btn-pn-stock"

            } else {

                btnIcon.className = "bi bi-box-arrow-in-down";
            }
            cellLabel.className = "cell-label";

            pnName.className = "pn-name";


            cellBtn.className = "cell-stock-btn";
            // セルボタンのデータまとめ用
            const dataObj = {
                cell_id: cell.id,
                is_all_pn_allowed:cell.is_all_pn_allowed,
                max_qty: max_qty ?? '',
                pn_id: stock_cell?.pn_id ?? '',
                product_no: product_number?.product_no ?? '',
                stock_qty: stock_cell?.stock_qty ?? 0
            }
            cellBtn.dataset.item = JSON.stringify(dataObj);

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