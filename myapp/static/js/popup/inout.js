export function saveCheckedData(saveBtn) {
  // Save button click handler
  saveBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
    popup.style.display = 'none';
    const pnCellTrue = document.querySelector('.radio-btn:checked');
    // データ格納処理
    // ここにデータを保存するロジックを追加
    console.log("保存ボタンがクリックされました。選択されたオブジェクト:", pnCellTrue);
  });
}