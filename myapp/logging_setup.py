import logging
from logging import StreamHandler, Formatter, FileHandler, getLogger, handlers
import os


def setup_logging(log_level=logging.DEBUG, log_file='myapp/logs/app.log'):

    # ログファイルのディレクトリを取得
    log_dir = os.path.dirname(log_file)

    # ディレクトリが存在しない場合は作成
    if not os.path.exists(log_dir):
        os.makedirs(log_dir)

    # ルートロガーを取得
    logger = getLogger()
    logger.setLevel(log_level)

    # コンソールハンドラー
    console_handler = StreamHandler()
    console_handler.setLevel(log_level)
    console_formatter = Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    console_handler.setFormatter(console_formatter)

    # ファイルハンドラー
    # 7世代分バックアップ
    file_handler = handlers.TimedRotatingFileHandler(
        log_file, when="midnight", interval=1, backupCount=7)
    file_handler.setLevel(log_level)
    file_formatter = Formatter(
        '%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    file_handler.setFormatter(file_formatter)

    # ハンドラーをロガーに追加
    logger.addHandler(console_handler)
    logger.addHandler(file_handler)

    return logger
