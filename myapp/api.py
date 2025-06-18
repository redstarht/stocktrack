from flask import Blueprint, render_template, request, jsonify, redirect, url_for, session
from .model import Zone, Shelf, ProductNumber, Cell, CellStockStatus, AllowStorage, InoutLog
from . import db

api = Blueprint('api', __name__)


@api.route('/api/pn_ctrl/save', methods=['POST'])
def save_product_number():
    product_numbers = request.get_json()
    # product_numbers = data.get('product_no', [])

    for pn_item in product_numbers:
        id = pn_item.get("id")
        product_no = pn_item.get("product_no", "").strip()
        is_deleted = pn_item.get("is_deleted", False)

        # 既存レコード更新
        if id:
            add_pn = ProductNumber.query.get(id)
            if add_pn:
                if product_no != add_pn.product_no:
                    add_pn.product_no = product_no

                if is_deleted != add_pn.is_deleted:
                    add_pn.is_deleted = is_deleted

        else:  # 新規レコード
            if product_no and id is None:
                new_pn = ProductNumber(
                    product_no=product_no,
                    is_deleted=False
                )
                db.session.add(new_pn)

    db.session.commit()
    return jsonify({"status": "保存完了！"})


@api.route('/api/cell_permission/save', methods=['POST'])
def save_cell_permisson():
    cell_permisson = request.get_json()
    cell_data = cell_permisson.get('cell')
    allow_storage = cell_permisson.get('allow_storage')
    cell_id = cell_data.get('id')
    is_all_pn_allowed = cell_data.get('is_all_pn_allowed')

    # 個別品番許可にチェックが入っている場合にのみ発火
    if allow_storage and is_all_pn_allowed == False:
        # セルテーブルへの書き込みチェック
        cell_obj = Cell.query.get(cell_id)
        if cell_obj.is_all_pn_allowed != is_all_pn_allowed:
            cell_obj.is_all_pn_allowed = is_all_pn_allowed
        # allowstorageテーブルの書き込みチェック
        for allow_pn in allow_storage:
            pn_id = allow_pn.get('pn_id')

        # 既存レコード更新（または削除）
            # 個別品番許可　➡　全品番許可に切り替わった際はレコードは残したまま
        
        # 新規レコード追加

    print(cell, allow_storage)
    return jsonify({"status": "保存完了！"})
