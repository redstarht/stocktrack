

function isChanged(original, edited) {
    // 比較するキー一覧
    console.log("オリジナル", original)
    const keys = [
        "serial_no",
        "product_no",
        "material",
        "outer_diam",
        "material_thickness",
        "cut_length",
        "long_length",
        "is_deleted"
    ];
    let edit_value = []
    for (const key of keys) {
        if (original) {

            console.log("Now:", original[key])
            console.log("Edit:", edited[key])
            // originalがデフォルト値(-1.0)の場合は 空文字として変換
            if (String(original[key]) == "-1.0") {
                original[key] = "";
            }

            // 型の違いによる不一致も考慮（両方文字列化して比較）
            if (String(edited[key]) && String(original[key]) !== String(edited[key])) {
                edit_value.push(
                    `${[key]}:${edited[key]}`
                )
            }
        } else {
            edit_value.push(
                `${[key]}:${edited[key]}`
            )
        }
    }
    if (edit_value.length > 0) {
        return {
            'change_flag': true,
            'item': edit_value
        }
    } else {
        return {
            'change_flag': false
        }
    }
}
// 配列で判定する場合
export function hasAnyChangedItem(originalArray, editedArray) {
    let is_changed = false
    let changeItems = []
    let changeInfo
    editedArray.forEach(editedObj => {
        const originalObj = originalArray.find(o => String(o.id) === String(editedObj.id));
        let changeObj = isChanged(originalObj, editedObj);
            // ★ originalObj が undefined でかつ editedObj に入力がある場合の処理追記　➡ レコード追加の場合は変更有で出力
        

        if (changeObj.change_flag) {
            is_changed = true
            changeItems.push(changeObj.item)
        }
    });
    changeInfo = {
        "change_flag": is_changed,
        "Items": changeItems
    }
    return changeInfo


}