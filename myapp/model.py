from .extensions import db
from datetime import datetime, timezone, timedelta


class Zone(db.Model):
    __tablename__ = 'zone'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)


class Shelf(db.Model):
    __tablename__ = 'shelf'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    zone_id = db.Column(db.Integer, db.ForeignKey('zone.id'), nullable=False)
    shelf_sort = db.Column(db.Integer, nullable=False , default=999)
    zone = db.relationship('Zone', backref="product_numbers",
                           lazy=True)  # zone.product_numbers


class ProductNumber(db.Model):
    __tablename__ = 'product_number'
    id = db.Column(db.Integer, primary_key=True)
    product_no = db.Column(db.String(50), unique=True, nullable=False)
    is_deleted = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(
        timezone(timedelta(hours=9))))
    updated_at = db.Column(
        db.DateTime, default=lambda: datetime.now(
            timezone(timedelta(hours=9))),
        onupdate=lambda: datetime.now(timezone(timedelta(hours=9))))


class Cell(db.Model):
    __tablename__ = 'cell'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    shelf_id = db.Column(db.Integer, db.ForeignKey('shelf.id'), nullable=False)
    max_qty =db.Column(db.Integer ,default=6,nullable=False)
    is_all_pn_allowed = db.Column(db.Boolean, default=False)
    # cell.shelf.name \ shelf.cells
    shelf = db.relationship('Shelf', backref="cells", lazy=True)
    


class AllowStorage(db.Model):
    __tablename__ = 'allow_storage'
    cell_id = db.Column(db.Integer, db.ForeignKey(
        'cell.id'), primary_key=True, nullable=False)
    pn_id = db.Column(db.Integer, db.ForeignKey(
        'product_number.id'), primary_key=True, nullable=False)
    cell = db.relationship('Cell', backref="allow_storage",
                           lazy=True)  # cell.allow_storage
    # product_no.allow_storage
    product_no = db.relationship(
        'product_number', backref="allow_storage", lazy=True)
    


class CellStockStatus(db.Model):
    __tablename__ = 'cell_stock_status'
    cell_id = db.Column(db.Integer, db.ForeignKey(
        'cell.id'), primary_key=True, nullable=False)
    pn_id = db.Column(db.Integer, db.ForeignKey(
        'product_number.id'), primary_key=True, nullable=False)
    stock_qty = db.Column(db.Integer, default=1, nullable=False)
    cell = db.relationship('Cell', backref="cell_stock_status",
                           lazy=True)  # cell.cell_stock_status
    product_no = db.relationship(
        'product_number', backref="cell_stock_status", lazy=True)  # product_no.cell_stock_status


class InoutLog(db.Model):
    __tablename__ = 'inout_log'
    id = db.Column(db.Integer, primary_key=True)
    cell_id = db.Column(db.Integer, db.ForeignKey(
        'cell.id'), nullable=False)
    pn_id = db.Column(db.Integer, db.ForeignKey(
        'product_number.id'), nullable=False)
    inout_type = db.Column(db.String(10), default="In",
                           nullable=False)  # IN / OUT 
    processed_at = db.Column(db.DateTime, default=lambda: datetime.now(
        timezone(timedelta(hours=9))), nullable=False)
    cell = db.relationship('Cell', backref="inout_log",
                           lazy=True)  # cell.inout_log
    product_no = db.relationship(
        'product_number', backref="inout_log", lazy=True)  # product_no.inout_log
