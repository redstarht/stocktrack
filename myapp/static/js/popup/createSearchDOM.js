import {pop_load_localStorage,setupSearchBox} from "../common/change_select_search.js"

export function createSerialSearchDOM(serialSeachContainer){
     const serialLabel = document.createElement('label');
        serialLabel.textContent = "背番号";
        serialLabel.className ="serialLabel";
        serialLabel.htmlFor ="serial-search";

        const serialInput = document.createElement('input');
        serialInput.id = "serial-search";
        serialInput.name = "serial-search";
        serialInput.inputMode = 'numeric';

        serialSeachContainer.appendChild(serialLabel);
        serialSeachContainer.appendChild(serialInput);
}
export function createLengthSearchDom(lengthSearchContainer){
    const lengthLabel = document.createElement('label');
    lengthLabel.textContent ="長尺長さ";
    lengthLabel.className = "lengthLabel";
    
    // 検索ボックス全体
    const lengthSearchSelectBox = document.createElement("div");
    lengthSearchSelectBox.id = "pop-search-select-box";

    // 部分検索ラジオボタンDOM
    const particalMatchSelect = document.createElement("div");
    particalMatchSelect.id = "pop-partical-match-select";

    const particalMatchLabel = document.createElement("label");
    particalMatchLabel.id = "pop-partical-match-label";

    const particalMatchInput = document.createElement("input");
    particalMatchInput.name ="serial-no";
    particalMatchInput.inputMode="numeric";
    particalMatchInput.id= "pop-partical-match";

    // 範囲検索ラジオボタンDOM
    const rangeSearchSelect = document.createElement("div");
    rangeSearchSelect.id = "pop-range-search-select";

    const rangeSearchLabel = document.createElement("label");
    rangeSearchLabel.id = "pop-range-search-label";

    const rangeSearchInput = document.createElement("input");
    rangeSearchInput.name ="serial-no";
    rangeSearchInput.inputMode="numeric";
    rangeSearchInput.id= "pop-range-search";

    const lengthSearchBox = document.createElement("div");
    lengthSearchBox.id = "pop-length-search-box";

    const popSelectedRadioId = localStorage.getItem("popSelectedRadio");
    



}