import {stackGaugeCreate} from "../common/stack_gauge.js"

export async function saveCheckedData(button, cellData, stock_qty) {

  const pnCellTrue = document.querySelector('.radio-btn:checked');
  const pn_id = pnCellTrue.parentElement.dataset.id;
  const serial_no =pnCellTrue.parentElement.dataset.serial_no;
  const new_stock_qty = stock_qty;
  const max_qty = cellData.max_qty;
  const prev_stock_qty = cellData.stock_qty;
  const dataToSend = {};
  const stack = button.previousElementSibling;
  const cell = button.parentElement.parentElement;
  let btnIcon = button.querySelector('i');
  // const btnIcon = button.querySelector(".i");
  console.log("PN要素",stack);
  // console.log("ICON",btnIcon);

  // データ格納処理
  if (new_stock_qty !== prev_stock_qty) {
    // HTMLデータ属性更新
    cellData.stock_qty = stock_qty;
    cellData.pn_id = pn_id;
    button.dataset.item = JSON.stringify(cellData);
    // 送信用データ整形
    dataToSend.cell_stock_status = {};
    dataToSend.cell_stock_status.cell_id = cellData.cell_id;
    dataToSend.cell_stock_status.pn_id = pn_id;
    dataToSend.cell_stock_status.stock_qty = new_stock_qty;
    dataToSend.inout_log = {};
    dataToSend.inout_log.cell_id = cellData.cell_id;
    dataToSend.inout_log.pn_id = pn_id;
    dataToSend.inout_log.inout_type = new_stock_qty > prev_stock_qty ? "in" : "out";
    dataToSend.inout_log.change_qty = Math.abs(new_stock_qty || 0 - prev_stock_qty || 0);
    dataToSend.inout_log.stock_after = new_stock_qty || 0;

    // HTMLの描画処理
    stackGaugeCreate(max_qty,new_stock_qty,stack);
    // ハイライト用にcellにdata-pnをセット
    cell.dataset.pn = pn_id;

    // 取り出した時のマップ描画処理 (格納０個時にしたときの処理)
    if(new_stock_qty==0){
      btnIcon.className = "bi bi-box-arrow-in-down";
      console.log(btnIcon.className)
    }else{
      btnIcon.className ="btn-pn-stock";
      btnIcon.textContent =serial_no;
      console.log(btnIcon.className)
    }


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
      console.log("送信結果:", result);
      alert(`保存完了しました！`);

    } catch (error) {
      console.error("送信エラー:", error);
      alert("送信中にエラーが発生しました。コンソールを確認してください。");
    }
  }


}