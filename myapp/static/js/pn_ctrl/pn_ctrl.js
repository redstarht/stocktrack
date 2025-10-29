import { existPnListCreate } from "./existPnListCreate.js"
import { serial_no_search } from "./serial_no_search.js"
import { createAlertDisplayName } from "../common/displayname.js"
import { prodNumValidator } from "../common/validation.js"


document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("input-container");


  const inputTable = document.getElementById("input-table");

  existPnListCreate(pn_list, inputTable);
  setTimeout(() => {
    container.scrollTop = container.scrollHeight;
  }, 0);
  console.log(pn_list);










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

    // 外径
    const newOuterDIamCell = document.createElement("td");
    newOuterDIamCell.className = "input-cell";
    const newOuterDIamInput = document.createElement("input");
    newOuterDIamInput.type = "text";
    newOuterDIamInput.name = "outer_diam";
    newOuterDIamCell.appendChild(newOuterDIamInput);
    newRow.appendChild(newOuterDIamCell);

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

    // 長尺長さ
    const newLongLengthCell = document.createElement("td");
    newLongLengthCell.className = "input-cell";
    const newLongLengthInput = document.createElement("input");
    newLongLengthInput.type = "text";
    newLongLengthInput.name = "long_length";
    newLongLengthCell.appendChild(newLongLengthInput);
    newRow.appendChild(newLongLengthCell);

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

    setTimeout(() => {
    container.scrollTop = container.scrollHeight;
  }, 0);
  });

  // キャンセルボタン処理
  const cancelButton = document.getElementById("cancel-button");
  cancelButton.addEventListener("click", function () {
    if (confirm("入力内容を破棄してよろしいですか？")) {
      window.location.href = "/pn_ctrl"; // ページをリロード
    }
  });

  // 検索ボタン処理
  document.getElementById("search-button").addEventListener("click", function () {
    const searchValue = document.getElementById("serial-search").value.trim();

    // 空なら全件表示（必要に応じて）
    if (!searchValue) {
      return;
    }
    serial_no_search(searchValue, inputTable);
  });




});





// SAVEボタン押下時の送信データ準備処理

const saveButton = document.getElementById("save-button");
saveButton.addEventListener("click", async function () {
  const dataToSend = [];
  const alertNewData = [];
  let thisRow = null;
  let checkRow = null;
  // let hasCheckmaThkCutLength = false;
  document.querySelectorAll("tr.row-input").forEach(row => {
    const rowData = {};
    row.querySelectorAll("input").forEach(input => {
      // .name属性をキーとして、値を取得
      // 各input要素のnameをキーとして登録し、その値をオブジェクト形式で格納
      if (input.name == '') {
        input.name = None
      }

      rowData[input.name] = input.value.trim();
    });

    rowData["id"] = row.dataset.id || null; // 既存であればIDを取得
    rowData["is_deleted"] = row.dataset.deleted || false;

    thisRow = new prodNumValidator(rowData);
    checkRow = thisRow.validateRowData();
    if (checkRow && checkRow.length > 0) {
      alertNewData.push(checkRow);
    } else { dataToSend.push(rowData) }

  });
  console.log("送信データ:", dataToSend);


  if (alertNewData.length > 0) {
    //エラーがあった場合は表示
    console.log(alertNewData);
    const alertMessage = alertNewData.map(item => `エラー:「 ${item}」`).join("\n");
    alert(alertMessage);
    return;
  }

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
    alert(`保存完了しました！`);
    window.location.href = "/pn_ctrl";

  } catch (error) {
    console.error("送信エラー:", error);
    alert("送信中にエラーが発生しました。コンソールを確認してください。");
  }

})
