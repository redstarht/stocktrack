from myapp import create_app, db
from flask_migrate import Migrate
from waitress import serve
import socket

app = create_app()
migrate = Migrate(app, db)


if __name__ == "__main__":
    # IPアドレス取得
    hostname = socket.gethostname()
    ip_address = socket.gethostbyname(hostname)
    print(f"Server is running on http://{ip_address}:8080")
    serve(app, host='0.0.0.0', port=8080,
          connection_limit=1000,
          threads=8,
          channel_timeout=30)
