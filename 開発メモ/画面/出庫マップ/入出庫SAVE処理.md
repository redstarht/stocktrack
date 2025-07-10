# 入出庫SAVE処理
要件
・入庫時 / 出庫時 どちらも同じデータ構造になるように
　フロント側でデータ整形する必要性あり

## データ構造
・dataTosend = 
{'cell_stock_status': {'cell_id': 19, 'pn_id': '5', 'stock_qty': 3},
 'inout_log': {'cell_id': 19, 'pn_id': '5', 'inout_type': 'in', 'change_qty': 3, 'stock_after': 3}}

・各セルのdata属性 = 
cellData = 
            const dataObj = {
                cell_id: cell.id,
                is_all_pn_allowed: cell.is_all_pn_allowed,
                max_qty: max_qty ?? '',
                pn_id: stock_cell?.pn_id ?? '',
                serial_no: product_number?.serial_no ?? '',
                stock_qty: stock_cell?.stock_qty ?? 0
            }
            cellBtn.dataset.item = JSON.stringify(dataObj);
```html
            <button data-displayname="null" class="cell-stock-btn" data-item="{&quot;cell_id&quot;:2,&quot;is_all_pn_allowed&quot;:true,&quot;max_qty&quot;:3,&quot;pn_id&quot;:2,&quot;serial_no&quot;:&quot;001&quot;,&quot;stock_qty&quot;:2}"><i class="btn-pn-stock">001</i></button>
```
##### 入出庫数変化時に変更必要な項目名
・pn_id
・serial_no
・stock_qty
・


## 操作テーブル
    ・cell_stock_status
    ・inout_log

### 新規入庫時
    ・入力したcell_id
    ・出力したcell_id
    ・cellBtnのdata属性の変更

### 既存格納製品の入出時
・POPUPの表示サイズを変更
・プラス / マイナス ボタンのサイズを拡大

#### セル格納数が0になった場合
・cellBtnのdata属性の変更
　➡既存のcellBtnのdata-item の項目の一部を一部部分変更

#### セル格納数があった場合
・cell


## バリデーションチェック
https://chatgpt.com/share/686a1c85-5be8-8011-9bdd-962416742f56

## 例外処理
    ・何もせずに終了した場合の処理
    ・全部POPした時の処理
        ・inout_logに全部取り出した時にpn_idを記述できる状態にする
        ・マップの描画を入庫アイコンにする
        ・
    ・

### メモ
 const popup = document.getElementById('popup'); // 
poplabelContainer.className = "pop-label-container";
    stockContainer.className = "pop-stock-container"
    closeContainer.className = "close-container";

PnCellTrueがない場合は
新規格納時じゃないときなので
その有無で条件分岐を構築するべき




### プロンプト
もともとこのようなクラス名 idが指定されており
cssでビジュアルを変えています
ある条件下の時だけこの要素のビジュアルを変えたいです
どういう指定の仕方をするのが適切？
おそらくjsでif分で、ある条件下の元にだけ特別なクラスを追加して
そのクラスをcssで指定して!important指定して上書きするみたいなやり方を
構想しているのですが正しいですか？？？



