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