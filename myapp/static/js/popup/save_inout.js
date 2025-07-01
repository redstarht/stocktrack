export function saveCheckedData(cell_id,stock_qty) {

    const pnCellTrue = document.querySelector('.radio-btn:checked');
    // データ格納処理

    // IN / OUT判定
      //  IN字
      // OUT時
    console.log("選択したPNID",pnCellTrue.parentElement.dataset.id);
    console.log("保存ボタンがクリックされました。選択されたオブジェクト:", pnCellTrue);
    console.log(cell_id,stock_qty);

}