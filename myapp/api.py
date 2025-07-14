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

@api.route("/api/inout/save", methods=["POST"])
def save_inout_popup():
    data = request.get_json()
    if not data:
        return jsonify({"error": "データが格納されていません"}), 400
    cell_stock_status = data.get("cell_stock_status", {})
    inout_log = data.get("inout_log", {})
    print(cell_stock_status, inout_log)

    # 新規登録時 / 更新時 どちらも登録
    new_inout_log = InoutLog(
        cell_id=inout_log.get("cell_id"),
        pn_id=inout_log.get("pn_id"),
        inout_type=inout_log.get("inout_type"),
        change_qty=inout_log.get("change_qty"),
        stock_after=inout_log.get("stock_after"))
    db.session.add(new_inout_log)
    

    '''
    新規追加 / 既存データのストック数消す / stockが0になった場合はレコードを削除
    '''
    # 新規追加
    if  CellStockStatus.query.get(cell_stock_status.get("cell_id")) is None:
        new_cell_stock_status = CellStockStatus(
            cell_id=cell_stock_status.get("cell_id"),
            pn_id=cell_stock_status.get("pn_id"),
            stock_qty=cell_stock_status.get("stock_qty")
        )
        db.session.add(new_cell_stock_status)
    

    db.session.commit()

    

    print(data)

    # データの検証

    return jsonify({"status": "保存完了！"})


@api.route("/api/pn_ctrl/save", methods=["POST"])
def save_product_number():
    product_numbers = request.get_json()
    # product_numbers = data.get('product_no', [])
   
    '''
    データ構造 print(product_numbers)
    [{'serial_no': '001', 'product_no': '12345-67890', 'material': 'XYZB10-100', 'material_thickness': '2', 'cut_length': '850', 'id': '1'},
    {'serial_no': '002', 'product_no': '54321-09876', 'material': 'ABCZ20-200', 'material_thickness': '3', 'cut_length': '920.5', 'id': '2'},
    {'serial_no': '003', 'product_no': '98765-43210', 'material': 'LMNQ15-150', 'material_thickness': '1.5', 'cut_length': '780.3', 'id': '3'}
    '''



    for pn_item in product_numbers:
        id = pn_item.get("id")
        product_no = pn_item.get("product_no", "").strip()
        serial_no = pn_item.get("serial_no", "").strip()
        material = pn_item.get("material", "").strip()
        material_thickness = pn_item.get("material_thickness", -1.0)
        cut_length = pn_item.get("cut_length",-1.0)
        is_deleted = pn_item.get("is_deleted", False)

        # 既存レコード更新
        if id:
            update_pn = ProductNumber.query.get(id)
            if update_pn:
                if product_no != update_pn.product_no:
                    update_pn.product_no = product_no

                if serial_no != update_pn.serial_no:
                    update_pn.serial_no = serial_no

                if material != update_pn.material:
                    update_pn.material = material

                if material_thickness != update_pn.material_thickness:
                    try:
                        update_pn.material_thickness = float(
                            material_thickness)
                    except ValueError:
                        update_pn.material_thickness = -1.0

                if cut_length != update_pn.cut_length:
                    try:
                        update_pn.cut_length = float(cut_length)
                    except ValueError:
                        update_pn.cut_length = -1.0

                if is_deleted != update_pn.is_deleted:
                    update_pn.is_deleted = is_deleted

        else:  # 新規レコード(update_pn既存レコード判別に何もない場合)
            if product_no and id is None:
                new_pn = ProductNumber(product_no=product_no,
                                       serial_no=serial_no,
                                       material=material,
                                       material_thickness=material_thickness,
                                       cut_length=cut_length,
                                       is_deleted=False)
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
    print("cell_permisson:", cell_permisson)
    

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
