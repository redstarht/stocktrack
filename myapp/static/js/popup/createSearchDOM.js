import { pop_load_localStorage, setupSearchBox } from "../common/change_select_search.js"
import { popChangeSearchBox } from "../common/change_select_search.js";

export function createSerialSearchDOM(serialSeachContainer) {
    const serialLabel = document.createElement('label');
    serialLabel.textContent = "背番号";
    serialLabel.className = "serialLabel";
    serialLabel.htmlFor = "serial-search";

    const serialInput = document.createElement('input');
    serialInput.id = "serial-search";
    serialInput.name = "serial-search";
    serialInput.inputMode = 'numeric';

    serialSeachContainer.appendChild(serialLabel);
    serialSeachContainer.appendChild(serialInput);
}
export function createLengthSearchDom(lengthSearchContainer) {
    const popLengthLabel = document.createElement('label');
    popLengthLabel.textContent = "長尺長さ";
    popLengthLabel.className = "lengthLabel";

    // 検索ボックス全体
    const popLengthSearchSelectBox = document.createElement("div");
    popLengthSearchSelectBox.id = "pop-search-select-box";

    // 長尺長さ 部分検索ラジオボタンDOM
    const popParticalMatchSelect = document.createElement("div");
    popParticalMatchSelect.id = "pop-partical-match-select";

    const popParticalMatchLabel = document.createElement("label");
    popParticalMatchLabel.id = "pop-partical-match-label";
    popParticalMatchLabel.htmlFor ="pop-partical-match";
    popParticalMatchLabel.textContent="部分一致";

    const popParticalMatchRadio = document.createElement("input");
    popParticalMatchRadio.name = "pop-length-search-select"
    popParticalMatchRadio.type = "radio";
    popParticalMatchRadio.id = "pop-partical-match";

    popParticalMatchSelect.appendChild(popParticalMatchLabel);
    popParticalMatchSelect.appendChild(popParticalMatchRadio);

    // 長尺長さ 部分検索入力ボックス
    // const popParticalMatchInput = document.createElement("input");
    // popParticalMatchInput.inputMode = "numeric";
    // popParticalMatchInput.id = "pop-partical-match-search";

    // 範囲検索ラジオボタンDOM
    const popRangeSearchSelect = document.createElement("div");
    popRangeSearchSelect.id = "pop-range-search-select";

    const popRangeSearchLabel = document.createElement("label");
    popRangeSearchLabel.id = "pop-range-search-label";
    popLengthLabel.htmlFor = "pop-range-search";
    popLengthLabel.textContent ="範囲選択"

    const popRangeSearchRadio = document.createElement("input");
    popRangeSearchRadio.name = "pop-length-search-select"
    popRangeSearchRadio.type = "radio";
    popRangeSearchRadio.id = "pop-range-search";

    popRangeSearchSelect.appendChild(popRangeSearchLabel);
    popRangeSearchSelect.appendChild(popRangeSearchRadio);

    // 範囲検索入力ボックス
    // const popRangeSearchInput = document.createElement("input");
    // popRangeSearchInput.inputMode = "numeric";
    // popRangeSearchInput.id = "pop-range-search-search";

    // 長尺長さ検索入力ボックス
    const popLengthSearchBox = document.createElement("div");
    popLengthSearchBox.id = "pop-length-search-box";

    const popSelectedRadioId = localStorage.getItem("popSelectedRadio");
    pop_load_localStorage(popSelectedRadioId);
    setupSearchBox(popLengthSearchBox,popSelectedRadioId);
    popChangeSearchBox(popLengthSearchBox);

    lengthSearchContainer.appendChild(popLengthLabel);
    popLengthSearchSelectBox.appendChild(popParticalMatchSelect);
    popLengthSearchSelectBox.appendChild(popRangeSearchSelect);
    lengthSearchContainer.appendChild(popLengthSearchSelectBox);
    lengthSearchContainer.appendChild(popLengthSearchBox);
}