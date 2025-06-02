document.addEventListener("DOMContentLoaded", function () {
    // すべての品番ボタンを取得
    const pnButtons = document.querySelectorAll(".pn-item");
    // すべてのセルを取得
    const cells = document.querySelectorAll(".cell");

    pnButtons.forEach(button => {
        button.addEventListener("click", function () {
            // 1. 全セルの強調をリセット
            cells.forEach(cell => {
                cell.classList.remove("highlight");
            });

            // 2. 品番属性を取得
            const selectedPn = button.getAttribute("data-pn");
            // すべてのセルのhighlightをリセット

            // 3. モック的な対応ロジック
            //    ここでは、単純に「品番名と同じ属性のセルを強調」
            cells.forEach(cell => {
                if (cell.getAttribute("data-pn") === selectedPn) {
                    cells.forEach(cell => {
                        cell.classList.remove("highlight");
                    });
                    if (cell.classList.contains("highlight")) {
                        cell.classList.remove("highlight");
                    } else {
                        cell.classList.add("highlight");
                    }

                }
            });
        });
    });
});