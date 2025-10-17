export function existPnListCreate(pn_list, inputTable) {
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

    // 外径
    const existOuterDiamCell = document.createElement("td");
    existOuterDiamCell.className = "input-cell";
    const existOuterDiamInput = document.createElement("input");
    existOuterDiamInput.type = "text";
    existOuterDiamInput.name = "outer_diam";
    existOuterDiamInput.value = pn.outer_diam < 0 ? "" :pn.outer_diam;
    existOuterDiamCell.appendChild(existOuterDiamInput);
    existRow.appendChild(existOuterDiamCell);

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

    // 長尺長さ
    const exsitLongLengthCell = document.createElement("td");
    exsitLongLengthCell.className = "input-cell";
    const exsitLongLengthInput = document.createElement("input");
    exsitLongLengthInput.type = "text";
    exsitLongLengthInput.name = "long_length";
    exsitLongLengthInput.value = pn.long_length < 0 ? "" : pn.long_length; // 負の値は空文字にする
    exsitLongLengthCell.appendChild(exsitLongLengthInput);
    existRow.appendChild(exsitLongLengthCell);

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

}


export function allowPnListCreate(pn_list, inputTable) {
  const rowBody = document.getElementById("row-body");
  // バックエンドで取得したデータをinput要素に設定
  pn_list.forEach(pn => {
    // テーブルにpn_listのレコードを反映
    const existRow = document.createElement("tr");
    existRow.className = "pn-row";
    // レコードのデータ属性にIDを設定
    existRow.dataset.id = pn.id; // データセットにIDを設定

    // 値を各セルに反映
     const displayValue = (val) => (val === null || val === "" || val === -1.0 ? "***" : val);

    // 背番号
    const existSerialCell = document.createElement("td");
    existSerialCell.className = "serial-no";
    existSerialCell.textContent=displayValue(pn.serial_no);
    existRow.appendChild(existSerialCell);

    // 品番
    const exsitProdNoCell = document.createElement("td");
    exsitProdNoCell.className = "product_no";
    exsitProdNoCell.textContent = displayValue(pn.product_no);
    existRow.appendChild(exsitProdNoCell);

    // 材質
    const exsitMaterialCell = document.createElement("td");
    exsitMaterialCell.className = "material";
    exsitMaterialCell.textContent = displayValue(pn.material);
    existRow.appendChild(exsitMaterialCell);

    // 外径
    const exsitOuterDiamCell = document.createElement("td");
    exsitOuterDiamCell.className = "outer_diam";
    exsitOuterDiamCell.textContent = displayValue(pn.outer_diam);
    existRow.appendChild(exsitOuterDiamCell);

    // 板厚
    const exsitMatThkCell = document.createElement("td");
    exsitMatThkCell.className = "material_thickness";
    exsitMatThkCell.textContent = displayValue(pn.material_thickness);
    existRow.appendChild(exsitMatThkCell);

    // 切断長さ
    const exsitCutLengthCell = document.createElement("td");
    exsitCutLengthCell.className = "cut_length";
    exsitCutLengthCell.textContent = displayValue(pn.cut_length);
    existRow.appendChild(exsitCutLengthCell);

    // 全長長さ
    const exsitLongLengthCell = document.createElement("td");
    exsitLongLengthCell.className = "long_length";
    exsitLongLengthCell.textContent = displayValue(pn.long_length);
    existRow.appendChild(exsitLongLengthCell);

    // 許可ボタン
    const checkBtnCell = document.createElement("td");
    checkBtnCell.className = "input-cell";
    const checkBtn = document.createElement("input");
    checkBtn.className = "check-box";
    checkBtn.type = "checkbox";
    checkBtn.name = "allow_storage";

    const check_pn = allow_storage_list.filter(item => item.pn_id === pn.id);
    if (check_pn.length > 0) {
      checkBtn.checked = true;
    };

    checkBtn.addEventListener("change", function () {
      if (checkBtn.checked) {
        existRow.dataset.allow_storage = true;
      } else {
        delete existRow.dataset.allow_storage;
      }
    });
    checkBtnCell.appendChild(checkBtn);
    existRow.appendChild(checkBtnCell);

    rowBody.appendChild(existRow);
  });
  inputTable.appendChild(rowBody);
}