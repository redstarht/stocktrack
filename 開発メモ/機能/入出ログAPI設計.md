- [入出ログAPI設計](#入出ログapi設計)
  - [目的](#目的)
  - [取得テーブル](#取得テーブル)
      - [マスターテーブル](#マスターテーブル)
      - [実績テーブル](#実績テーブル)
  - [エンドポイント設計](#エンドポイント設計)
    - [バージョン管理](#バージョン管理)
    - [エンドポイントURL](#エンドポイントurl)
      - [`/zone`](#zone)
      - [`/shelf`](#shelf)
      - [`/cell`](#cell)
      - [`/product_number`](#product_number)
      - [`/inout_log`](#inout_log)
      - [`/cell_stock_status`](#cell_stock_status)
    - [レスポンス設計](#レスポンス設計)
      - [エラーレスポンスのフォーマットとコード定義](#エラーレスポンスのフォーマットとコード定義)
  - [性能・負荷要件](#性能負荷要件)
    - [最大取得件数の上限](#最大取得件数の上限)
  - [運用・保守](#運用保守)
    - [ログ監視](#ログ監視)


# 入出ログAPI設計
## 目的
- クライアント側利用ツール
  - PowerBI / PowerQuery
  - 考慮すべき点
    - PowerQueryでデータ取得するためページネーションが実装できない
      - 実績テーブルから取得する件数を把握し、指示した上限値に対して超える見込みであればエラーとしてレスポンス
      - ニーズが見込まれる「年単位」でのデータ取得はcsv出力を実装し対応

## 取得テーブル
※マスターデータとなるテーブルは論理削除されたレコードも含めてreturnする
#### マスターテーブル 
- Zone
- Shelf
- Cell
- product_number

#### 実績テーブル
- cell_stock_status
- inout_log
    - ※ cell_stock_statusにレコードがあったらinout_logの該当レコードに「入庫中」っていうメッセージを追加できるかも。。。

## エンドポイント設計
### バージョン管理
 `prefix`:/api/v1/inout_log

### エンドポイントURL
#### `/zone`
```json
"success":true,
"data":[
{"id":"1",
"name":"A"}
]

```

#### `/shelf`
※columnとrowは返さない
```json
"success":true,
"data":[
{"id":"1",
"name":"A",
"zone_id":"1",
"shelf_sort":"999"
}
]

```

#### `/cell`
```json
"success":true,
"data":[
{"id":"1",
"name":"A_1",
"shelf_id":"1",
"max_qty":"3",
}
]

```

#### `/product_number`
```json
"success":true,
"data":[
{"id":"1",
"product_no":"12345-12345",
"name":"A_1",
"serial_no":"T74",
"material":"SMNB20-165",
"outer_diam":"3.0",
"material_thickness":"2.0",
"cut_length":"1000",
"long_lenght":"5400",
"create_at":"2025/10/29 11:48:53.349",
"updated_at":"2025/10/29 11:48:53.349",
}
]

```

#### `/inout_log`
```json
"success":true,
"data":[
    {
        "id":"1",
        "cell_id":"1",
        "pn_id":"1",
        "inout_type":"IN",
        "change_qty":"2",
        "stock_after":"1",
        "stock_fraction":"",
        "processed_at":"2025/10/29 11:48:53.349"


    }
]
```

#### `/cell_stock_status`
```json
"success":true,
"data":[
    {
        "cell_id":"1",
        "pn_id":"1",
        "stock_qty":"2",
        "stock_after":"1",
        "stock_fraction":"",
        "processed_at":"2025/10/29 11:48:53.349"


    }
]
```

### レスポンス設計
#### エラーレスポンスのフォーマットとコード定義
- 日時フォーマット : ISO8601 UTC

- `マスタテーブル`
```json
"success":false,
"error_code":500,
"message":"Error:{errormsg}"
```


- `実績テーブル`
```json
"success":false,
"error_code":500,
"message":"Error:{errormsg}"
"your_request":{
    "from_date":"2025-10-29",
    "to_date":"2025-10-29"
}

```


## 性能・負荷要件
### 最大取得件数の上限
- ログデータのクエリ発行時の最大取得件数
  - Limit : 15000件
    - クエリパラメータで指定された範囲の実績レコード数を確認
      - 15000件を超えるようであれば、from_to の日付から 15000件までのログを返す 

- 年単位取得への対応
  - csv エクスポートを用意


## 運用・保守
### ログ監視 
リクエストのログは「loglevel = INFO」で残す 
エラーはerrorlevel