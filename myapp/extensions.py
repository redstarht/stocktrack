from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import event
import sqlite3
from sqlalchemy.engine import Engine
from flask_migrate import Migrate
import sys
import os

# DB接続時に起動


@event.listens_for(Engine, "connect")
def set_sqlite_pragma(dbapi_connection, _):
    if isinstance(dbapi_connection, sqlite3.Connection):
        cursor = dbapi_connection.cursor()
        cursor.execute("PRAGMA foreign_keys=ON")
        cursor.close()
        print("PRAGMA foreign_keys=ON executed")  # デバッグ用


db = SQLAlchemy()
migrate = Migrate()


def fetch_base_path() -> str:
    """基準パスを取得する関数"""

    # PyInstallerで実行されているかどうかをチェック
    if getattr(sys, "frozen", False):
        # EXEの実行ファイルのパスを取得
        print("Running in a PyInstaller bundled environment")
        print(f"sys._MEIPASS: {sys._MEIPASS}")
        print(f"EXE実行ファイルのPASS : {os.path.dirname(sys.executable)}")
        return sys._MEIPASS
    else:
        # スクリプトの実行ファイルのパスを取得
        print("Running in a regular Python environment")
        return os.path.dirname(os.path.abspath(__file__))