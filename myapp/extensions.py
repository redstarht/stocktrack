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


class BuildDir:
    """基準パスを取得し必要なパスを構成する"""

    def __init__(self):
        if getattr(sys, "frozen", False):
            # EXEの実行ファイルのパスを取得
            print("Running in a PyInstaller bundled environment")
            print(f"sys._MEIPASS: {sys._MEIPASS}")
            print(f"EXE実行ファイルのPASS : {os.path.dirname(sys.executable)}")
            self.base_dir = sys._MEIPASS
            self.parent_dir = os.path.dirname(self.base_dir)
            # frozen の場合は _internal/seed ディレクトリを使用
            self.seed_dir = os.path.join(self.base_dir, "seed")

        else:
            # スクリプトの実行ファイルのパスを取得
            print("Running in a regular Python environment")
            self.base_dir = os.path.dirname(os.path.abspath(__file__))
            self.parent_dir = os.path.dirname(self.base_dir)
            self.seed_dir = os.path.join(self.parent_dir, "myapp","seed")

        self.backup_dir = os.path.join(self.parent_dir, "backup")
        self.shelfCsv_dir = os.path.join(self.seed_dir, "shelf.csv")
        self.zoneCsv_dir = os.path.join(self.seed_dir, "zone.csv")
        self.cellCsv_dir = os.path.join(self.seed_dir, "cell.csv")
        self.prodCsv_dir = os.path.join(self.seed_dir, "pipe_prodNum.csv")

