import createAlertDisplayName from "./displayname.js"

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


class prodNumValidator{
    constructor(row){
        this.row=row;
        this.dataTosend=[];
        this.alertMessages=[];
        this.alertName = createAlertDisplayName(row);
    }

    isEmpty(value){
        return value === undefined ||value === null || value.trim() ==="";
    }

    validateFloat(value){
        return Number(value)===value ||!isNaN(Number(value));
    }

    checkifStockExists(pn_id){
        const stockExist = cell_stock_statuses.find(item => item.id ===pn_id);
        return stockExist !== undefined;
    }



     validateRowData() {
        // 板厚判定
        const isValidThickness = this.validateFloat(this.row["material_thickness"]);
        if(!isValidThickness){
            this.alertMessages.push(`${this.alertName}の板厚が無効です`)
        }
        // 切断長さ判定
        const isValidLength = this.validateFloat(this.row["cut_length"]);
        if(!isValidLength){
            this.alertMessages.push(`${this.alertName}の切断長さが無効です`)
        }
        // 品番判定
        const isValidprodNum = this.isEmpty(this.row["product_no"]);
        if(!isValidprodNum){
            this.alertMessages.push(`${this.alertName}の品番が無効です`);
        }
        // 背番号判定
        const isValidSerialNo = this.isEmpty(this.row["serial_no"]);
        if(!isValidSerialNo){
            this.alertMessages.push(`${this.alertName}の背番号が無効です`)
        }

        return this.alertMessages

    }



}