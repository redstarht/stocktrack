from .extensions import db
from datetime import datetime, timezone, timedelta

class ProductNumber(db.Model):
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
    shelf_id = db.Column(db.Integer, db.ForeignKey('shelf.shelf_id'), nullable=False)
    is_all_pn_allowed = db.Column(db.Boolean, default=False)

class AllowStorage(db.Model):
    __tablename__ = 'allow_storage'
    cell_id = db.Column(db.Integer, db.ForeignKey('cell.cell_id'), primary_key=True,nullable=False)
    pn_id = db.Column(db.Integer, db.ForeignKey('product_number.pn_id'), primary_key=True, nullable=False)

class InoutLog(db.Model):
    __tablename__ = 'inout_log'
    cell_id = db.Column(db.Integer, db.ForeignKey('cell.cell_id'), primary_key=True, nullable=False)
    pn_id = db.Column(db.Integer, db.ForeignKey('product_number.pn_id'), primary_key=True, nullable=False)

class InoutLog(db.Model):
    __tablename__ = 'inout_log'
    cell_id = db.Column(db.Integer, db.ForeignKey('cell.cell_id'), primary_key=True, nullable=False)
    pn_id = db.Column(db.Integer, db.ForeignKey('product_number.pn_id'), primary_key=True, nullable=False)
    inout_type = db.Column(db.Boolean, default=False, nullable=False)  # True: In, False: Out
    processed_at = db.Column(db.DateTime, default=lambda: datetime.now(
        timezone(timedelta(hours=9))), nullable=False)