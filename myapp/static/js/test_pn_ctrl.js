document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("input-container");
  const inputTable = document.getElementById("input-table");

  // バックエンドで取得したデータをinput要素に設定
  pn_list.forEach(pn => {
    // テーブルにpn_listのレコードを反映
    const existRow = document.createElement("tr");
    existRow.className = "row-input";
    // レコードのデータ属性にIDを設定
    existRow.dataset.id = pn.id; // データセットにIDを設定

    // 値を各セルに反映

    // 背番号
    const existSerialCell = document.createElement("td");
    existSerialCell.className = "input-cell";
    const exsitSerialInput = document.createElement("input");
    exsitSerialInput.type = "text";
    exsitSerialInput.name = "serial_no";
    exsitSerialInput.value = pn.serial_no;
    existSerialCell.appendChild(exsitSerialInput);
    existRow.appendChild(existSerialCell);

    // 品番
    const exsitProdNoCell = document.createElement("td");
    exsitProdNoCell.className = "input-cell";
    const exsitProdNoInput = document.createElement("input");
    exsitProdNoInput.type = "text";
    exsitProdNoInput.name = "product_no";
    exsitProdNoInput.value = pn.product_no;
    exsitProdNoCell.appendChild(exsitProdNoInput);
    existRow.appendChild(exsitProdNoCell);

    // 材質
    const exsitMaterialCell = document.createElement("td");
    exsitMaterialCell.className = "input-cell";
    const exsitMaterialInput = document.createElement("input");
    exsitMaterialInput.type = "text";
    exsitMaterialInput.name = "material";
    exsitMaterialInput.value = pn.material;
    exsitMaterialCell.appendChild(exsitMaterialInput);
    existRow.appendChild(exsitMaterialCell);

    // 板厚
    const exsitMatThkCell = document.createElement("td");
    exsitMatThkCell.className = "input-cell";
    const exsitMatThkInput = document.createElement("input");
    exsitMatThkInput.type = "text";
    exsitMatThkInput.name = "material_thickness";
    exsitMatThkInput.value = pn.material_thickness < 0 ? "" : pn.material_thickness; // 負の値は空文字にする
    exsitMatThkCell.appendChild(exsitMatThkInput);
    existRow.appendChild(exsitMatThkCell);

    // 切断長さ
    const exsitCutLengthCell = document.createElement("td");
    exsitCutLengthCell.className = "input-cell";
    const exsitCutLengthInput = document.createElement("input");
    exsitCutLengthInput.type = "text";
    exsitCutLengthInput.name = "cut_length";
    exsitCutLengthInput.value = pn.cut_length < 0 ? "" : pn.cut_length; // 負の値は空文字にする
    exsitCutLengthCell.appendChild(exsitCutLengthInput);
    existRow.appendChild(exsitCutLengthCell);

    // 削除ボタン
    const deleteBtnCell = document.createElement("td");
    deleteBtnCell.className = "input-cell";
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="bi bi-x-circle"></i>';
    deleteBtn.className = "delete-button";
    deleteBtn.addEventListener("click", function () {
      existRow.dataset.deleted = "true"; // 削除フラグを設定
      existRow.style.display = "none"; // 行を非表示にする
    });
    deleteBtnCell.appendChild(deleteBtn);
    existRow.appendChild(deleteBtnCell);

    inputTable.appendChild(existRow);
  });







  // 品番追加ボタン押下処理
  document.getElementById("add-button").addEventListener("click", function () {

    const newRow = document.createElement("tr");
    newRow.className = "row-input";

    // 背番号
    const newSerialCell = document.createElement("td");
    newSerialCell.className = "input-cell";
    const newSerialInput = document.createElement("input");
    newSerialInput.type = "text";
    newSerialInput.name = "serial_no";
    newSerialCell.appendChild(newSerialInput);
    newRow.appendChild(newSerialCell);

    // 品番
    const newProdNoCell = document.createElement("td");
    newProdNoCell.className = "input-cell";
    const newProdNoInput = document.createElement("input");
    newProdNoInput.type = "text";
    newProdNoInput.name = "product_no";
    newProdNoCell.appendChild(newProdNoInput);
    newRow.appendChild(newProdNoCell);

    // 材質
    const newMaterialCell = document.createElement("td");
    newMaterialCell.className = "input-cell";
    const newMaterialInput = document.createElement("input");
    newMaterialInput.type = "text";
    newMaterialInput.name = "material";
    newMaterialCell.appendChild(newMaterialInput);
    newRow.appendChild(newMaterialCell);

    // 板厚
    const newMatThkCell = document.createElement("td");
    newMatThkCell.className = "input-cell";
    const newMatThkInput = document.createElement("input");
    newMatThkInput.type = "text";
    newMatThkInput.name = "material_thickness";
    newMatThkCell.appendChild(newMatThkInput);
    newRow.appendChild(newMatThkCell);

    // 切断長さ
    const newCutLengthCell = document.createElement("td");
    newCutLengthCell.className = "input-cell";
    const newCutLengthInput = document.createElement("input");
    newCutLengthInput.type = "text";
    newCutLengthInput.name = "cut_length";
    newCutLengthCell.appendChild(newCutLengthInput);
    newRow.appendChild(newCutLengthCell);

    // 削除ボタン
    const newDeleteCell = document.createElement("td");
    newDeleteCell.className = "input-cell";
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="bi bi-x-circle"></i>';
    deleteBtn.className = "delete-button";
    deleteBtn.addEventListener("click", function () {
      inputTable.removeChild(newRow);
    });
    newDeleteCell.appendChild(deleteBtn);
    newRow.appendChild(newDeleteCell);

    inputTable.appendChild(newRow);
  });

  // キャンセルボタン処理
  const cancelButton = document.getElementById("cancel-button");
  cancelButton.addEventListener("click", function () {
    if (confirm("入力内容を破棄してよろしいですか？")) {
      window.location.href = "/pn_ctrl"; // ページをリロード
    }
  });
});


// SAVEボタン押下時の送信データ準備処理

const saveButton = document.getElementById("save-button");
saveButton.addEventListener("click", async function () {
  const dataToSend = [];
  const alertNewData = [];
  document.querySelectorAll("tr.row-input").forEach(row => {
    console.log("行データ:", row);
    const rowData = {};
    row.querySelectorAll("input").forEach(input => {
      rowData[input.name] = input.value.trim();
    });

    rowData["id"] = row.dataset.id || null; // 既存であればIDを取得

    dataToSend.push(rowData);
    if (!row.dataset.id) {
      alertNewData.push(rowData);
    }
  });
  console.log("送信データ:", dataToSend);


  // const rows = document.querySelectorAll("#input-container .input-row");
  // const dataToSend = [];
  // rows.forEach(row => {
  //   const input = row.querySelector("input[name='pn-input']");
  //   const id = input.dataset.id || null;
  //   const product_no = input.value.trim();
  //   const deleted = row.dataset.deleted === "true";

  //   dataToSend.push({
  //     id: id,
  //     product_no: product_no,
  //     is_deleted: deleted
  //   })


  // })




  // 送信処理(POST)
  try {
    const response = await fetch("/api/pn_ctrl/save", {
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
    alert(`保存完了しました！\n${alertNewData}\n上記の新規品番情報を保存しました。`);

  } catch (error) {
    console.error("送信エラー:", error);
    alert("送信中にエラーが発生しました。コンソールを確認してください。");
  }

})
