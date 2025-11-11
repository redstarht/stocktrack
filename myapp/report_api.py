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

from logging import getLogger
from sqlalchemy import desc, between

logger = getLogger()

v1 = Blueprint("v1", __name__, url_prefix='/api/v1')


@v1.route('/zone')
def order_zone():
    obj_zones = Zone.query.all()
    zones = [zone.to_dict() for zone in obj_zones]
    return jsonify(zones)


@v1.route('/shelf')
def order_shelf():
    obj_shelfs = Shelf.query.all()
    shelfs = [shelf.to_api_dict() for shelf in obj_shelfs]
    return jsonify(shelfs)


@v1.route('/cell')
def order_cell():
    obj_cells = Cell.query.all()
    cells = [cell.to_api_dict() for cell in obj_cells]
    return jsonify(cells)


@v1.route('/product_number')
def order_product_number():
    obj_product_numbers = ProductNumber.query.all()
    product_numbers = [pn.to_api_dict() for pn in obj_product_numbers]
    return jsonify(product_numbers)


@v1.route("/cell_stock_status")
# cell_stock_statusの値を、
# 更新時間を描画するため、今の時間を返す
def order_cell_stock_status():
    obj_cell_stock_status = CellStockStatus.query.all()
    cell_stock_statuses = [cell_stock_status.to_api_dict()
                           for cell_stock_status in obj_cell_stock_status]
    return jsonify(cell_stock_statuses)

# http://127.0.0.1:5000/api/v1/inout_log
@v1.route("/inout_log")
def order_inout_log():
    str_year = request.args.get('year')
    obj_inout_logs = None
    inout_logs = []

    str_fromdate = request.args.get('fromdate')
    str_todate = request.args.get('todate')
    fromdate = datetime.strptime(
        str_fromdate, '%Y-%m-%d') if str_fromdate else None
    todate = datetime.strptime(
        str_todate, '%Y-%m-%d') if str_todate else None
    dt_now = datetime.datetime.now()

    # InoutLog.query.order_by(desc(InoutLog.id)).limit(15000)
    if (str_year):
        start_year = datetime.datetime(int(str_year), 1, 1, 0, 0, 0, 0)
        end_year = datetime.datetime(int(str_year), 12, 31, 12, 59, 59, 999999)
        obj_inout_logs = InoutLog.query.filter(
            InoutLog.processed_at.between(start_year, end_year)).all()
        inout_logs = [inout_log.to_api_dict()
                      for inout_log in obj_inout_logs]
        return inout_logs

    elif (fromdate is None and todate is None):
        obj_inout_logs = InoutLog.query.order_by(
            desc(InoutLog.id)).limit(15000)
        inout_logs = [inout_log.to_api_dict()
                      for inout_log in obj_inout_logs]
        return inout_logs

    elif (fromdate and todate):
        obj_inout_logs = InoutLog.query.filter(
            InoutLog.processed_at.between(fromdate, todate)).limit(15000)
        inout_logs = [inout_log.to_api_dict()
                      for inout_log in obj_inout_logs]
        return inout_logs

    elif (fromdate and todate is None):
        todate = dt_now
        obj_inout_logs = InoutLog.query.filter(
            InoutLog.processed_at.between(fromdate, todate)).limit(15000)
        inout_logs = [inout_log.to_api_dict()
                      for inout_log in obj_inout_logs]
        return inout_logs

    elif (fromdate is None and todate):
        todate = dt_now
        obj_inout_logs = InoutLog.query.filter(
            InoutLog.processed_at >= fromdate).limit(15000)
        inout_logs = [inout_log.to_api_dict()
                      for inout_log in obj_inout_logs]
        return inout_logs

    else:
        raise ValueError
