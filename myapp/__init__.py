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


def create_app():
    app = Flask(__name__)
    app.config.from_mapping(
        SQLALCHEMY_DATABASE_URI='sqlite:///myapp.db',
        SQLALCHEMY_TRACK_MODIFICATIONS=False,
    )
    db.init_app(app)
    migrate.init_app(app, db)

    if not os.path.exists('myapp.db'):
        print(os.path.exists('myapp.db'))
        with app.app_context():
            db.create_all()
    
    # blueprintを登録
    from myapp.routes import main
    from myapp.services import services
    from myapp.api import api
    app.register_blueprint(services)
    app.register_blueprint(main)
    app.register_blueprint(api)
    return app

def initialize_db():
    # 初期データの追加
    seed_cell = pandas.read_csv('/seed/cell.csv')
    seed_zone = pandas.read_csv('/seed/zone.csv')
    seed_shelf = pandas.read_csv('/seed/shelf.csv')
    print("初期データの追加をします")