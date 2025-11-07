from .extensions import db
from datetime import datetime, timezone, timedelta


# class ZoneGroup(db.Model):
#     __tablename__ = 'zone_group'
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(50), unique=True, nullable=False)
#     zone_sort = db.Column(db.Integer, nullable=False , default=999)
#     zones = db.relationship('Zone', backref="zone_group", lazy=True)  # zone_group.zones

#     def to_dict(self):
#         return {
#             'id': self.id,
#             'name': self.name,
#             'zone_sort': self.zone_sort
#         }

class Zone(db.Model):
    __tablename__ = 'zone'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    is_deleted = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(
        timezone(timedelta(hours=9))))
    updated_at = db.Column(
        db.DateTime, default=lambda: datetime.now(
            timezone(timedelta(hours=9))),
        onupdate=lambda: datetime.now(timezone(timedelta(hours=9))))
    # group_id = db.Column(db.Integer, db.ForeignKey('zone_group.id'), nullable=False)
    # group = db.relationship('ZoneGroup', backref="zones", lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            # 'group_id': self.group_id
        }


class Shelf(db.Model):
    __tablename__ = 'shelf'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False, default="")
    zone_id = db.Column(db.Integer, db.ForeignKey('zone.id'), nullable=False)
    shelf_sort = db.Column(db.Integer, nullable=False, default=999)
    zone = db.relationship('Zone', backref="product_numbers",
                           lazy=True)
    column = db.Column(db.Integer, nullable=False, default=2)
    row = db.Column(db.Integer, nullable=False, default=4)
    is_deleted = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(
        timezone(timedelta(hours=9))))
    updated_at = db.Column(
        db.DateTime, default=lambda: datetime.now(
            timezone(timedelta(hours=9))),
        onupdate=lambda: datetime.now(timezone(timedelta(hours=9))))
    # zone.product_numbers
    # ※lazy=True means that the related objects are loaded only when accessed

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'zone_id': self.zone_id,
            'shelf_sort': self.shelf_sort,
            'column': self.column,
            'row': self.row
        }


class ProductNumber(db.Model):
    __tablename__ = 'product_number'
    id = db.Column(db.Integer, primary_key=True)
    product_no = db.Column(db.String(50), nullable=False, default="")
    name = db.Column(db.String(100), nullable=False, default="")
    serial_no = db.Column(db.String(20), default="", nullable=False)
    material = db.Column(db.String(20), default="", nullable=False)
    outer_diam = db.Column(db.Float, default=-1.0, nullable=False)
    material_thickness = db.Column(db.Float, default=-1.0, nullable=False)
    cut_length = db.Column(db.Float, default=-1.0, nullable=False)
    long_length = db.Column(db.Float, default=-1.0, nullable=False)
    is_deleted = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(
        timezone(timedelta(hours=9))))
    updated_at = db.Column(
        db.DateTime, default=lambda: datetime.now(
            timezone(timedelta(hours=9))),
        onupdate=lambda: datetime.now(timezone(timedelta(hours=9))))

    def to_dict(self):
        return {
            'id': self.id,
            'product_no': self.product_no,
            'name': self.name,
            'serial_no': self.serial_no,
            'material': self.material,
            'outer_diam': self.outer_diam,
            'material_thickness': self.material_thickness,
            'cut_length': self.cut_length,
            'long_length': self.long_length,
            'is_deleted': self.is_deleted,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }


class Cell(db.Model):
    __tablename__ = 'cell'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    shelf_id = db.Column(db.Integer, db.ForeignKey('shelf.id'), nullable=False)
    max_qty = db.Column(db.Integer, default=3, nullable=False)
    is_all_pn_allowed = db.Column(db.Boolean, default=False)
    # cell.shelf.name \ shelf.cells
    shelf = db.relationship('Shelf', backref="cells", lazy=True)
    is_deleted = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(
        timezone(timedelta(hours=9))))
    updated_at = db.Column(
        db.DateTime, default=lambda: datetime.now(
            timezone(timedelta(hours=9))),
        onupdate=lambda: datetime.now(timezone(timedelta(hours=9))))

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'shelf_id': self.shelf_id,
            'max_qty': self.max_qty,
            'is_all_pn_allowed': self.is_all_pn_allowed
        }


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
        'ProductNumber', backref="allow_storage", lazy=True)

    def to_dict(self):
        return {
            'cell_id': self.cell_id,
            'pn_id': self.pn_id
        }


class CellStockStatus(db.Model):
    __tablename__ = 'cell_stock_status'
    cell_id = db.Column(db.Integer, db.ForeignKey(
        'cell.id'), primary_key=True, nullable=False)
    pn_id = db.Column(db.Integer, db.ForeignKey(
        'product_number.id'), primary_key=True, nullable=False)
    stock_qty = db.Column(db.Integer, default=1, nullable=False)
    stock_fraction = db.Column(db.Integer, default=None)
    processed_at = db.Column(db.DateTime, default=lambda: datetime.now(
        timezone(timedelta(hours=9))), nullable=False)
    cell = db.relationship('Cell', backref="cell_stock_status",
                           lazy=True)  # cell.cell_stock_status
    product_no = db.relationship(
        # product_no.cell_stock_status
        'ProductNumber', backref="cell_stock_status", lazy=True)

    def to_dict(self):
        return {
            'cell_id': self.cell_id,
            'pn_id': self.pn_id,
            'stock_qty': self.stock_qty,
            'stock_fraction': self.stock_fraction
        }


class InoutLog(db.Model):
    __tablename__ = 'inout_log'
    id = db.Column(db.Integer, primary_key=True)
    cell_id = db.Column(db.Integer, db.ForeignKey(
        'cell.id'), nullable=False)
    pn_id = db.Column(db.Integer, db.ForeignKey(
        'product_number.id'), nullable=False)
    inout_type = db.Column(db.String(10), default="In",
                           nullable=False)  # IN / OUT
    change_qty = db.Column(db.Integer, nullable=False)
    stock_after = db.Column(db.Integer, nullable=False)
    stock_fraction = db.Column(db.Integer, default=None)
    processed_at = db.Column(db.DateTime, default=lambda: datetime.now(
        timezone(timedelta(hours=9))), nullable=False)
    cell = db.relationship('Cell', backref="inout_log",
                           lazy=True)  # cell.inout_log
    product_no = db.relationship(
        'ProductNumber', backref="inout_log", lazy=True)  # product_no.inout_log

    def to_dict(self):
        return {
            'id': self.id,
            'cell_id': self.cell_id,
            'pn_id': self.pn_id,
            'inout_type': self.inout_type,
            'change_qty': self.change_qty,
            'stock_after': self.stock_after,
            'processed_at': self.processed_at.strftime('%Y-%m-%d %H:%M:%S')
        }
