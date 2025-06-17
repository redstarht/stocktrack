document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("input-container");

  // セル情報の表示(全品番許可有無)
  console.log(cell_list);
  


  // バックエンドで取得したデータをinput要素に設定
  pn_list.forEach(pn => {
    const newRow = document.createElement("div");
    newRow.className = "input-row";

    const newInput = document.createElement("input");
    newInput.type = "text";
    newInput.name = "pn-input";
    newInput.value = pn.product_no;
    newInput.dataset.id = pn.id; // データセットにIDを設定

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="bi bi-x-circle"></i>';
    deleteBtn.className = "delete-button";
    deleteBtn.addEventListener("click", function () {
      newRow.dataset.deleted = "true"; // 削除フラグを設定
      newRow.display = "none"; // 行を非表示にする
    });

    newRow.appendChild(newInput);
    newRow.appendChild(deleteBtn);
    container.appendChild(newRow);
  });



  // 初期状態ラジオボタンのチェック有無
  function setRadioSection(){
    if (cell_list[0].is_all_pn_allowed == true){
      document.getElementById("all-allow").checked = true;
    }else{
      document.getElementById("pn-permission").checked = true;
    }

  };

  setRadioSection();


  // 全品番許可時のオーバーレイ処理
    const radioButtons = document.querySelectorAll('input[name="choice"]');
    const overlay = document.getElementById('pn-overlay');
    
    function toggleOverlay(){
      const selectedValue = document.querySelector('input[name="choice"]:checked').value;
      if (selectedValue === "true"){
        // 全品番許可　： オーバーレイ表示
        overlay.style.display = "block";
      }
      else{
        // 個別品番許可　：　オーバーレイ非表示で品番チェック機能が利用可能
        overlay.style.display ="none";
      }
    }

    // リロード時初期化
    toggleOverlay();

    // 変更時処理
    radioButtons.forEach(radio =>{
      radio.addEventListener("change",toggleOverlay);

    });

    







  // 品番追加ボタン押下処理
  document.getElementById("add-button").addEventListener("click", function () {


    const newRow = document.createElement("div");
    newRow.className = "input-row";

    const newInput = document.createElement("input");
    newInput.type = "text";
    newInput.name = "pn-input";

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="bi bi-x-circle"></i>';
    deleteBtn.className = "delete-button";
    deleteBtn.addEventListener("click", function () {
      container.removeChild(newRow);
    });

    newRow.appendChild(newInput);
    newRow.appendChild(deleteBtn);
    container.appendChild(newRow);
  });



  // 削除ボタン押下処理
  document.querySelectorAll(".delete-button").forEach(button => {
    button.addEventListener("click", function () {
      this.parentElement.style.display = "none"; // 行を非表示にする
      // 削除フラグを設定
      this.parentElement.dataset.deleted = "true"; // 削除フラグを設定
    });
  });
});


// SAVEボタン押下時の送信データ準備処理

const saveButton = document.getElementById("save-button");
saveButton.addEventListener("click", async function () {
  const rows = document.querySelectorAll("#input-container .input-row");
  const dataToSend = [];
  rows.forEach(row => {
    const input = row.querySelector("input[name='pn-input']");
    const id = input.dataset.id || null;
    const product_no = input.value.trim();
    const deleted = row.dataset.deleted === "true";

    dataToSend.push({
      id: id,
      product_no: product_no,
      is_deleted: deleted
    })


  })

  // キャンセルボタン処理
  const cancelButton = document.getElementById("cancel-button");
  cancelButton.addEventListener("click", function () {
    if (confirm("入力内容を破棄してよろしいですか？")) {
      window.location.href = "/pn_ctrl"; // ページをリロード
    }
  });


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
    alert("品番情報を保存しました。");

  } catch (error) {
    console.error("送信エラー:", error);
    alert("送信中にエラーが発生しました。コンソールを確認してください。");
  }

})


