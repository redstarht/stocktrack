```js


    shelf_list.forEach(shelfItem => {
        const shelf_cells = cell_list.filter(cell => cell.shelf_id === shelfItem.id);
        shelf_cells.forEach(cell => {
            // reloadCellStockDataが存在し、cell_stock_statusesが定義されているかを確認
            // 条件が真の場合、cell_stock_statusesからcell.idに一致するcell_idを持つ
            // 在庫データを検索し、最初に見つかった要素をstock_cellに代入
            // 条件が偽の場合は、stock_cellにnullを代入
            const stock_cell = reloadCellStockData && reloadCellStockData.cell_stock_statuses
                ? reloadCellStockData.cell_stock_statuses.find(stock => stock.cell_id == cell.id)
                : null;
            // cellElmをdata属性を使って取得
            const cellElm = shelfGridElm.querySelector(`[data-cell-id="${cell.id}"]`);
            if (stock_cell) {
                                let product_number = pn_list.find(pnItem => pnItem.id == stock_cell.pn_id);
                                cellElm.dataset.pn = stock_cell.pn_id;

                                // スタックゲージの更新
                                const stack = cellElm.querySelector('.stack');
                                stackGaugeCreate(cell.max_qty, stock_cell.stock_qty, stack);

                                const divIcon = cellElm.querySelector('i');
                                divIcon.textContent = product_number.serial_no;
                                divIcon.className = "btn-pn-stock";
                            } else {
                                // stock_cellが存在しない場合の処理
                                const stack = cellElm.querySelector('.stack');
                                stack.innerHTML = "";
                                const divIcon = cellElm.querySelector('i');
                                divIcon.textContent = "";
                                divIcon.className = "bi bi-box-arrow-in-down";
                            }

        })})


            const dataObj = {
                cell_id: cell.id,
                is_all_pn_allowed: cell.is_all_pn_allowed,
                max_qty: max_qty ?? '',
                pn_id: stock_cell?.pn_id ?? '',
                serial_no: product_number?.serial_no ?? '',
                stock_qty: stock_cell?.stock_qty ?? 0
            }
            cellBtn.dataset.item = JSON.stringify(dataObj);