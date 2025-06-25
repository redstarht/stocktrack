"""drop unique from product_no

Revision ID: b68ed58fcbbc
Revises: bdd19fa63016
Create Date: 2025-06-25 09:55:28.278731

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b68ed58fcbbc'
down_revision = 'bdd19fa63016'
branch_labels = None
depends_on = None


def upgrade():
    # 外部キー制約を一時的に無効化
    op.execute("PRAGMA foreign_keys=OFF;")

    # 新テーブルを作成（UNIQUEなし）
    op.execute("""
        CREATE TABLE product_number_new (
            id INTEGER PRIMARY KEY,
            product_no VARCHAR(50) NOT NULL DEFAULT '',
            name VARCHAR(100) NOT NULL DEFAULT '',
            serial_no VARCHAR(20) NOT NULL DEFAULT '',
            material VARCHAR(20) NOT NULL DEFAULT '',
            material_thickness FLOAT NOT NULL DEFAULT '',
            cut_length FLOAT NOT NULL DEFAULT '',
            is_deleted BOOLEAN DEFAULT 0,
            created_at DATETIME,
            updated_at DATETIME
        );
    """)

    # データをコピー
    op.execute("""
        INSERT INTO product_number_new (
            id, product_no, name, serial_no, material,
            material_thickness, cut_length, is_deleted,
            created_at, updated_at
        )
        SELECT id, product_no, name, serial_no, material,
               material_thickness, cut_length, is_deleted,
               created_at, updated_at
        FROM product_number;
    """)

    # 元テーブル削除 & リネーム（外部キー制約OFFなのでDROP可能）
    op.execute("DROP TABLE product_number;")
    op.execute("ALTER TABLE product_number_new RENAME TO product_number;")

    # 外部キー制約を再び有効にする
    op.execute("PRAGMA foreign_keys=ON;")


def downgrade():
    # UNIQUE制約ありのテーブルへ戻す
    op.execute("PRAGMA foreign_keys=OFF;")

    op.execute("""
        CREATE TABLE product_number_old (
            id INTEGER PRIMARY KEY,
            product_no VARCHAR(50) NOT NULL UNIQUE DEFAULT '',
            name VARCHAR(100) NOT NULL DEFAULT '',
            serial_no VARCHAR(20) NOT NULL DEFAULT '',
            material VARCHAR(20) NOT NULL DEFAULT '',
            material_thickness FLOAT NOT NULL DEFAULT '',
            cut_length FLOAT NOT NULL DEFAULT '',
            is_deleted BOOLEAN DEFAULT 0,
            created_at DATETIME,
            updated_at DATETIME
        );
    """)

    op.execute("""
        INSERT INTO product_number_old (
            id, product_no, name, serial_no, material,
            material_thickness, cut_length, is_deleted,
            created_at, updated_at
        )
        SELECT id, product_no, name, serial_no, material,
               material_thickness, cut_length, is_deleted,
               created_at, updated_at
        FROM product_number;
    """)

    op.execute("DROP TABLE product_number;")
    op.execute("ALTER TABLE product_number_old RENAME TO product_number;")

    op.execute("PRAGMA foreign_keys=ON;")