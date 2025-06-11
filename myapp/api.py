from flask import Blueprint, render_template, request, jsonify, redirect,url_for,session
from .model import Zone, Shelf, ProductNumber ,Cell , CellStockStatus ,AllowStorage , InoutLog
from . import db

api = Blueprint('api', __name__)

@api.route('/api/pn_ctrl/save', methods=['POST'])
def save_product_number():
    product_numbers = request.get_json()
    # product_numbers = data.get('product_no', [])

    for pn_item in product_numbers:
        id = pn_item.get("id")
        product_no = pn_item.get("product_no","").strip()
        is_deleted = pn_item.get("is_deleted",False)
        
        
        #既存レコード更新
        if id:
            add_pn = ProductNumber.query.get(id)
            if add_pn :
                if product_no == add_pn.product_no:
                    pass
                else:
                    add_pn.product_no = product_no
                
                if is_deleted == True:
                    add_pn.is_deleted = is_deleted
                    
        else:#新規レコード
            if product_no and id is None :
                new_pn = ProductNumber(
                    product_no = product_no,
                    is_deleted = False
                ) 
                db.session.add(new_pn)
            
    db.session.commit()
    return jsonify({"status":"保存完了！"})
            
            
            
                
            
