from flask import (
    Blueprint,
    request,
    jsonify,
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
import datetime
import pytz
from .data_management import check_del_pn_ctrl, check_stock_status, convert_to_int_set, check_del_alwStorRec, convert_float_value
from logging import getLogger
from sqlalchemy import desc,between
from .services import reload_cell_stock_status

logger = getLogger()

api = Blueprint("api", __name__)


@api.route("/api/inout/save", methods=["POST"])
def save_inout_popup():
    try:
        data = request.get_json()
        if not data:
            logger.error({"error": "データが格納されていません"})
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

        なおかつ新規追加時にcell_idが一致しているレコードが１つでもあったら
        新規レコードとして追加せずにエラーで返す➡「すでにそのセルには品番が格納されています」


        '''
        # 新規追加
        if not CellStockStatus.query.filter_by(
            cell_id=cell_stock_status.get("cell_id"),
            pn_id=cell_stock_status.get("pn_id")
        ).all():

            # 新規レコードに該当するかチェック
            check_stock_status(cell_stock_status)

            new_cell_stock_status = CellStockStatus(
                cell_id=cell_stock_status.get("cell_id"),
                pn_id=cell_stock_status.get("pn_id"),
                stock_qty=cell_stock_status.get("stock_qty")
            )
            db.session.add(new_cell_stock_status)

        # 削除処理(セル格納数が0になった場合はレコードを削除)
        elif cell_stock_status.get("stock_qty") == 0:
            delete_cell_stock_status = CellStockStatus.query.filter_by(
                cell_id=cell_stock_status.get("cell_id"),
                pn_id=cell_stock_status.get("pn_id")
            ).first()
            if delete_cell_stock_status:
                db.session.delete(delete_cell_stock_status)
                logger.info("削除処理実行")

        # 更新処理
        else:
            update_cell_stock_status = CellStockStatus.query.filter_by(
                cell_id=cell_stock_status.get("cell_id"),
                pn_id=cell_stock_status.get("pn_id")
            ).first()
            if update_cell_stock_status:
                update_cell_stock_status.stock_qty = cell_stock_status.get(
                    "stock_qty")
                logger.info("更新処理実行")

        db.session.commit()

        # 更新データの再取得
        response_data = reload_cell_stock_status()
        # obj_cell_stock_status = CellStockStatus.query.all()
        # cell_stock_statuses = [cell_stock_status.to_dict()
        #                        for cell_stock_status in obj_cell_stock_status]
        # timestamp = datetime.datetime.now(pytz.timezone('Asia/Tokyo'))
        # formatted_time = timestamp.strftime('%Y/%m/%d %H:%M:%S')

        # response_data = {
        #     "time_stamp": formatted_time,
        #     "cell_stock_statuses": cell_stock_statuses
        # }

        return jsonify(response_data), 200
    except Exception as e:
        # エラー時も最新情報をフロント側へ描画させる
        db.session.rollback()
        response_data = reload_cell_stock_status()
        response_data["error"] = str(e)
        return jsonify(response_data), 500


@api.route("/api/pn_ctrl/save", methods=["POST"])
def save_product_number():
    product_numbers = request.get_json()
    # product_numbers = data.get('product_no', [])

    '''

    [{'serial_no': '001', 'product_no': '12345-67890', 'material': 'XYZB10-100', 'material_thickness': '2', 'cut_length': '850', 'id': '1'},
    {'serial_no': '002', 'product_no': '54321-09876', 'material': 'ABCZ20-200',
        'material_thickness': '3', 'cut_length': '920.5', 'id': '2'},
    {'serial_no': '003', 'product_no': '98765-43210', 'material': 'LMNQ15-150',
        'material_thickness': '1.5', 'cut_length': '780.3', 'id': '3'}
    '''
    try:
        for pn_item in product_numbers:
            id = pn_item.get("id")
            product_no = pn_item.get("product_no", "").strip()
            serial_no = pn_item.get("serial_no", "").strip()
            material = pn_item.get("material", "").strip()
            material_thickness = convert_float_value(
                pn_item.get("material_thickness", "").strip())
            outer_diam = convert_float_value(
                pn_item.get("outer_diam", "").strip())
            long_length = convert_float_value(
                pn_item.get("long_length", "").strip())
            cut_length = convert_float_value(
                pn_item.get("cut_length", "").strip())

            # 空文字と文字列の変換

            is_deleted = pn_item.get("is_deleted", False)
            if is_deleted == "true":
                is_deleted = True
                # 論理削除する品番が格納されていないか
                check_del_pn_ctrl(id)
            elif is_deleted == "false":
                is_deleted = False
            else:
                is_deleted = False

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
                        update_pn.material_thickness = material_thickness

                    if cut_length != update_pn.cut_length:
                        update_pn.cut_length = cut_length

                    if outer_diam != update_pn.outer_diam:
                        update_pn.outer_diam = outer_diam

                    if long_length != update_pn.long_length:
                        update_pn.long_length = long_length

                    if is_deleted != update_pn.is_deleted:
                        update_pn.is_deleted = is_deleted

            else:  # 新規レコード(update_pn既存レコード判別に何もない場合)
                if serial_no and product_no and id is None:
                    new_pn = ProductNumber(product_no=product_no,
                                           serial_no=serial_no,
                                           material=material,
                                           material_thickness=material_thickness,
                                           outer_diam=outer_diam,
                                           long_length=long_length,
                                           cut_length=cut_length,
                                           is_deleted=False)
                    db.session.add(new_pn)
                else:
                    error_msg = "追加した品番 または 背番号が空です!"
                    logger.error(error_msg)
                    db.session.rollback()
                    return jsonify({"error": error_msg}), 400

        db.session.commit()
        return jsonify({"status": "保存完了！"})
    except ValueError as e:
        db.session.rollback()
        logger.error({"error": str(e)})
        return jsonify({"error": str(e)}), 400


@api.route("/api/cell_permission/save", methods=["POST"])
def save_cell_permisson():
    try:
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
            existing_records = AllowStorage.query.filter_by(
                cell_id=cell_id).all()
            existin_pn_ids = {rec.pn_id for rec in existing_records}

            # 送信されたpn_idの一覧を取得
            posted_pn_ids = {
                item.get("pn_id") for item in allow_storage if item.get("pn_id") is not None
            }

            '''
            新規追加するpn_idと削除するpn_idを計算
            既存のpn_idと送信されたpn_idの差分を計算
            既存のpn_idから送信されたpn_idを引いたものが削除対象
            送信されたpn_idから既存のpn_idを引いたものが新規追加対象
            {}※集合は一意の値のみ保持のため利用
            例: existin_pn_ids = {1, 2, 3}, posted_pn_ids = {2, 3, 4}
            deletepn_ids = {1}, new_pn_ids = {4}
            '''
            deletepn_ids = convert_to_int_set(
                existin_pn_ids) - convert_to_int_set(posted_pn_ids)

            # 許可を取り外す品番がまだセルに格納されていないか確認
            check_del_alwStorRec(cell_id, deletepn_ids)

            new_pn_ids = convert_to_int_set(
                posted_pn_ids) - convert_to_int_set(existin_pn_ids)
            print(
                f"deletepn_ids:{deletepn_ids}\nexsisin_pnids:{existin_pn_ids}\nposted_pd_ids:{posted_pn_ids}\nnew_pn_ids:{new_pn_ids}")

            with db.session.no_autoflush:
                for pn_id in new_pn_ids:
                    db.session.add(AllowStorage(cell_id=cell_id, pn_id=pn_id))

                # 削除対象(許可対象品番でなくなった場合はレコードを削除)
                if deletepn_ids:
                    AllowStorage.query.filter(
                        AllowStorage.cell_id == cell_id,
                        AllowStorage.pn_id.in_(deletepn_ids)
                    ).delete(synchronize_session=False)
                    #  synchronize_session = false セッション内のオブジェクトは無視して同期処理を一切しない

        db.session.commit()
        return jsonify({"message": "保存完了"}), 200
    except ValueError as e:
        db.session.rollback()
        logger.error({"error": str(e)})
        return jsonify({"error": str(e)}), 400


@api.route("/api/render_cell_status")
# cell_stock_statusの値を、
# 更新時間を描画するため、今の時間を返す
def order_cell_status():
    obj_cell_stock_status = CellStockStatus.query.all()
    cell_stock_statuses = [cell_stock_status.to_dict()
                           for cell_stock_status in obj_cell_stock_status]
    timestamp = datetime.datetime.now(pytz.timezone('Asia/Tokyo'))
    formatted_time = timestamp.strftime('%Y/%m/%d %H:%M:%S')

    response_data = {
        "time_stamp": formatted_time,
        "cell_stock_statuses": cell_stock_statuses
    }

    return jsonify(response_data)


@api.route("/api/new_inout_log", methods=["POST"])
def order_new_inout_log():
    # Note：tostifyに最新のログ通知を出すためのAPI
    # newdata:true なら 前回取得時から変化有としてtostifyがトースト通知を出す
    # logged_atから 最新10件を抽出しておく
    # 最新10件に対して前回データ(10件)よりも差異があれば
    # そのオブジェクトに newdata:trueとしてデータを返す
    # JSで当エンドポイントを周期的に見に行く

    now_logs = InoutLog.query.order_by(desc(InoutLog.id)).limit(10)
    dict_now_logs = []

    prev_logs = request.get_json()

    if (not prev_logs):
        for nowlog in now_logs:
            log_dict = nowlog.to_dict()
            log_dict['new_data'] = False
            dict_now_logs.append(log_dict)
    else:
        prev_logs_ids = set(log['id'] for log in prev_logs)
        for nowlog in now_logs:
            log_dict = nowlog.to_dict()
            if (log_dict['id'] in prev_logs_ids):
                log_dict['new_data'] = False
            else:
                log_dict['new_data'] = True
            dict_now_logs.append(log_dict)

    # new_log = None
    return jsonify(dict_now_logs)


@api.route("/api/prod_num")
# cell_stock_statusの値を、
def order_prod_num():
    obj_product_numbers = ProductNumber.query.filter_by(
        is_deleted=False).order_by((ProductNumber.serial_no)).all()
    product_numbers = [pn.to_dict() for pn in obj_product_numbers]

    return jsonify(product_numbers)

