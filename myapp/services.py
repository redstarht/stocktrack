from flask import Blueprint, render_template, request, jsonify, redirect, url_for, session
from .model import Zone, Shelf, ProductNumber ,Cell , CellStockStatus ,AllowStorage , InoutLog
from myapp import db
from myapp import create_app


services = Blueprint('services', __name__)

class ProductNumberAPI:
    def __init__(self):
        self.app = create_app()

    # 品番取得(削除フラッグは取得しない)
    def get_product_numbers(self):
        with self.app.app_context():
            product_numbers = ProductNumber.query.filter_by(is_deleted=False).all()
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