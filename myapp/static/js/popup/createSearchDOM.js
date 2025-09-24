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
    
    const lengthSearchSelectBox = document.createElement("div");
    l

}