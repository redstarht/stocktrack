
export async function saveCheckedData(button, cellData, stock_qty) {

  const pnCellTrue = document.querySelector('.radio-btn:checked');
  const pn_id = pnCellTrue.parentElement.dataset.id;
  const serial_no =pnCellTrue.parentElement.dataset.serial_no;
  const new_stock_qty = stock_qty;
  const prev_stock_qty = cellData.stock_qty;
  const dataToSend = {};
  const pnNamediv = button.previousElementSibling;
  // const btnIcon = button.querySelector(".i");
  console.log("PN要素",pnNamediv);
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

    // HTMLの描画処理
    pnNamediv.innerHTML='';
    pnNamediv.textContent = serial_no;
    console.log(serial_no);
    console.log(pnNamediv.textContent);
    // btnIcon.textContent = new_stock_qty;


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