# 入出庫SAVE処理
要件
・入庫時 / 出庫時 どちらも同じデータ構造になるように
　フロント側でデータ整形する必要性あり

## データ構造
・dataTosend
{'cell_stock_status': {'cell_id': 19, 'pn_id': '5', 'stock_qty': 3},
 'inout_log': {'cell_id': 19, 'pn_id': '5', 'inout_type': 'in', 'change_qty': 3, 'stock_after': 3}}

## 操作テーブル
    ・cell_stock_status
    ・inout_log

### 新規入庫時
    ・入力したcell_id
    ・出力したcell_id

### 既存格納製品の入出時
・POPUPの表示サイズを変更
・プラス / マイナス ボタンのサイズを拡大
・


## バリデーションチェック
https://chatgpt.com/share/686a1c85-5be8-8011-9bdd-962416742f56

## 例外処理
    ・何もせずに終了した場合の処理
    ・全部POPした時の処理
        ・inout_logに全部取り出した時にpn_idを記述できる状態にする
        ・マップの描画を入庫アイコンにする
        ・
    ・

###メモ
poplabelContainer.className = "pop-label-container";
      stockContainer.className = "pop-stock-container"