from flask import Blueprint, render_template, request, jsonify, redirect, url_for, session
from .model import Zone, Shelf, ProductNumber, Cell, CellStockStatus, AllowStorage, InoutLog
from myapp import db
import datetime,pytz

services = Blueprint('services', __name__)


class ProductNumberAPI:
    def __init__(self):
        from myapp import create_app
        self.app = create_app()

    # 品番取得(削除フラッグは取得しない)
    def get_product_numbers(self):
        with self.app.app_context():
            product_numbers = ProductNumber.query.filter_by(
                is_deleted=False).all()
            return [pn.to_dict() for pn in product_numbers]

    # 品番取得(削除フラッグも取得する)
    def get_all_product_numbers(self):
        with self.app.app_context():
            product_numbers = ProductNumber.query.all()
            if not product_numbers:
                return jsonify({'message': 'No product numbers found'}), 404

            return [pn.to_dict() for pn in product_numbers]

    # 品番IDで取得
    def add_product_number(self, data):
        with self.app.app_context():
            for add_data in data:
                new_pn = ProductNumber(
                    product_no=add_data['product_no'],
                    name=add_data['name']
                )
                db.session.add(new_pn)

            db.session.commit()
            return jsonify({'message': 'Product numbers added successfully'}), 201

    # レコードの完全削除
    def delete_product_number(self, id):
        with self.app.app_context():
            product_number = ProductNumber.query.get(id)
            if not product_number:
                return jsonify({'message': 'Product number not found'}), 404

            db.session.delete(product_number)
            db.session.commit()
            return jsonify({'message': 'Product number deleted successfully'}), 200

    # 削除フラグを立てる
    def is_deleted(self, id):
        with self.app.app_context():
            product_number = ProductNumber.query.get(id)
            if not product_number:
                return jsonify({'message': 'Product number not found'}), 404
            product_number.is_deleted = True
            db.session.commit()
            return jsonify({'message': 'Product number created delete_flag = 1 successfully'}), 200


def shelfs_with_class(shelfs):

    column_class = {
        # "cell-grid"はデフォルト値
        1: "cell-grid column1",
        4: "cell-grid column4",
    }

    row_class = {
        # "cell-stock-btn"はデフォルト値
        4: "cell-stock-btn row4",
        5: "cell-stock-btn row5"
    }

    shelfs_with_class = [
        {**shelf,
         "column_class": column_class.get(shelf["column"], "cell-grid"),
         "row_class": row_class.get(shelf["row"], "cell-stock-btn")}
        for shelf in shelfs
    ]

    return shelfs_with_class


def reload_cell_stock_status():
    # 更新データの再取得
    obj_cell_stock_status = CellStockStatus.query.all()
    cell_stock_statuses = [cell_stock_status.to_dict()
                           for cell_stock_status in obj_cell_stock_status]
    timestamp = datetime.datetime.now(pytz.timezone('Asia/Tokyo'))
    formatted_time = timestamp.strftime('%Y/%m/%d %H:%M:%S')

    response_data = {
        "time_stamp": formatted_time,
        "cell_stock_statuses": cell_stock_statuses
    }
    return response_data