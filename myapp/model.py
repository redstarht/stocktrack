from .extensions import db
from datetime import datetime, timezone, timedelta

class ProductNumber(db.Model):
    __tablename__ = 'product_number'
    id = db.Column(db.Integer, primary_key=True)
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
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)


class Cell(db.Model):
    __tablename__ = 'cell'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    shelf_id = db.Column(db.Integer, db.ForeignKey('shelf.id'), nullable=False)
    is_all_pn_allowed = db.Column(db.Boolean, default=False)
    Shelf = db.relationship('Shelf', backref="cells" lazy=True)  # cell.shelf.name \ shelf.cells
   

class AllowStorage(db.Model):
    __tablename__ = 'allow_storage'
    cell_id = db.Column(db.Integer, db.ForeignKey('cell.id'), primary_key=True,nullable=False)
    pn_id = db.Column(db.Integer, db.ForeignKey('product_number.id'), primary_key=True, nullable=False)
    cell = db.relationship('Cell', backref="allow_storage", lazy=True)  # cell.allow_storage
    product_number = db.relationship('ProductNumber', backref="allow_storage", lazy=True)  # product_number.allow_storage


class InoutLog(db.Model):
    __tablename__ = 'inout_log'
    id = db.Column(db.Integer, primary_key=True)
    cell_id = db.Column(db.Integer, db.ForeignKey('cell.id'), primary_key=True, nullable=False)
    pn_id = db.Column(db.Integer, db.ForeignKey('product_number.id'), primary_key=True, nullable=False)
    inout_type = db.Column(db.String(10), default=False, nullable=False)  # True: In, False: Out
    processed_at = db.Column(db.DateTime, default=lambda: datetime.now(
        timezone(timedelta(hours=9))), nullable=False)
    cell = db.relationship('Cell', backref="inout_log", lazy=True)  # cell.inout_log
    product_number = db.relationship('ProductNUmber',backref="inout_log",lazy=True)  # product_number.inout_log