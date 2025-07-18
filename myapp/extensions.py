from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import event
import sqlite3
from sqlalchemy.engine import Engine
from flask_migrate import Migrate

# DB接続時に起動
@event.listens_for(Engine, "connect")
def set_sqlite_pragma(dbapi_connection,_):
    if isinstance(dbapi_connection, sqlite3.Connection):
        cursor = dbapi_connection.cursor()
        cursor.execute("PRAGMA foreign_keys=ON")
        cursor.close()
        print("PRAGMA foreign_keys=ON executed")  # デバッグ用


db = SQLAlchemy()
migrate = Migrate()
