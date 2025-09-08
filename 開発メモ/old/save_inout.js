import { stackGaugeCreate } from "../common/stack_gauge.js"
import { reload_shelf_data } from "../common/reload_shelf_data.js"

export async function saveCheckedData(button, cellData, stock_qty) {


  const pnCellTrue = document.querySelector('.radio-btn:checked') || null;
  const displayname = pnCellTrue?.previousElementSibling.textContent || null;
  // 新規登録時は parentElementから既存登録時は cellDataからfetch
  const pn_id = pnCellTrue?.parentElement.dataset.id || cellData.pn_id || null
  const serial_no = pnCellTrue?.parentElement.dataset.serial_no || cellData.serial_no || null;
  const new_stock_qty = stock_qty;
  // 既存格納済製品の場合
  const max_qty = cellData.max_qty;
  const prev_stock_qty = cellData.stock_qty;

  const dataToSend = {};
  const stack = button.previousElementSibling;
  const cell = button.parentElement.parentElement;
  let btnIcon = button.querySelector('i');
  // const btnIcon = button.querySelector(".i");
  console.log("PN要素", stack);
  // console.log("ICON",btnIcon);



  // データ格納処理(数量に変更あったら)
  if (new_stock_qty !== prev_stock_qty) {

    // 新規格納時の場合の例外処理
    if (!cellData.pn_id) {
      if (!pnCellTrue) {
        throw new Error("\u274c背番号を選択してください！"); // エラーをスロー
      }
    }


    // HTMLの描画処理
    stackGaugeCreate(max_qty, new_stock_qty, stack);



    // HTMLデータ属性更新
    console.log("✅更新背番号情報", displayname, "新ストック", new_stock_qty, "旧ストック", prev_stock_qty);
    cellData.stock_qty = new_stock_qty;
    cellData.pn_id = pn_id;
    cellData.serial_no = serial_no;
    button.dataset.item = JSON.stringify(cellData);
    // button.dataset.displayname = displayname;


    // 取り出した時のマップ描画処理  / 送信データ処理(格納０個時にしたときの処理)
    if (new_stock_qty == 0) {
      console.log("✅全ストック取り出し時の処理", new_stock_qty)
      btnIcon.className = "bi bi-box-arrow-in-down";
      btnIcon.textContent = null;
      cell.removeAttribute("data-pn");
      // セルデータの処理
      cellData.pn_id = null;
      cellData.serial_no = null;
      button.dataset.item = JSON.stringify(cellData);
      // button.removeAttribute("data-item");
      button.removeAttribute("data-displayname");
      if (cell.classList.contains("highlight")) {
        cell.classList.remove("highlight");
      }


    } else {
      console.log("✅新規または部分取り出し字の処理", new_stock_qty)
      btnIcon.className = "btn-pn-stock";
      btnIcon.textContent = serial_no;
      // ハイライト用にcellにdata-pnをセット
      cell.dataset.pn = pn_id;
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
        throw new Error("保存エラー");
      }

      const result = await response.json();
      console.log("送信・情報更新成功");
      reload_shelf_data(shelf_list,shelfGridElm,result,pageName);


    } catch (error) {
      console.error("送信エラー:", error);
      alert("送信中にエラーが発生しました。コンソールを確認してください。");
    }
  }


}