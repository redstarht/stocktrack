export function initZoneSort() {
    // すべてのゾーンを取得
    const zoneBtns = document.querySelectorAll(".zone-item");
    // すべての品番ボタンを取得
    const pnBtns = document.querySelectorAll(".pn-item");
    
    // すべての棚を取得
    const shelves = document.querySelectorAll(".shelf");
    const allzone = document.querySelector(".allzone");
    // 全ての棚を表示するボタン
    allzone.addEventListener("click", () => {
        shelves.forEach(shelf => {
            shelf.style.display = "block"; // 全ての棚を表示
        });
        // 全ての品番リストを表示
        pnBtns.forEach(pnBtn => {
            pnBtn.style.display = "block"; // 全ての品番リストを表示
        });
    });

    zoneBtns.forEach(zoneBtn => {
        zoneBtn.addEventListener("click", () => {
            const zoneId = zoneBtn.dataset.zone_id;
            shelves.forEach(shelf => {
                if(shelf.dataset.zone_id === zoneId) {
                    shelf.style.display = "block"; // 表示
                } else {
                    shelf.style.display = "none"; // 非表示
                }
            });
            // ゾーンに存在する品番リストの表示

            // pnBtns.forEach(pnBtn => {
            //     const pnZone = pnBtn.dataset.zone_id;
            //     if (pnZone === zoneId) {
            //         pnBtn.style.display = "block"; // 表示
            //     } else {
            //         pnBtn.style.display = "none"; // 非表示
            //     }
            // });


        });
    });
};
