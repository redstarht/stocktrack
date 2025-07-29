import os
import sqlite3
from datetime import datetime
import shutil
import time

import schedule


# 毎日0:30になったら自動バックアップする処理
def backup_scheduler(db_path,backup_dir):
    
    schedule.every().day.at("00:30").do(backup_sqlite,db_path,backup_dir)
    while True:
        schedule.run_pending()  
        time.sleep(1)  # 待ち

def backup_sqlite(db_path,backup_dir):
    os.makedirs(backup_dir, exist_ok=True)

    # バックアップファイル名
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_path = os.path.join(backup_dir, f"backup_{timestamp}.db")

    src = sqlite3.connect(db_path)
    dump = sqlite3.connect(backup_path)
    with dump:
        src.backup(dump)
        print(F"{timestamp}:バックアップが完了しました✅")
    dump.close()
    src.close()
    
    # バックアップファイルを取得し、日付でソート
    old_backups = sorted([f for f in os.listdir(backup_dir) if f.startswith("backup_") and f.endswith(".db")
    ],reverse=True)
    
    current_time = time.time()
    # 1週間分の秒数
    one_week_time = 7*24*60*60
    for old_backup in old_backups:
        # oldファイルのパスを作成
        oldpath = os.path.join(backup_dir,old_backup)
        # ファイルの更新日時を取得
        last_modify_time = os.path.getmtime(oldpath)
        
        if(last_modify_time - current_time > one_week_time):
            os.remove(oldpath)
            print(F"{timestamp}:{oldpath}を削除しました")
            
