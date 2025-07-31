from flask import Blueprint, render_template, request, jsonify, redirect, url_for, session
from .model import Zone, Shelf, ProductNumber, Cell, CellStockStatus, AllowStorage, InoutLog
from . import db
from .services import shelfs_with_class

main = Blueprint('main', __name__)


@main.route('/')
def index():
    return render_template('index.html')


@main.route('/old_inout_map')
def old_inout_map():
    return render_template('old_inout_map.html')


@main.route('/pn_ctrl')
def pn_ctrl():
    # ProductNumberモデルから削除フラグが立っていない品番を取得
    obj_product_numbers = ProductNumber.query.filter_by(is_deleted=False).all()
    product_numbers = [pn.to_dict() for pn in obj_product_numbers]

    obj_cell_stock_status = CellStockStatus.query.all()
    cell_stock_statuses = [cell_stock_status.to_dict()
                           for cell_stock_status in obj_cell_stock_status]

    return render_template('pn_ctrl.html', product_numbers=product_numbers, cell_stock_statuses=cell_stock_statuses)


@main.route('/allow_storage_map')
def allow_storage_map():
    obj_zones = Zone.query.all()
    zones = [zone.to_dict() for zone in obj_zones]

    obj_shelfs = Shelf.query.all()
    raw_shelfs = [shelf.to_dict() for shelf in obj_shelfs]
    shelfs = shelfs_with_class(raw_shelfs)
    obj_product_numbers = ProductNumber.query.filter_by(is_deleted=False).all()
    product_numbers = [pn.to_dict() for pn in obj_product_numbers]

    obj_cells = Cell.query.all()
    cells = [cell.to_dict() for cell in obj_cells]
    return render_template('allow_storage_map.html', zones=zones, shelfs=shelfs, cells=cells, product_numbers=product_numbers)


@main.route('/cell_permission')
def cell_permission():
    cell_id = request.args.get('cell_id')
    obj_cell = Cell.query.filter_by(id=cell_id).all()
    cell = [elm_cell.to_dict() for elm_cell in obj_cell]
    obj_allow_storage = AllowStorage.query.filter_by(cell_id=cell_id).all()
    allow_storage = [allow_pn.to_dict() for allow_pn in obj_allow_storage]

    excluded_pn_ids = [allow.pn_id for allow in obj_allow_storage]

    # ProductNumberモデルから「削除フラグが立っていない」かつ「AllowStorageで取得した品番」以外の品番を取得
    obj_product_numbers = ProductNumber.query.filter_by(is_deleted=False).all()
    product_numbers = [pn.to_dict() for pn in obj_product_numbers]
    return render_template('cell_permission.html', cell=cell, product_numbers=product_numbers, allow_storage=allow_storage, excluded_pn_ids=excluded_pn_ids)


# @main.route('/inout_map')
# def inout_map():
#     obj_zones = Zone.query.all()
#     zones = [zone.to_dict() for zone in obj_zones]

#     obj_shelfs = Shelf.query.all()
#     raw_shelfs = [shelf.to_dict() for shelf in obj_shelfs]
#     shelfs = shelfs_with_class(raw_shelfs)
#     obj_product_numbers = ProductNumber.query.filter_by(is_deleted=False).all()
#     product_numbers = [pn.to_dict() for pn in obj_product_numbers]

#     obj_cells = Cell.query.all()
#     cells = [cell.to_dict() for cell in obj_cells]

#     obj_allow_storage = AllowStorage.query.all()
#     allow_storage = [allow_pn.to_dict() for allow_pn in obj_allow_storage]

#     obj_cell_stock_status = CellStockStatus.query.all()
#     cell_stock_statuses = [cell_stock_status.to_dict()
#                            for cell_stock_status in obj_cell_stock_status]

#     return render_template('inout_map.html', zones=zones, shelfs=shelfs, cells=cells, product_numbers=product_numbers,allow_storage=allow_storage, cell_stock_statuses=cell_stock_statuses)

@main.route('/inout_map')
def inout_map():
    obj_zones = Zone.query.all()
    zones = [zone.to_dict() for zone in obj_zones]

    obj_shelfs = Shelf.query.all()
    raw_shelfs = [shelf.to_dict() for shelf in obj_shelfs]
    shelfs = shelfs_with_class(raw_shelfs)
    obj_product_numbers = ProductNumber.query.filter_by(is_deleted=False).all()
    product_numbers = [pn.to_dict() for pn in obj_product_numbers]

    obj_cells = Cell.query.all()
    cells = [cell.to_dict() for cell in obj_cells]

    obj_allow_storage = AllowStorage.query.all()
    allow_storage = [allow_pn.to_dict() for allow_pn in obj_allow_storage]

    obj_cell_stock_status = CellStockStatus.query.all()
    cell_stock_statuses = [cell_stock_status.to_dict()
                           for cell_stock_status in obj_cell_stock_status]

    return render_template('inout_map.html', zones=zones, shelfs=shelfs, cells=cells, product_numbers=product_numbers, allow_storage=allow_storage, cell_stock_statuses=cell_stock_statuses)



@main.route('/view_map')
def view_map():
    obj_zones = Zone.query.all()
    zones = [zone.to_dict() for zone in obj_zones]

    obj_shelfs = Shelf.query.all()
    raw_shelfs = [shelf.to_dict() for shelf in obj_shelfs]
    shelfs = shelfs_with_class(raw_shelfs)
    obj_product_numbers = ProductNumber.query.filter_by(is_deleted=False).all()
    product_numbers = [pn.to_dict() for pn in obj_product_numbers]

    obj_cells = Cell.query.all()
    cells = [cell.to_dict() for cell in obj_cells]


    return render_template('view_map.html', zones=zones, shelfs=shelfs, cells=cells, product_numbers=product_numbers)
