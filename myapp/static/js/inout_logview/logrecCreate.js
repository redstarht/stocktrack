import { logDisplayName, searchShelfName } from "../common/displayname.js"

export function inoutLogRecCreate(inout_log_list, tableElm) {
  const rowBody = document.getElementById("log-body");
  // バックエンドで取得したデータをinput要素に設定
  inout_log_list.forEach(logItem => {

    // ログ情報の取得
    const loginfo = logDisplayName(shelf_list, cell_list, pn_list, logItem);
    // テーブルにpn_listのレコードを反映
    const logRec = document.createElement("tr");
    logRec.className = "log-rec";
    // レコードのデータ属性にIDを設定
    logRec.dataset.id = loginfo.id; // データセットにIDを設定

    // 日時
    const timestampCell = document.createElement("td");
    timestampCell.className = "processed_at";
    timestampCell.textContent = loginfo.timestamp;
    logRec.appendChild(timestampCell);

    // 棚名
    const shelfNameCell = document.createElement("td");
    shelfNameCell.className = "shelf-name";
    shelfNameCell.textContent = loginfo.shelfName;
    logRec.appendChild(shelfNameCell);

    // 品番
    const prodNumCell = document.createElement("td");
    prodNumCell.className = "product-no";
    prodNumCell.textContent = loginfo.product_no;
    logRec.appendChild(prodNumCell);

    // 背番号
    const serialNoCell = document.createElement("td");
    serialNoCell.className = "serial-no";
    serialNoCell.textContent = loginfo.serial_no;
    logRec.appendChild(serialNoCell);

    // 材質
    const materialCell = document.createElement("td");
    materialCell.className = "material";
    materialCell.textContent = loginfo.material;
    logRec.appendChild(materialCell);

    // 外径
    const outerDiamCell = document.createElement("td");
    outerDiamCell.className = "outer-diam";
    outerDiamCell.textContent = loginfo.outer_diam== -1.0 ? "" : loginfo.outer_diam;
    logRec.appendChild(outerDiamCell);

    // 板厚
    const materialThkCell = document.createElement("td");
    materialThkCell.className = "material-thickness";
    materialThkCell.textContent = loginfo.material_thickness== -1.0 ? "" : loginfo.material_thickness;
    logRec.appendChild(materialThkCell);

    // 切断長さ
    const cutLengthCell = document.createElement("td");
    cutLengthCell.className = "cut-length";
    cutLengthCell.textContent = loginfo.cut_length== -1.0 ? "" : loginfo.cut_length;
    logRec.appendChild(cutLengthCell);

    // 長尺長さ
    const longLengthCell = document.createElement("td");
    longLengthCell.className = "long-length";
    longLengthCell.textContent = loginfo.long_length== -1.0 ? "" : loginfo.long_length;
    logRec.appendChild(longLengthCell);

    //IN/OUT
    const inoutTypeCell = document.createElement("td");
    inoutTypeCell.className = "inout-type";
    inoutTypeCell.textContent = loginfo.inout_type;
    logRec.appendChild(inoutTypeCell);

    // 変更数
    const changeQtyCell = document.createElement("td");
    changeQtyCell.className = "change-qty";
    changeQtyCell.textContent = loginfo.change_qty;
    logRec.appendChild(changeQtyCell);

    // 残数
    const stockAfterCell = document.createElement("td");
    stockAfterCell.className = "stock-after";
    stockAfterCell.textContent = loginfo.stock_after;
    logRec.appendChild(stockAfterCell);
    rowBody.appendChild(logRec);
  });
  tableElm.appendChild(rowBody);
}