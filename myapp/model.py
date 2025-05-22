from .extension import db
from datetime import datetime, timezone, timedelta

class Product_number(db.Model):
    __tablename__ = 'product_number'
    pn_id = db.Column(db.Integer, primary_key=True)
    product_number = db.Column(db.String(50), unique=True, nullable=False)
    is_deleted = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(
        timezone(timedelta(hours=9))))
    updated_at = db.Column(
        db.DateTime, default=lambda: datetime.now(
            timezone(timedelta(hours=9))),
        onupdate=lambda: datetime.now(timezone(timedelta(hours=9))))

class Shelf(db.Model):
    __tablename__ = 'shelf'
    shelf_id = db.Column(db.Integer, primary_key=True)
    shelf_name = db.Column(db.String(50), unique=True, nullable=False)


class Cell(db.Model):
    __tablename__ = 'cell'
    cell_id = db.Column(db.Integer, primary_key=True)
    cell_name = db.Column(db.String(50), unique=True, nullable=False)
    shelf_id = db.Column(db.Integer, db.ForeignKey('shelf.shelf_id'))
    is_all_pn_allowed = db.Column(db.Boolean, default=False)

class Allow_storage(db.Model):
    __tablename__ = 'allow_storage'
    cell_id = db.Column(db.Integer, db.ForeignKey('cell.cell_id'))
    pn_id = db.Column(db.Integer, db.ForeignKey('product_number.pn_id'))

class Inout_log(db.Model):
    __tablename__ = 'inout_log'
    Cell_id = db.Column(db.Integer, db.ForeignKey('cell.cell_id'))
    pn_id = db.Column(db.Integer, db.ForeignKey('product_number.pn_id'))
    inout_type = db.Column(db.boolean, default=False)  # True: In, False: Out
    processed_at = db.Column(db.DateTime, default=lambda: datetime.now(
        timezone(timedelta(hours=9))))