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


@main.route('/pn_ctrl', methods=['GET'])
def pn_ctrl():
    product_numbers = ProductNumber.query.all()
    return render_template('pn_ctrl.html', product_numbers=product_numbers)

