document.addEventListener("DOMContentLoaded", function () {
    // すべての品番ボタンを取得
    const zoneBtns = document.querySelectorAll(".zone-item");
    // すべての棚を取得
    const shelves = document.querySelectorAll(".shelf");

    zoneBtns.forEach(zoneBtn => {
        zoneBtn.addEventListener("click", () => {
            const zoneId = zoneBtn.dataset.zone;
            shelves.forEach(shelf => {
                if(shelf.dataset.zone === zoneId) {
                    shelf.style.display = "block"; // 表示
                } else {
                    shelf.style.display = "none"; // 非表示
                }
            });

        });
    });
});
