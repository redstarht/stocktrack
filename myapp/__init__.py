from flask import Flask
from .extensions import db, migrate
from .routes import main

def create_app():
    app = Flask(__name__)
    app.config.from_mapping(
        SQLALCHEMY_DATABASE_URI='sqlite:///myapp.db',
        SQLALCHEMY_TRACK_MODIFICATIONS=False,
    )
    db.init_app(app)
    migrate.init_app(app, db)

    
    # blueprintを登録
    from myapp.routes import main
    from myapp.services import services
    from myapp.api import api
    app.register_blueprint(services)
    app.register_blueprint(main)
    app.register_blueprint(api)
    return app