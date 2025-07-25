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
        raise ValueError(
            f"Error: cell_id {data.get('cell_id')} already exists.")
    print("新規レコード追加処理起動")

# def check_delete_pn(data):


def convert_to_int_set(input_set):
    """集合内の要素を整数型に変換する関数"""
    try:
        # 各要素を整数型に変換して、新しい集合を作成
        return {int(item) for item in input_set}
    except ValueError as e:
        # 変換できない場合はエラーを表示
        print(f"型変換に失敗しました: {e}")
        return set()  # 空の集合を返す


def check_del_alwStorRec(cell_id, deletepn_ids):
    """
    cellテーブルのis_all_pn_allowedがfalseで
    cellStockStatusテーブルに現在格納されている品番を
    任意の品番の格納許可を外し、削除しようとしてしまった場合
    エラーを返す    
    """
    
    for pn_id in deletepn_ids:
        if CellStockStatus.query.filter_by(
                cell_id=cell_id,).first().pn_id == pn_id:
            print(f"Error: cell_id： {cell_id} には現在 品番ID：{pn_id} が格納されているため許可を外すことはできせん。")
            raise ValueError(
                f"Error: cell_id： {cell_id} には現在 品番ID：{pn_id} が格納されているため許可を外すことはできせん。")
        print(
            f"cell_id {cell_id} の品番ID: {pn_id} の格納許可レコードを削除")


def check_del_pn_ctrl(pn_id):
    if CellStockStatus.query.filter_by(pn_id=pn_id).first():
        message = f"Error:pn_id:{pn_id}はまだ格納されているため削除不可"
        print(message)
        raise ValueError(message)
    print(f"pn_id:{pn_id}を論理削除")



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
