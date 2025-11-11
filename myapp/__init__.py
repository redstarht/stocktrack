from flask import Flask
from .extensions import db, migrate,BuildDir
from .routes import main
from .model import (
    Zone,
    Shelf,
    ProductNumber,
    Cell,
    CellStockStatus,
    AllowStorage,
    InoutLog,
)


from .backup import backup_sqlite, backup_scheduler
import schedule
import pandas
import os
import sys
import threading
import time
from .logging_setup import setup_logging
from logging import getLogger


build_dir = BuildDir()
base_dir = build_dir.base_dir
parent_dir = build_dir.parent_dir
backup_dir = build_dir.backup_dir
seed_dir = build_dir.seed_dir
shelfCsv_dir = build_dir.shelfCsv_dir
zoneCsv_dir = build_dir.zoneCsv_dir
cellCsv_dir = build_dir.cellCsv_dir
prodCsv_dir = build_dir.prodCsv_dir


# DBディレクトリの確認
instance_dir = os.path.join(parent_dir, 'instance')
if not os.path.exists(instance_dir):
    os.makedirs(instance_dir)  # フォルダを作成
db_path = os.path.join(parent_dir, 'instance', 'myapp.db')


def create_app():
    app = Flask(__name__, template_folder=os.path.join(base_dir, 'templates'),static_folder=os.path.join(base_dir,'static'))
    app.config.from_mapping(
        SQLALCHEMY_DATABASE_URI=f'sqlite:///{db_path}',
        SQLALCHEMY_TRACK_MODIFICATIONS=False,
    )

    db.init_app(app)
    migrate.init_app(app, db)

    setup_logging()

    # .dbファイルが存在しない場合は作成し初期データを格納
    if not os.path.exists(db_path):
        print(os.path.exists(db_path))
        with app.app_context():
            db.create_all()
            initialize_db()

    # バックアップ機能を別スレッドで起動(毎日0:30にバックアップ処理)
    backup_thread = threading.Thread(
        target=backup_scheduler, args=(db_path, backup_dir), daemon=True)
    backup_thread.start()

    # blueprintを登録
    from myapp.routes import main
    from myapp.services import services
    from myapp.api import api
    from myapp.report_api import v1
    app.register_blueprint(services)
    app.register_blueprint(main)
    app.register_blueprint(api)
    app.register_blueprint(v1)
    return app


def initialize_db():
    '''
    初期データの追加
    Zone / shelf / cell  
    '''
    print("初期データの追加をします")
    logger = getLogger()
    try:
        # zoneテーブルへの挿入
        seed_zone = pandas.read_csv(zoneCsv_dir)
        zone_instances = []
        for _, rec in seed_zone.iterrows():
            zone_instance = Zone(id=rec["id"],
                                 name=rec["name"]
                                 )
            zone_instances.append(zone_instance)
        db.session.bulk_save_objects(zone_instances)

        # shelfテーブルへの挿入
        seed_shelf = pandas.read_csv(shelfCsv_dir)
        shelf_instances = []
        for _, rec in seed_shelf.iterrows():
            shelf_instance = Shelf(
                id=rec["id"],
                name=rec["name"],
                zone_id=rec["zone_id"],
                shelf_sort=rec["shelf_sort"],
                column=rec["column"],
                row=rec["row"]
            )
            shelf_instances.append(shelf_instance)
        db.session.bulk_save_objects(shelf_instances)

        # セルテーブルへの挿入
        seed_cell = pandas.read_csv(cellCsv_dir)
        cell_instances = []

        for _, rec in seed_cell.iterrows():
            cell_instance = Cell(id=rec["id"],
                                 name=rec["name"],
                                 shelf_id=rec["shelf_id"],
                                 max_qty=rec["max_qty"],
                                 is_all_pn_allowed=rec["is_all_pn_allowed"])
            cell_instances.append(cell_instance)
        # リストcell_instancesを一括でbulkインサート
        db.session.bulk_save_objects(cell_instances)

        # 品番テーブルへの挿入
        seed_prodNum = pandas.read_csv(prodCsv_dir)
        prod_instances = []

        for _, rec in seed_prodNum.iterrows():
            prod_instance = ProductNumber(
                product_no=rec["product_no"],
                serial_no=rec["serial_no"],
                material=rec["material"],
                outer_diam =rec["outer_diam"],
                material_thickness=rec["material_thickness"],
                cut_length=rec["cut_length"],
                long_length=rec["long_length"])
            prod_instances.append(prod_instance)
        db.session.bulk_save_objects(prod_instances)

        db.session.commit()
        logger.info("初期データの追加成功✅")
    except Exception as e:
        db.session.rollback()
        logger.error(f"エラー発生❌:{e}")
    finally:
        db.session.close()
