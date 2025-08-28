import {createDisplayName,searchShelfName} from "../common/displayname.js"

export function inoutLogRecCreate(inout_log_list, tableElm) {
  const rowBody = document.getElementById("log-body");
  // バックエンドで取得したデータをinput要素に設定
  inout_log_list.forEach(log => {
    // テーブルにpn_listのレコードを反映
    const logRec = document.createElement("tr");
    logRec.className = "log-rec";
    // レコードのデータ属性にIDを設定
    logRec.dataset.id = log.id; // データセットにIDを設定

    // 値を各セルに反映
    const displayValue = (val) => (val === null || val === "" || val === -1.0 ? "***" : val);

    // 日時
    const timestampCell = document.createElement("td");
    timestampCell.className = "processed_at";
    timestampCell.textContent=log.processed_at;
    logRec.appendChild(timestampCell);

    // 棚名
    const shelfNameCell = document.createElement("td");
    shelfNameCell.className = "shelf-name";
    shelfName=searchShelfName(shelf_list,cell_list,log.cell_id);
    shelfNameCell.textContent = shelfName;
    logRec.appendChild(shelfNameCell);

    // 品番
    const prodNumCell = document.createElement("td");
    prodNumCell.className = "product-no";
    
    prodNumCell.textContent = 
    existRow.appendChild(exsitMaterialCell);

    // 背番号
    const exsitMatThkCell = document.createElement("td");
    exsitMatThkCell.className = "material_thickness";
    exsitMatThkCell.textContent = displayValue(pn.material_thickness);
    existRow.appendChild(exsitMatThkCell);

    // 材質
    const exsitCutLengthCell = document.createElement("td");
    exsitCutLengthCell.className = "cut_length";
    exsitCutLengthCell.textContent = displayValue(pn.cut_length);
    existRow.appendChild(exsitCutLengthCell);

    // 板厚
    const checkBtnCell = document.createElement("td");
    checkBtnCell.className = "input-cell";
    const checkBtn = document.createElement("input");
    checkBtn.className = "check-box";
    checkBtn.type = "checkbox";
    checkBtn.name = "allow_storage";

    // 切断長さ
    

    //IN/OUT
    

    // 変更数


    // 残数


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
  tableElm.appendChild(rowBody);
}