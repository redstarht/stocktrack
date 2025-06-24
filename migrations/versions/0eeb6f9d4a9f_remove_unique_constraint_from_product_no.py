"""remove unique constraint from product_no

Revision ID: 0eeb6f9d4a9f
Revises: bdd19fa63016
Create Date: 2025-06-25 00:32:05.418120

"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "0eeb6f9d4a9f"
down_revision = "bdd19fa63016"
branch_labels = None
depends_on = None


def upgrade():
    # 新テーブル作成（UNIQUE制約なし）
    op.execute("""
        CREATE TABLE product_number_temp (
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

    # データをNULL→空文字に変換しつつコピー
    op.execute("""
        INSERT INTO product_number_temp (
            id, product_no, name, serial_no, material, material_thickness,
            cut_length, is_deleted, created_at, updated_at
        )
        SELECT
            id,
            COALESCE(product_no, ''),
            COALESCE(name, ''),
            COALESCE(serial_no, ''),
            COALESCE(material, ''),
            COALESCE(material_thickness, ''),
            COALESCE(cut_length, ''),
            COALESCE(is_deleted, 0),
            created_at,
            updated_at
        FROM product_number;
    """)

    # 元のテーブルを削除し、リネーム
    op.execute("DROP TABLE product_number;")
    op.execute("ALTER TABLE product_number_temp RENAME TO product_number;")


def downgrade():
    # 元に戻す処理（UNIQUEありの構造）
    op.execute("""
        CREATE TABLE product_number_temp (
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
        INSERT INTO product_number_temp (
            id, product_no, name, serial_no, material, material_thickness,
            cut_length, is_deleted, created_at, updated_at
        )
        SELECT
            id,
            COALESCE(product_no, ''),
            COALESCE(name, ''),
            COALESCE(serial_no, ''),
            COALESCE(material, ''),
            COALESCE(material_thickness, ''),
            COALESCE(cut_length, ''),
            COALESCE(is_deleted, 0),
            created_at,
            updated_at
        FROM product_number;
    """)
    op.execute("DROP TABLE product_number;")
    op.execute("ALTER TABLE product_number_temp RENAME TO product_number;")