export function initPnHighlight() {
    // すべての品番ボタンを取得
    const pnButtons = document.querySelectorAll(".pn-item");
    // すべてのセルを取得
    const cells = document.querySelectorAll(".cell");

    pnButtons.forEach(button => {
        button.addEventListener("click", function () {
            // 1. 全セルの強調をリセット
            cells.forEach(cell => {
                cell.classList.remove("blink-highlight");
            });

            // 2. 品番属性を取得
            const selectedPn = button.getAttribute("data-pn");
            // すべてのセルのhighlightをリセット
            cells.forEach(cell => {
                if (cell.classList.contains("blink-highlight")) {
                    cell.classList.remove("blink-highlight");
                }
            });
            //    品番名と同じ属性のセルを強調
            cells.forEach(cell => {
                if (cell.getAttribute("data-pn") === selectedPn) {
                    cell.classList.add("blink-highlight");
                    ;
                } else {
                    cell.classList.remove("blink-highlight");
                }
            });
        });
    });
    console.log("✅品番ハイライトモジュール読み込み")
};


export function resetPnHignlight() {
    const cells = document.querySelectorAll(".cell");
    // 全セルの強調をリセット
    cells.forEach(cell => {
        cell.classList.remove("blink-highlight");

    });
}

