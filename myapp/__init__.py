from flask import Flask
from .extensions import db, migrate
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
import os
import pandas
from .backup import backup_sqlite ,backup_scheduler
import schedule
import time
import threading

base_dir = os.path.dirname(os.path.abspath(__file__))
parent_dir = os.path.dirname(base_dir)
backup_dir = os.path.join(parent_dir,"backup")
db_path = os.path.join(parent_dir, 'instance', 'myapp.db')


def create_app():
    app = Flask(__name__)
    app.config.from_mapping(
        SQLALCHEMY_DATABASE_URI='sqlite:///myapp.db',
        SQLALCHEMY_TRACK_MODIFICATIONS=False,
    )
    db.init_app(app)
    migrate.init_app(app, db)


    # .dbファイルが存在しない場合は作成し初期データを格納
    if not os.path.exists(db_path):
        print(os.path.exists(db_path))
        with app.app_context():
            db.create_all()
            initialize_db()
    
    # バックアップ機能を別スレッドで起動(毎日0:30にバックアップ処理)
    backup_thread = threading.Thread(target=backup_scheduler, args=(db_path, backup_dir),daemon=True)
    backup_thread.start()
            

    # blueprintを登録
    from myapp.routes import main
    from myapp.services import services
    from myapp.api import api
    app.register_blueprint(services)
    app.register_blueprint(main)
    app.register_blueprint(api)
    return app


def initialize_db():
    '''
    初期データの追加
    Zone / shelf / cell  
    '''
    print("初期データの追加をします")
    try:
        # zoneテーブルへの挿入
        seed_zone = pandas.read_csv('./seed/zone.csv')
        zone_instances = []
        for _, rec in seed_zone.iterrows():
            zone_instance = Zone(id=rec["id"],
                                 name=rec["name"]
                                 )
            zone_instances.append(zone_instance)
        db.session.bulk_save_objects(zone_instances)

        # shelfテーブルへの挿入
        seed_shelf = pandas.read_csv('./seed/shelf.csv')
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
        seed_cell = pandas.read_csv('./seed/cell.csv')
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
        db.session.commit()
        print("初期データの追加成功✅")
    except Exception as e:
        db.session.rollback()
        print(f"エラー発生❌:{e}")
    finally:
        db.session.close()
