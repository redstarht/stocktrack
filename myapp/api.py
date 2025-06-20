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

api = Blueprint("api", __name__)


@api.route("/api/pn_ctrl/save", methods=["POST"])
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
                new_pn = ProductNumber(product_no=product_no, is_deleted=False)
                db.session.add(new_pn)

    db.session.commit()
    return jsonify({"status": "保存完了！"})


@api.route("/api/cell_permission/save", methods=["POST"])
def save_cell_permisson():
    cell_permisson = request.get_json()
    cell_data = cell_permisson.get("cell")
    allow_storage = cell_permisson.get("allow_storage", [])
    cell_id = cell_data.get("id")
    is_all_pn_allowed = cell_data.get("is_all_pn_allowed")

    # --- Cellテーブルの更新 ---
    cell_obj = Cell.query.get(cell_id)
    if cell_obj and cell_obj.is_all_pn_allowed != is_all_pn_allowed:
        cell_obj.is_all_pn_allowed = is_all_pn_allowed

    # 個別許可処理
    if not is_all_pn_allowed:
        # 現在のDBにある許可品番の一覧を{}集合で取得
        existing_records = AllowStorage.query.filter_by(cell_id=cell_id).all()
        existin_pn_ids = {rec.pn_id for rec in existing_records}

        # 送信されたpn_idの一覧を取得
        posted_pn_ids = {
            item.get("pn_id") for item in allow_storage if item.get("pn_id") is not None
        }

        deletepn_ids = existin_pn_ids - posted_pn_ids
        new_pn_ids = posted_pn_ids - existin_pn_ids
            

        with db.session.no_autoflush:
            for pn_id in new_pn_ids:
                db.session.add(AllowStorage(cell_id=cell_id, pn_id=pn_id))

            if deletepn_ids:
                AllowStorage.query.filter(
                    AllowStorage.cell_id == cell_id,
                    AllowStorage.pn_id.in_(deletepn_ids)
                ).delete(synchronize_session=False)
                
                

            
        #  with db.session.no_autoflush:
        #     # 新規追加(postedにあってexist(DB)にないもの
            
        #     for pn_id in new_pn_ids:
        #         db.session.add(AllowStorage(cell_id=cell_id, pn_id=pn_id))

        #     # 削除対象(許可対象品番でなくなった場合はレコードを削除)
            
        #     if deletepn_ids:
        #         AllowStorage.query.filter(
        #         AllowStorage.cell_id == cell_id, AllowStorage.pn_id.in_(deletepn_ids)
        #         ).delete(synchronize_session=False)

        #         #  synchronize_session = false セッション内のオブジェクトは無視して同期処理を一切しない

    db.session.commit()
    return jsonify({"message": "保存完了"}), 200
