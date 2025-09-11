const storage = localStorage;  // ストレージをlocalStorageに設定

const input = document.querySelector('input');
const output = document.getElementById('output');
const submit = document.getElementById('submit');

submit.addEventListener('click', () => {
  output.textContent = input.value;
  storage.store = input.value; // 'store'キーに入力値を記録
});
document.addEventListener('DOMContentLoaded', () => {
  const storagedData = storage.store;  // ストレージデータの取得
  output.textContent = storagedData;   // div要素に出力
});