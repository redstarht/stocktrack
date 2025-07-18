export function isArrayEmpty(array) {
    // 配列が存在し、かつその長さが0であるかを確認する
    return Array.isArray(array) && array.length === 0;
}


export function validateFloat(data){
    if(Number(data)===data ||!isNaN(Number(data))){
        return true
    }else{
        return false;
    }
}

export function checkifStockExists(pn_id) {
    // pnのis_deletedがtrueであれば stock_statusに格納されている品番でないかを確認する
    const stock = cell_stock_statuses.find(item => item.id === pn_id);
    return stock !== undefined;
}
// ```
// pn_ctrlで棚に格納されている品番を削除してしまった(is_deleted = True)の場合は
// エラー警告を出す
// ```