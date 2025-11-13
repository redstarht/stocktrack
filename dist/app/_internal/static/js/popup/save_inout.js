import { stackGaugeCreate } from "../common/stack_gauge.js"
import { reload_shelf_data } from "../common/reload_shelf_data.js"

export async function saveCheckedData(button, cellData, stock_qty) {


  const pnCellTrue = document.querySelector('.radio-btn:checked') || null;
  // 新規登録時は parentElementから既存登録時は cellDataからfetch
  const pn_id = pnCellTrue?.dataset.id || cellData.pn_id || null
  const serial_no = pnCellTrue?.parentElement.dataset.serial_no || cellData.serial_no || null;
  const new_stock_qty = stock_qty;
  // 既存格納済製品の場合のみ値が格納 
  const prev_stock_qty = cellData.stock_qty;

  const dataToSend = {};
  const shelfGridElm = document.getElementById("shelfGrid");
  const pageName = "inout_map";
  // console.log("ICON",btnIcon);

  // 新規格納時の場合のバリデーションチェック
  if (!prev_stock_qty) {
    if (stock_qty == 0) {
      throw new Error("\u274c数量を選択してください！"); // エラーをスロー
    }
    if (!pnCellTrue) {
      throw new Error("\u274c背番号を選択してください！"); // エラーをスロー
    }
  }

  // 送信用データ整形
  dataToSend.cell_stock_status = {};
  dataToSend.cell_stock_status.cell_id = cellData.cell_id;
  dataToSend.cell_stock_status.pn_id = pn_id;
  dataToSend.cell_stock_status.stock_qty = new_stock_qty;
  dataToSend.inout_log = {};
  dataToSend.inout_log.cell_id = cellData.cell_id;
  dataToSend.inout_log.pn_id = pn_id;
  dataToSend.inout_log.inout_type = new_stock_qty > prev_stock_qty ? "in" : "out";
  dataToSend.inout_log.change_qty = Math.abs((new_stock_qty || 0) - (prev_stock_qty || 0));
  dataToSend.inout_log.stock_after = new_stock_qty || 0;




  let result;
  // 送信処理(POST)
  try {
    const response = await fetch("/api/inout/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataToSend)
    });
    console.log("送信データ:", dataToSend)
    if (!response.ok) {
      result = await response.json()
      throw new Error(result.error);
    }

    result = await response.json();
    console.log("送信・情報更新成功");
    reload_shelf_data(shelf_list, shelfGridElm, result, pageName);


  } catch (error) {
    console.error("送信エラー:", error);
    reload_shelf_data(shelf_list, shelfGridElm, result, pageName);
    alert(error);
    
  }
}


