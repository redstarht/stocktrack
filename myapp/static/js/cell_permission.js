import { allowPnListCreate } from "../js/pn_ctrl/existPnListCreate.js"


document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("input-container");

  // セル情報の表示(全品番許可有無)
  console.log(cell_list);

  const table = document.createElement("table");
  table.className = "pn-table";

  const inputTable = document.getElementById("input-table");
  console.log("対象テーブルを読み込み", inputTable)

  // // バックエンドから取得したデータをinput要素に設定
  allowPnListCreate(pn_list, inputTable);

  // 最下部スクロール
  // setTimeout(() => {
  //   container.scrollTop = container.scrollHeight;
  // }, 0);



  // pn_list.forEach(pn => {
  //   const newRow = document.createElement("tr");
  //   newRow.className = "pn-row";
  //   newRow.dataset.id = pn.id;

  //   const pnCell = document.createElement("td");
  //   pnCell.className = "pn-cell"
  //   pnCell.textContent = pn.product_no;
  //   pnCell.dataset.id = pn.id; // データセットにIDを設定

  //   const checkbox = document.createElement("input");
  //   checkbox.className = "check-box";
  //   checkbox.type = "checkbox";
  //   checkbox.name = "allow_storage";
  //   checkbox.value = true;

  //   const check_pn = allow_storage_list.filter(item => item.pn_id === pn.id);

  //   if(check_pn.length>0){
  //     checkbox.checked = true;
  //   };

  //   checkbox.addEventListener("change", function () {
  //     if (checkbox.checked) {
  //       newRow.dataset.allow_storage = true;
  //     } else {
  //       delete newRow.dataset.allow_storage;
  //     }
  //   });

  //   newRow.appendChild(pnCell);
  //   newRow.appendChild(checkbox);
  //   table.appendChild(newRow);
  //   container.appendChild(table);
  // });



  // 初期状態ラジオボタンのチェック有無
  function setRadioSection() {
    if (cell_list[0].is_all_pn_allowed == true) {
      document.getElementById("all-allow").checked = true;
    } else {
      document.getElementById("pn-permission").checked = true;
    }

  };

  setRadioSection();


  // 全品番許可時のオーバーレイ処理
  const radioButtons = document.querySelectorAll('input[name="choice"]');
  const overlay = document.getElementById('pn-overlay');

  function toggleOverlay() {
    const selectedValue = document.querySelector('input[name="choice"]:checked').value;
    if (selectedValue === "true") {
      // 全品番許可　： オーバーレイ表示
      overlay.style.display = "block";
    }
    else {
      // 個別品番許可　：　オーバーレイ非表示で品番チェック機能が利用可能

      overlay.style.display = "none";
    }
  }

  // リロード時初期化
  toggleOverlay();

  // 変更時処理
  radioButtons.forEach(radio => {
    radio.addEventListener("change", toggleOverlay);
    // setTimeout(() => {
    //   container.scrollTop = container.scrollHeight;
    // }, 0);
  });
});

// キャンセルボタン処理
const cancelButton = document.getElementById("cancel-button");
cancelButton.addEventListener("click", function () {
  if (confirm("入力内容を破棄してよろしいですか？")) {
    window.location.href = `/cell_permission?cell_id=${cell_list[0].id}`; // ページをリロード
  }
});



// SAVEボタン押下時の送信データ準備処理
// 送付データまとめ用変数の構造定義
const dataToSend = {
  cell: [],
  allow_storage: []
};
const saveButton = document.getElementById("save-button");
saveButton.addEventListener("click", async function () {
  const rows = document.querySelectorAll("#input-container .pn-row");

  // cellテーブル用データ取得
  let is_all_pn_allowed = true;
  if (document.getElementById("pn-permission").checked == true) {
    is_all_pn_allowed = false;
  } else {
    is_all_pn_allowed = true;
  }
  dataToSend.cell = {
    id: cell_list[0].id,
    is_all_pn_allowed: is_all_pn_allowed
  };

  // エラーチェック用変数(個別品番許可で選択なし時のエラー検出用)
  let hasCheckRow = false;




  // allow_storage用データ取得
  rows.forEach(row => {
    const row_checked = row.querySelector("input[name='allow_storage']");
    const pn_id = row.dataset.id;

    // checkedがある場合のみ allow_storageにデータPUSH
    if (row_checked.checked == true) {
      dataToSend.allow_storage.push({
        cell_id: cell_list[0].id,
        pn_id: pn_id
      })
      hasCheckRow = true
    }
  })

  // hasCheckRow = false かつ is_all_pn_allowed = false; であれば エラー通知
  if (!hasCheckRow && !is_all_pn_allowed) {
    alert("許可対象が選択されていません。");
    return; // POST 処理をスキップ
  }


  // 送信処理(POST)
  try {
    const response = await fetch("/api/cell_permission/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dataToSend)
    });
    console.log("送信データ:", dataToSend)

    // レスポンスが正常ではない場合、バックエンドのエラーレスポンスを取得して処理
    if (!response.ok) {
      const errorResult = await response.json(); // バックエンドのエラーレスポンスを取得
      console.error("バックエンドエラー:", errorResult);
      throw new Error(errorResult.error || "保存エラー"); // バックエンドのエラーメッセージを投げる
    }

    const result = await response.json();
    console.log("送信結果:", result);
    alert("品番情報を保存しました。");
    window.history.back(); // 前のページに戻る

  } catch (error) {
    console.error("送信エラー:", error);
    alert(error);
  }

})


