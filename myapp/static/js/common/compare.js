let test_trueObj =[]

function isChanged(original, edited) {
    // 比較するキー一覧
    
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
    for (const key of keys) {
        // 型の違いによる不一致も考慮（両方文字列化して比較）
        // originalがデフォルト値(-1.0)の場合は 空文字として変換

        if(String(original[key])=="-1.0"){
            original[key] = "";
        }

        if (String(edited[key]) && String(original[key]) !== String(edited[key])) {
            console.log("Now:",original[key])
            console.log("Edit:",edited[key])
            return true; // 変更あり
        }
    }
    return false; // 変更なし
}
// 配列で判定する場合
export function hasAnyChangedItem(originalArray, editedArray) {
    // idで対応付けて、どれか1つでもisChangedがtrueならtrueを返す
    return editedArray.some(editedObj => {
        const originalObj = originalArray.find(o => String(o.id) === String(editedObj.id));
        return originalObj && isChanged(originalObj, editedObj);
    });
}