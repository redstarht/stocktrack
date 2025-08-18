from logging import StreamHandler,Formatter,FileHandler,getLogger
import os

def setup_logging(log_level=logging.DEBUG, log_file='app.log'):
    # ルートロガーを取得
    logger = getLogger()
    logger.setLevel(log_level)

    # コンソールハンドラー
    console_handler =  StreamHandler()
    console_handler.setLevel(log_level)
    console_formatter = Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    console_handler.setFormatter(console_formatter)

    # ファイルハンドラー
    file_handler = FileHandler(log_file)
    file_handler.setLevel(log_level)
    file_formatter = Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    file_handler.setFormatter(file_formatter)

    # ハンドラーをロガーに追加
    logger.addHandler(console_handler)
    logger.addHandler(file_handler)

    return logger
