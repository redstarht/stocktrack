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
                if (shelf.dataset.zone_id === zoneId) {
                    shelf.style.display = "block"; // 表示
                    console.log("✅棚が再生成されました！", zoneId)
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



export function cycleZone() {
    const checkbox = document.getElementById('flexSwitchCheckDefault');
    const buttons = document.querySelectorAll('.zone-item');
    let currentIndex = 0;
    let intervalId;

    // チェックボックスの状態が変更されたときに呼ばれる関数
    function handleCheckboxChange() {
        if (checkbox.checked) {
            // チェックが入ったとき、ボタンを自動で押す処理を開始
            startAutoClick();
        } else {
            // チェックが外れたとき、自動クリックを停止
            stopAutoClick();
        }
    }

    // ボタンを自動でクリックする処理
    function startAutoClick() {
        intervalId = setInterval(() => {
            // 現在のボタンをクリック
            buttons[currentIndex].click();
            console.log(`ボタン ${currentIndex + 1} がクリックされました`);

            // インデックスを更新
            currentIndex = (currentIndex + 1) % buttons.length;
        }, 2000); // 2000ミリ秒（1.5秒）ごとに実行
    }

    // 自動クリックを停止する処理
    function stopAutoClick() {
        clearInterval(intervalId);
        currentIndex = 0; // インデックスをリセット
    }

    // チェックボックスにイベントリスナーを設定
    checkbox.addEventListener('change', handleCheckboxChange);

};
