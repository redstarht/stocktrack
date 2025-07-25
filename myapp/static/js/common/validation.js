import { createAlertDisplayName } from "./displayname.js"

export function isArrayEmpty(array) {
    // 配列が存在し、かつその長さが0であるかを確認する
    return Array.isArray(array) && array.length === 0;
}


export function validateFloat(data) {
    if (Number(data) === data || !isNaN(Number(data))) {
        return true
    } else {
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


export class prodNumValidator {
    constructor(row) {
        this.row = row;
        this.dataTosend = [];
        this.alertMessages = [];
        this.alertName = createAlertDisplayName(row);
        this.alertprefix = null;

    }

    isEmpty(value) {
        return value === undefined || value === null || value.trim() === "";
    }

    validateFloat(value) {
        return Number(value) === value || !isNaN(Number(value));
    }

    checkifStockExists(pn_id) {
        const stockExist = cell_stock_statuses.find(item => item.id === pn_id);
        return stockExist !== undefined;
    }

    checkAlertprefix(alertprefix, message) {
        if (alertprefix) {
            this.alertMessages.push(message)
        } else {
            this.alertprefix = this.alertName;
            this.alertMessages.push(`${this.alertName}の${message}`)
        }
    }



    validateRowData() {
        // 板厚判定
        let message = null;
        
        const isValidThickness = this.validateFloat(this.row["material_thickness"]);
        if (!isValidThickness) {
            message = '板厚入力値が無効';
            this.checkAlertprefix(this.alertprefix, message);
        }
        // 切断長さ判定
        const isValidLength = this.validateFloat(this.row["cut_length"]);
        if (!isValidLength) {
            message = '切断長さが無効'
            this.checkAlertprefix(this.alertprefix, message);
        }
        // 品番判定
        const isValidprodNum = this.isEmpty(this.row["product_no"]);
        if (isValidprodNum) {
            message = '品番が無効'
            this.checkAlertprefix(this.alertprefix, message);
        }
        // 背番号判定
        const isValidSerialNo = this.isEmpty(this.row["serial_no"]);
        if (isValidSerialNo) {
            message = '背番号が無効'
            this.checkAlertprefix(this.alertprefix, message);
        }
        // console.log(this.alertMessages);
        return this.alertMessages

    }



}