export function load_localStorage(selectedRadioId) {

    // 取得したIDが存在する場合、そのラジオボタンを選択する
    // 初期ロード時は、「部分一致」を選択
    if (selectedRadioId) {
        const radioButton = document.getElementById(selectedRadioId);
        if (radioButton) {
            radioButton.checked = true;
        }
    } else {
        const initRadioButton = document.getElementById('partical-match');
        if (initRadioButton) {
            initRadioButton.checked = true;
        }
    }
}

export function pop_load_localStorage(popSelectedRadioId, popParticalMatchRadio, popRangeSearchRadio) {
    // 取得したIDが存在する場合、そのラジオボタンの検索boxを選択する
    // 初期ロード時は、「部分一致」を選択
    if (popSelectedRadioId == "pop-partical-match") {
        if (popParticalMatchRadio) {
            popParticalMatchRadio.checked = true;
        }
    } else if (popSelectedRadioId == "pop-range-search") {
        if (popRangeSearchRadio) {
            popRangeSearchRadio.checked = true;
        }
    } else {
        popParticalMatchRadio.checked = true;
    }

}

// 「部分一致」or 「範囲選択」レンダリング処理
export function setupSearchBox(lengthSearchBox, selectedRadioId) {
    // 初期ロード時は部分一致
    // ロード時は検索ボタンを描画
    lengthSearchBox.innerHTML = '';
    const mmUnit = document.createElement('span');
    mmUnit.textContent = '(mm)';
    mmUnit.className = 'unit';

    if (selectedRadioId == 'range-search') {
        const { rangeSearchStart, rangeSearchEnd } = createRangeSearchElm(lengthSearchBox, mmUnit);
        rangeSearchStart.id = 'rangeStart';
        rangeSearchEnd.id = 'rangeEnd';

    } else {
        const particalMatch = createParticalSearchElm(lengthSearchBox, mmUnit);
        particalMatch.id = 'particalMatch';
    }
}

export function changeSearchBox(lengthSearchBox) {
    const mmUnit = document.createElement('span');
    mmUnit.textContent = '(mm)';
    mmUnit.className = 'unit';
    const radioButtons = document.querySelectorAll('input[name="length-search-select"]');
    radioButtons.forEach((radio) => {
        radio.addEventListener('change', () => {
            // 選択されたラジオボタンのIDをローカルストレージに保存
            localStorage.setItem('selectedRadio', radio.id);
            lengthSearchBox.innerHTML = '';
            if (radio.id == 'range-search') {
                const { rangeSearchStart, rangeSearchEnd } = createRangeSearchElm(lengthSearchBox, mmUnit);
                rangeSearchStart.id = 'rangeStart';
                rangeSearchEnd.id = 'rangeEnd';

            } else {
                const particalMatch = createParticalSearchElm(lengthSearchBox, mmUnit);
                particalMatch.id = 'particalMatch';
            }


        });
    });
}

// **ポップアップ**「部分一致」or 「範囲選択」レンダリング処理
export function popSetupSearchBox(lengthSearchBox, selectedRadioId) {
    // 初期ロード時は部分一致
    // ロード時は検索ボタンを描画
    lengthSearchBox.innerHTML = '';
    const mmUnit = document.createElement('span');
    mmUnit.textContent = '(mm)';
    mmUnit.className = 'unit';

    if (selectedRadioId == 'pop-range-search') {
        const { rangeSearchStart, rangeSearchEnd } = createRangeSearchElm(lengthSearchBox, mmUnit);
        rangeSearchStart.id = 'pop-rangeStart';
        rangeSearchEnd.id = 'pop-rangeEnd';
    } else {
        const particalMatch = createParticalSearchElm(lengthSearchBox, mmUnit);
        particalMatch.id = 'pop-particalMatch';
    }
}

export function popChangeSearchBox(lengthSearchBox) {
    const mmUnit = document.createElement('span');
    mmUnit.textContent = '(mm)';
    mmUnit.className = 'unit';
    const radioButtons = document.querySelectorAll('input[name="pop-length-search-select"]');
    radioButtons.forEach((radio) => {
        radio.addEventListener('change', () => {
            // 選択されたラジオボタンのIDをローカルストレージに保存
            localStorage.setItem('popSelectedRadio', radio.id);
            lengthSearchBox.innerHTML = '';
            if (radio.id == 'pop-range-search') {
                const { rangeSearchStart, rangeSearchEnd } = createRangeSearchElm(lengthSearchBox, mmUnit);
                rangeSearchStart.id = 'pop-rangeStart';
                rangeSearchEnd.id = 'pop-rangeEnd';

            } else {
                const particalMatch = createParticalSearchElm(lengthSearchBox, mmUnit);
                particalMatch.id = 'pop-particalMatch';
            }


        });
    });


}


function createRangeSearchElm(lengthSearchBox, mmUnit) {
    const rangeSearchStart = document.createElement('input');
    rangeSearchStart.className = 'range-search';
    rangeSearchStart.name = 'long-length';
    rangeSearchStart.inputMode = 'numeric';
    const StartmmUnit = document.createElement('span');
    StartmmUnit.textContent = '(mm)';
    StartmmUnit.className = 'unit';
    const tildeElm = document.createElement('span');
    tildeElm.className = 'unit';
    tildeElm.textContent = '~';
    const rangeSearchEnd = document.createElement('input');
    rangeSearchEnd.className = 'range-search';
    rangeSearchEnd.name = 'long-length';
    rangeSearchEnd.inputMode = 'numeric';
    lengthSearchBox.appendChild(rangeSearchStart);
    lengthSearchBox.appendChild(StartmmUnit);
    lengthSearchBox.appendChild(tildeElm);
    lengthSearchBox.appendChild(rangeSearchEnd);
    lengthSearchBox.appendChild(mmUnit);
    return { rangeSearchStart, rangeSearchEnd }

}

function createParticalSearchElm(lengthSearchBox, mmUnit) {
    const particalMatch = document.createElement('input');
    particalMatch.className = 'long-length';
    particalMatch.inputMode = 'numeric';
    lengthSearchBox.appendChild(particalMatch);
    lengthSearchBox.appendChild(mmUnit);
    return particalMatch

}

// クリアボタン機能

