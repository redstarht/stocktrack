from myapp import create_app, db
from flask_migrate import Migrate
from waitress import serve

app = create_app()
migrate = Migrate(app, db)


if __name__ == "__main__":
    serve(app, host='0.0.0.0', port=8080,
          connection_limit=1000,
          threads=4,
          channel_timeout=30)
