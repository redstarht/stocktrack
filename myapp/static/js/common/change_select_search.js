export function save_localStorage() {

    // ローカルストレージから選択されたラジオボタンのIDを取得
    const selectedRadioId = localStorage.getItem('selectedRadio');

    // 取得したIDが存在する場合、そのラジオボタンを選択する
    // 初期ロード時は、「部分一致」を選択
    if (selectedRadioId) {
        const radioButton = document.getElementById(selectedRadioId);
        if (radioButton) {
            radioButton.checked = true;
        }
    }else{
        const initRadioButton = document.getElementById('range-select');
        if(initRadioButton){
            initRadioButton.checked = true;
        }
    }

    // 各ラジオボタンにchangeイベントリスナーを追加
    const radioButtons = document.querySelectorAll('input[name="length-search-select"]');
    radioButtons.forEach((radio) => {
        radio.addEventListener('change', () => {
            // 選択されたラジオボタンのIDをローカルストレージに保存
            localStorage.setItem('selectedRadio', radio.id);
        });
    });

}

// 「部分一致」or 「範囲選択」レンダリング処理
export function render_search_box(){
    


}


// クリアボタン機能

