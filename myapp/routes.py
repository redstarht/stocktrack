from flask import Blueprint, render_template, request, jsonify, redirect,url_for,session
from .model import Zone, Shelf, ProductNumber ,Cell , CellStockStatus ,AllowStorage , InoutLog
from . import db

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return render_template('index.html')

@main.route('/inout_map')
def inout_map():
    return render_template('inout_map.html')


@main.route('/pn_ctrl')
def pn_ctrl():
    # ProductNumberモデルから削除フラグが立っていない品番を取得
    obj_product_numbers = ProductNumber.query.filter_by(is_deleted=False).all()
    product_numbers = [pn.to_dict() for pn in obj_product_numbers]
    return render_template('pn_ctrl.html', product_numbers=product_numbers)



