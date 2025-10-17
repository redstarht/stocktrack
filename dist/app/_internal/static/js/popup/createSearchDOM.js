import { pop_load_localStorage, popSetupSearchBox } from "../common/change_select_search.js"
import { popChangeSearchBox } from "../common/change_select_search.js";

export function createSerialSearchDOM(serialSeachContainer) {
    const serialLabel = document.createElement('label');
    serialLabel.textContent = "背番号";
    serialLabel.className = "serialLabel";
    serialLabel.htmlFor = "pop-serial-search";

    const serialInput = document.createElement('input');
    serialInput.id = "pop-serial-search";
    serialInput.name = "serial-search";
    serialInput.inputMode = 'numeric';

    serialSeachContainer.appendChild(serialLabel);
    serialSeachContainer.appendChild(serialInput);
}
export function createLengthSearchDom(lengthSearchContainer) {
    const popLengthLabel = document.createElement('div');
    popLengthLabel.textContent = "長尺長さ";
    popLengthLabel.className = "lengthLabel";

    // 検索ボックス全体
    const popLengthSearchSelectBox = document.createElement("div");
    popLengthSearchSelectBox.id = "pop-search-select-box";
    popLengthSearchSelectBox.className = "flex-row flex-center gap-2"

    // 長尺長さ 部分検索ラジオボタンDOM
    const popParticalMatchSelect = document.createElement("div");
    popParticalMatchSelect.id = "pop-partical-match-select";
    popParticalMatchSelect.className = "flex-row gap-2"

    const popParticalMatchLabel = document.createElement("label");
    popParticalMatchLabel.id = "pop-partical-match-label";
    popParticalMatchLabel.htmlFor = "pop-partical-match";
    popParticalMatchLabel.textContent = "部分一致";


    const popParticalMatchRadio = document.createElement("input");
    popParticalMatchRadio.name = "pop-length-search-select"
    popParticalMatchRadio.type = "radio";
    popParticalMatchRadio.id = "pop-partical-match";

    popParticalMatchSelect.appendChild(popParticalMatchRadio);
    popParticalMatchSelect.appendChild(popParticalMatchLabel);

    // 長尺長さ 部分検索入力ボックス
    // const popParticalMatchInput = document.createElement("input");
    // popParticalMatchInput.inputMode = "numeric";
    // popParticalMatchInput.id = "pop-partical-match-search";

    // 範囲検索ラジオボタンDOM
    const popRangeSearchSelect = document.createElement("div");
    popRangeSearchSelect.id = "pop-range-search-select";
    popRangeSearchSelect.className = "flex-row gap-2"

    const popRangeSearchLabel = document.createElement("label");
    popRangeSearchLabel.id = "pop-range-search-label";
    popRangeSearchLabel.htmlFor = "pop-range-search";
    popRangeSearchLabel.textContent = "範囲選択"

    const popRangeSearchRadio = document.createElement("input");
    popRangeSearchRadio.name = "pop-length-search-select"
    popRangeSearchRadio.type = "radio";
    popRangeSearchRadio.id = "pop-range-search";

    popRangeSearchSelect.appendChild(popRangeSearchRadio);
    popRangeSearchSelect.appendChild(popRangeSearchLabel);

    // 範囲検索入力ボックス
    // const popRangeSearchInput = document.createElement("input");
    // popRangeSearchInput.inputMode = "numeric";
    // popRangeSearchInput.id = "pop-range-search-search";

    // 長尺長さ検索入力ボックス
    const popLengthSearchBox = document.createElement("div");
    popLengthSearchBox.id = "pop-length-search-box";
    popLengthSearchBox.className = "flex-row"


    const popSelectedRadioId = localStorage.getItem("popSelectedRadio");


    lengthSearchContainer.appendChild(popLengthLabel);
    popLengthSearchSelectBox.appendChild(popParticalMatchSelect);
    popLengthSearchSelectBox.appendChild(popRangeSearchSelect);
    lengthSearchContainer.appendChild(popLengthSearchSelectBox);
    lengthSearchContainer.appendChild(popLengthSearchBox);
    
    popSetupSearchBox(popLengthSearchBox, popSelectedRadioId);
    // setupが終わった後にlocalstorageから対象のラジオボタンをチェック
    pop_load_localStorage(popSelectedRadioId,popParticalMatchRadio,popRangeSearchRadio);
    popChangeSearchBox(popLengthSearchBox);

    return popLengthSearchBox;

}

export function createEntryContainerDom(entryContainer, stock_qty, max_qty) {
    // クリアボタン
    const popClearBtn = document.createElement('button');
    popClearBtn.textContent = "クリア";
    popClearBtn.id = "pop-clear-button";


    // 格納されている在庫数の表示
    const popStockTitle = document.createElement('div');
    popStockTitle.className = "pop-stock-title";

    const popStockLabel = document.createElement('div');
    popStockLabel.className = "pop-stock-label";
    popStockLabel.textContent = stock_qty;
    popStockLabel.id = "pop-stock-label";

    const popStockMax = document.createElement('div');
    popStockMax.className = "pop-stock-max";
    popStockMax.id = "pop-stock-max";
    popStockMax.textContent = `/${max_qty}`;

    popStockTitle.appendChild(popStockLabel);
    popStockTitle.appendChild(popStockMax);

    // 検索ボタン
    const popSearchBtn = document.createElement('button');
    popSearchBtn.textContent = "検索";
    popSearchBtn.className = "pop-search-button";
    popSearchBtn.id = "pop-search-btn";

    entryContainer.appendChild(popClearBtn);
    entryContainer.appendChild(popStockTitle);
    entryContainer.appendChild(popSearchBtn);


    return {
        popStockLabel,
        popClearBtn,
        popStockTitle,
        popStockMax,
        popSearchBtn
    }
}