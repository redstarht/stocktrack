from flask import (
    Blueprint,
    render_template,
    request,
    jsonify,
    redirect,
    url_for,
    session,
)
from .model import (
    Zone,
    Shelf,
    ProductNumber,
    Cell,
    CellStockStatus,
    AllowStorage,
    InoutLog,
)
from . import db

def check_stock_status(data):
    """
    cell_idとpn_idの組み合わせは新規なので新規レコードで登録する処理となるが
    cell_idはすでに登録されている場合(別のpn_idが存在) はエラーを返す
    ※cell_idとpn_idの組合わせはユニークである必要がある
    例: cell_id=1, pn_id=2 が登録されている場合
    cell_id=1, pn_id=3 を登録しようとするとエラーとなる
    """
    if CellStockStatus.query.filter_by(
        cell_id=data.get("cell_id"),
    ).first() is not None:
        raise ValueError(f"Error: cell_id {data.get('cell_id')} already exists.")
    print("新規レコード追加処理起動")

# def check_delete_pn(data):


def check_del_alwStorRec(cell_id,data):
    """
    cellテーブルのis_all_pn_allowedがfalseで
    cellStockStatusテーブルに現在格納されている品番を
    任意の品番の格納許可を外し、削除しようとしてしまった場合
    エラーを返す    
    """
    if CellStockStatus.query.filter_by(
        cell_id=cell_id,).first().pn_id == data.get("pn_id"):
        raise ValueError(f"Error: cell_id {cell_id} には現在 {data.get('pn_id')} が格納されているため許可を外すことはできせん。")
    print(f"cell_id {cell_id} の品番 {data.get('pn_id')} の格納許可を{data.get('is_all_pn_allowed')}に変更")



# def check_allow_storage(data):
#     """
#     cellテーブルのis_all_pn_allowedがfalseだが
#     allow_storageテーブルに該当するcell_idが存在しない場合はエラーを返す
#     """
#     if AllowStorage.query.filter_by(
#         cell_id=data.get("cell_id"),
#         pn_id=data.get("pn_id"),
#     ).first() is not None:
#         raise ValueError(f"Error: cell_id {data.get('cell_id')} and pn_id {data.get('pn_id')} already exists.")
#     print("新規レコード追加処理起動")