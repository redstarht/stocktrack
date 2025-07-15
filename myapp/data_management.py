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
    """
    if CellStockStatus.query.filter_by(
        cell_id=data.get("cell_id"),
    ).first() is not None:
        raise ValueError(f"Error: cell_id {data.get('cell_id')} already exists.")
    print("新規レコード追加処理起動")

