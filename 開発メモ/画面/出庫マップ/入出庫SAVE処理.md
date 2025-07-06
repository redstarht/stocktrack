# 入出庫SAVE処理
要件
・入庫時 / 出庫時 どちらも同じデータ構造になるように
　フロント側でデータ整形する必要性あり

## データ構造
{'cell_stock_status': {'cell_id': 19, 'pn_id': '5', 'stock_qty': 3},
 'inout_log': {'cell_id': 19, 'pn_id': '5', 'inout_type': 'in', 'change_qty': 3, 'stock_after': 3}}

## 操作テーブル
    ・cell_stock_status
    ・inout_log

### 新規入庫時
    ・入力したcell_id
    ・出力したcell_id

### 出庫処理時


## バリデーションチェック
https://chatgpt.com/share/686a1c85-5be8-8011-9bdd-962416742f56

## 例外処理

